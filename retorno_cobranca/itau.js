import bancos from '../bancos.js'
import {tipo, hoje} from '../lib.js'

export default ({X, fixo, numero, texto, data, mapa}) => {
  const K = {
    carteira: X.registros.reduce((c, {carteira}) =>
      c != 'Simples' ? c : carteira
    , 'Simples'),
    credito: X.registros.reduce((c, {credito}) =>
      c > credito ? c : credito
    , '') || hoje(),
    info: ''
  }
  fixo('02RETORNO')
  fixo('0')
  mapa(K, 'carteira', {
    '1': 'Simples',
    '2': 'Vinculada',
    '4': 'Descontada'
  })
  fixo(() => K.carteira == 'Descontada' ? 'EMPRESTIMO' : 'COBRANCA', 15)
  numero(X, 'agencia', 4)
  fixo('0', 2)
  numero(X, 'conta', 6)
  fixo(' ', 8)
  texto(X, 'nome', 30)
  fixo('341BANCO ITAU S.A.')
  data(X, 'geracao', 6)
  fixo(() => K.carteira == 'Descontada' ? '' : '01600BPI', 8)
  numero(X, 'sequencia', 5)
  data(K, 'credito', 6)
  fixo(' ', 275)
  fixo('000001')
  fixo('\r\n')
  X.registros.forEach((R, index) => {
    fixo('10')
    fixo(tipo(X, 'cnpjcpf'), 1)
    numero(X, 'cnpjcpf', 14)
    fixo(X.agencia, 4, true)
    fixo('0', 2)
    numero(X, 'conta', 6)
    fixo(' ')
    fixo(() => K.carteira == 'Descontada' ? [
      '0015000',
      '0015900',
      '0017600'
    ] : '', 7)
    fixo(' ', 25)
    fixo(() => R.id, 8, true)
    fixo(' ', 12)
    fixo('112')
    texto(R, 'id', 9)
    if (R.operacao == 'Entrada' && K.carteira == 'Descontada') {
      numero(R, 'juros', 13, 2)
    } else {
      texto(K, 'info', 13)
    }
    fixo(() => K.carteira == 'Descontada' ? 'R' : 'I', 1)
    R.carteira = K.carteira
    numero(R, 'op', 2)
    if (R.op == 2 || R.op == 64 || R.op == 71 || R.op == 73) {
      R.operacao = "Entrada"
    } else if (R.op == 6 || R.op == 7 || R.op == 8 || R.op == 76) {
      R.operacao = "Pagamento"
    } else if (R.op == 23) {
      R.operacao = "Cartório"
    } else if ([9, 10, 32, 47, 59, 72].indexOf(R.op) >= 0) {
      R.operacao = "Baixa"
    } else if ([4, 5, 12, 13, 14].indexOf(R.op) >= 0) {
      R.operacao = "Alteração"
    } else if ([3, 15, 16, 17, 18, 24, 60].indexOf(R.op) >= 0) {
      R.operacao = "Erro"
    }
    data(R, 'ocorrencia', 6)
    texto(R, 'documento', 10)
    fixo(() => R.id, 8, true)
    fixo(' ', 12)
    data(R, 'vencimento', 6)
    numero(R, 'valor', 13, 2)
    mapa(R, 'banco', bancos)
    numero(R, 'agencia', 5)
    fixo('01')
    numero(R, 'tarifa', 13, 2)
    fixo('0', 13)
    if (R.operacao == 'Entrada' && K.carteira == 'Descontada') {
      numero(R, 'saldo', 13, 2)
    } else {
      fixo('0', 13)
    }
    numero(R, 'iof', 13, 2)
    numero(R, 'abatimento', 13, 2)
    fixo('0', 13)
    if (R.operacao == 'Entrada' && K.carteira == 'Descontada') {
      fixo('0', 13)
    } else {
      numero(R, 'saldo', 13, 2)
    }
    if (R.operacao == 'Entrada' && K.carteira == 'Descontada') {
      if (K.info != '') {
        R.juros = parseInt(K.info) / 100
      }
      fixo('0', 13)
    } else {
      numero(R, 'juros', 13, 2)
    }
    fixo(() => Math.round(100 *
      (R.juros == 0 && R.saldo > 0 ? Math.abs(R.saldo - R.valor) : 0)
    ), 13, true)
    fixo(' ', 3)
    data(R, 'credito', 6, true)
    texto(R, 'erro', 4)
    fixo('0', 19)
    texto(R, 'nome', 30)
    fixo(' ', 23)
    texto(R, 'mensagem', 8)
    fixo(' ', 7)
    texto(R, 'pagamento', 2)
    fixo(index + 2, 6, true)
    fixo('\r\n')
  })
  fixo('920')
  mapa(K, 'carteira', {
    '1': 'Simples',
    '2': 'Vinculada',
    '4': 'Descontada'
  })
  fixo('341')
  fixo(' ', 10)
  numero(X, 'quantidade', 8)
  numero(X, 'total', 14, 2)
  texto(X, 'info', 8)
  fixo(' ', 10)
  numero(X, 'quantidade2', 8)
  numero(X, 'total2', 14, 2)
  texto(X, 'info2', 8)
  fixo(' ', 50)
  fixo('0', 30)
  fixo(' ', 10)
  numero(X, 'quantidade3', 8)
  numero(X, 'total3', 14, 2)
  texto(X, 'info3', 8)
  fixo(() => K.carteira == 'Descontada' ? 0 : X.sequencia, 5, true)
  fixo(X.registros.length, 8, true)
  fixo(Math.round(100 * X.registros.reduce(
    (total, {valor}) => total + valor
  , 0)), 14, true)
  fixo(' ', 160)
  fixo(X.registros.length + 2, 6, true)
  fixo('\r\n')
}
