import bancos from '../bancos.js'
import {tipo} from '../lib.js'

export default ({X, fixo, numero, texto, data, mapa}) => {
  fixo('02RETORNO')
  fixo([
    '01COBRANCA',
    '04EMPRESTIMO'
  ], 17)
  numero(X, 'agencia', 4)
  fixo('0', 2)
  numero(X, 'conta', 6)
  fixo(' ', 8)
  texto(X, 'nome', 30)
  fixo('341BANCO ITAU S.A.')
  data(X, 'criacao', 6)
  fixo([
    '01600BPI',
    '',
  ], 8)
  numero(X, 'sequencia', 5)
  fixo(() => {
    const c = X.registros.reduce((c, r) => r.credito || c, "")
    return `${c.substr(8, 2)}${c.substr(5, 2)}${c.substr(2, 2)}`
  }, 6)
  fixo(' ', 275)
  fixo('000001')
  fixo('\r\n')
  X.registros.forEach((R, index) => {
    fixo('10')
    fixo(tipo(X, 'cnpjcpf'), 1)
    numero(X, 'cnpjcpf', 14)
    numero(X, 'agencia', 4)
    fixo('0', 2)
    numero(X, 'conta', 6)
    fixo(' ')
    fixo([
      '',
      '0015000',
      '0015900'
    ], 7)
    fixo(' ', 25)
    fixo(() => R.id, 8, true)
    fixo(' ', 12)
    fixo('112')
    texto(R, 'id', 9)
    fixo(' ', 13)
    fixo(['I', 'R'], 1)
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
    texto(R, 'duplicata', 10)
    fixo(() => R.id, 8, true)
    fixo(' ', 12)
    data(R, 'vencimento', 6)
    numero(R, 'valor', 13, 2)
    mapa(R, 'banco', bancos)
    numero(R, 'agencia', 5)
    fixo('01')
    numero(R, 'tarifa', 13, 2)
    fixo('0', 39)
    numero(R, 'abatimento', 13, 2)
    fixo('0', 13)
    numero(R, 'total', 13, 2)
    numero(R, 'juros', 13, 2)
    numero(R, 'outros', 13, 2)
    fixo(' ', 3)
    data(R, 'credito', 6, true)
    fixo('0', 23)
    texto(R, 'nome', 30)
    fixo(' ', 23)
    texto(R, 'mensagem', 8)
    fixo(' ', 7)
    texto(R, 'pagamento', 2)
    fixo(index + 2, 6, true)
    fixo('\r\n')
  })
  fixo('920')
  fixo(['1', '4'], 1)
  fixo('341')
  fixo(' ', 10)
  numero(X, 'simples_qtde', 8)
  numero(X, 'simples_total', 14, 2)
  texto(X, 'simples_aviso', 8)
  fixo(' ', 10)
  numero(X, 'vinculada_qtde', 8)
  numero(X, 'vinculada_total', 14, 2)
  texto(X, 'vinculada_aviso', 8)
  fixo(' ', 50)
  fixo('0', 30)
  fixo(' ', 10)
  numero(X, 'escritural_qtde', 8)
  numero(X, 'escritural_total', 14, 2)
  texto(X, 'escritural_aviso', 8)
  fixo([X.sequencia, 0], 5, true)
  fixo(X.registros.length, 8, true)
  fixo(Math.round(100 * X.registros.reduce(
    (total, {valor}) => total + valor
  , 0)), 14, true)
  fixo(' ', 160)
  fixo(X.registros.length + 2, 6, true)
  fixo('\r\n')
}
