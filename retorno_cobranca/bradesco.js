import bancos from '../bancos.js'
import {tipo, hoje} from '../lib.js'

export default ({
  X,
  numero,
  texto,
  data,
  mapa,
  fixo
}) => {
  const K = {
    credito: X.registros.reduce((c, {credito}) =>
      c > credito ? c : credito
    , '') || hoje()
  }
  fixo('02RETORNO01COBRANCA       ')
  texto(X, 'codigo', 20)
  texto(X, 'nome', 30)
  fixo('237BRADESCO       ')
  data(X, 'geracao', 6)
  fixo('01600000')
  numero(X, 'sequencia', 5)
  fixo(' ', 266)
  data(K, 'credito', 6)
  fixo(' ', 9)
  fixo('000001')
  fixo('\r\n')
  X.registros.forEach((R, index) => {
    fixo('10')
    fixo(tipo(X, 'cnpjcpf'), 1)
    numero(X, 'cnpjcpf', 14)
    fixo('0', 3)
    numero(R, 'carteira', 4)
    numero(X, 'agencia', 5)
    numero(X, 'conta', 8)
    fixo(() => R.documento, 25)
    fixo('0', 8)
    texto(R, 'id', 12)
    fixo('0', 22)
    fixo('000')
    fixo([R.carteira, 0], 1)
    numero(R, 'op', 2)
    if (R.op == 2) {
      R.operacao = "Entrada"
    } else if (R.op == 6 || R.op == 15 || R.op == 17) {
      R.operacao = "Pagamento"
    } else if (R.op == 23) {
      R.operacao = "Cartório"
    } else if (R.op == 9 || R.op == 10) {
      R.operacao = "Baixa"
    } else if ([12, 13, 14, 33, 38].indexOf(R.op) >= 0) {
      R.operacao = "Alteração"
    } else if ([3, 8, 24, 27, 30, 32, 37, 39].indexOf(R.op) >= 0) {
      R.operacao = "Erro"
    }
    data(R, 'ocorrencia', 6)
    texto(R, 'documento', 10)
    fixo(R.id, 20, true)
    data(R, 'vencimento', 6)
    numero(R, 'valor', 13, 2)
    mapa(R, 'banco', bancos)
    numero(R, 'agencia', 5)
    fixo('  ')
    numero(R, 'tarifa', 13, 2)
    fixo('0', 39)
    numero(R, 'abatimento', 13, 2)
    fixo('0', 13)
    numero(R, 'saldo', 13, 2)
    numero(R, 'juros', 13, 2)
    //numero(R, 'outros', 13, 2)
    fixo('0', 13)
    fixo(' ', 3)
    data(R, 'credito', 6)
    texto(R, 'pagamento', 3)
    console.log(R.operacao)
    fixo(' ', 10)
    fixo(() => R.operacao == "Pagamento" ? '0' : '', 4)
    texto(R, 'mensagem', 10)
    fixo(' ', 40)
    texto(R, 'cartorio', 12)
    fixo(' ', 14)
    fixo(index + 2, 6, true)
    fixo('\r\n')
  })
  fixo('9201237')
  fixo(' ', 10)
  numero(X, 'quantidade', 8)
  numero(X, 'total', 14, 2)
  texto(X, 'info', 8)
  fixo(' ', 10)

  const qtde = codigo => X.registros.reduce(
    (total, {op}) => total + (op == codigo ? 1 : 0)
  , 0)
  const total = codigo => Math.round(100 * X.registros.reduce(
    (total, {valor, op}) => total + (op == codigo ? valor : 0)
  , 0))

  fixo(qtde(2), 5, true)
  fixo(total(2), 12, true)
  fixo(total(6), 12, true)
  fixo(qtde(6), 5, true)
  fixo(total(6), 12, true)
  fixo(qtde(9)+qtde(10), 5, true)
  fixo(total(9)+total(10), 12, true)
  fixo(qtde(13), 5, true)
  fixo(total(13), 12, true)
  fixo(qtde(14), 5, true)
  fixo(total(14), 12, true)
  fixo(qtde(12), 5, true)
  fixo(total(12), 12, true)
  fixo(qtde(19), 5, true)
  fixo(total(19), 12, true)
  fixo(' ', 174)
  fixo('0', 23)
  fixo(' ', 9)
  fixo(X.registros.length + 2, 6, true)
  fixo('\r\n')
}
