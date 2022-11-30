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
  texto(X, 'codigo', 20)
  texto(X, 'nome', 30)
  fixo('707BANCO DAYCOVAL ')
  data(X, 'geracao', 6)
  fixo(['01600', '06250'])
  fixo('BPI')
  numero(X, 'sequencia', 5)
  fixo(' ', 281)
  fixo('000001')
  fixo('\n')
  X.registros.forEach((R, index) => {
    fixo('10')
    fixo(tipo(X, 'cnpjcpf'), 1)
    numero(X, 'cnpjcpf', 14)
    fixo(X.codigo, 20)
    fixo(' ', 25)
    texto(R, 'id', 11)
    fixo(' ', 8)
    numero(X, 'carteira', 1)
    numero(R, 'op', 2)
    if (R.op == 1 || R.op == 2) {
      R.operacao = "Entrada"
    } else if (R.op == 6 || R.op == 8) {
      R.operacao = "Pagamento"
    } else if (R.op == 23) {
      R.operacao = "Cartório"
    } else if (R.op == 9 || R.op == 10 || R.op == 43) {
      R.operacao = "Baixa"
    } else if ([5, 12, 13, 14, 19, 20, 22, 24].indexOf(R.op) >= 0) {
      R.operacao = "Alteração"
    } else if ([3, 15, 16].indexOf(R.op) >= 0) {
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
    fixo(' ', 26)
    numero(R, 'iof', 13, 2)
    numero(R, 'abatimento', 13, 2)
    numero(R, 'descontos', 13, 2)
    numero(R, 'saldo', 13, 2)
    numero(R, 'juros', 13, 2)
    fixo('0', 13)
    fixo(' ', 84)
    fixo(['1', '0'])
    texto(R, 'mensagem', 8)
    data(R, 'credito', 6)
    fixo('0', 5)
    fixo(index + 2, 6, true)
    fixo('\n')
  })
  fixo('9201707')
  fixo('0', 98)
  fixo(' ', 289)
  fixo(X.registros.length + 2, 6, true)
  fixo('\n')
}
