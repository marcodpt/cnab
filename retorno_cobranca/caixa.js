import bancos from '../bancos.js'
import {tipo} from '../lib.js'

export default ({
  X,
  numero,
  texto,
  data,
  mapa,
  fixo
}) => {
  fixo('02RETORNO01')
  fixo('COBRANCA', 15)
  numero(X, 'agencia', 4)
  numero(X, 'conta', 6)
  fixo(' ', 10)
  texto(X, 'nome', 30)
  fixo('104C ECON FEDERAL', 18)
  data(X, 'geracao', 6)
  fixo(' ', 289)
  numero(X, 'sequencia', 5)
  fixo('000001')
  fixo('\r\n')
  X.registros.forEach((R, index) => {
    fixo('10')
    fixo(tipo(X, 'cnpjcpf'), 1)
    texto(X, 'cnpjcpf', 14)
    fixo(X.agencia, 4, true)
    numero(X, 'conta', 6)
    fixo('10  ')
    fixo(() => R.documento, 25)
    fixo('11')
    texto(R, 'id', 15)
    fixo(' ', 33)
    fixo('01')
    numero(R, 'op', 2)
    if (R.op == 1) {
      R.operacao = "Entrada"
    } else if (R.op == 21 || R.op == 22 || R.op == 35) {
      R.operacao = "Pagamento"
    } else if (R.op == 26) {
      R.operacao = "Cartório"
    } else if (R.op == 2 || R.op == 23 || R.op == 25) {
      R.operacao = "Baixa"
    } else if ([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 30].indexOf(R.op) >= 0) {
      R.operacao = "Alteração"
    } else if ([52, 53, 99].indexOf(R.op) >= 0) {
      R.operacao = "Erro"
    }
    data(R, 'ocorrencia', 6)
    texto(R, 'documento', 10)
    fixo(' ', 20)
    data(R, 'vencimento', 6)
    numero(R, 'valor', 13, 2)
    mapa(R, 'banco', bancos)
    numero(R, 'agencia', 5)
    fixo('01')
    numero(R, 'tarifa', 13, 2)
    texto(R, 'pagamento', 6)
    fixo(() => R.credito || X.geracao, 6)
    fixo(' ', 14)
    numero(R, 'iof', 13, 2)
    numero(R, 'abatimento', 13, 2)
    fixo('0', 13)
    numero(R, 'saldo', 13, 2)
    numero(R, 'juros', 13, 2)
    fixo('0', 13)
    fixo('1')
    data(R, 'credito', 6)
    fixo(' ', 95)
    fixo(index + 2, 6, true)
    fixo('\r\n')
  })
  fixo('9201104')
  fixo(' ', 387)
  fixo(X.registros.length + 2, 6, true)
  fixo('\r\n')
}
