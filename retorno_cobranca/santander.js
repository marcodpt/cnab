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
  fixo('02RETORNO01COBRANCA       ')
  texto(X, 'codigo', 20)
  texto(X, 'nome', 30)
  fixo('033SANTANDER', 18)
  data(X, 'geracao', 6)
  fixo('0', 10)
  numero(X, 'conta', 7)
  fixo(' ', 274)
  numero(X, 'sequencia', 3)
  fixo('000001')
  fixo('\r\n')
  X.registros.forEach((R, index) => {
    fixo('10')
    fixo(tipo(X, 'cnpjcpf'), 1)
    numero(X, 'cnpjcpf', 14)
    fixo(X.codigo, 20)
    fixo(' ', 25)
    numero(R, 'id', 8)
    fixo(' ', 37)
    mapa(R, 'carteira', {
      '2': 'Simples',
      '3': 'Vinculada',
      '7': 'Descontada'
    })
    numero(R, 'op', 2)
    if (R.op == 2) {
      R.operacao = "Entrada"
    } else if (R.op == 6 || R.op == 7 || R.op == 8 || R.op == 17) {
      R.operacao = "Pagamento"
    } else if (R.op == 15 || R.op == 21) {
      R.operacao = "Cartório"
    } else if (R.op == 9 || R.op == 10) {
      R.operacao = "Baixa"
    } else if ([12, 13, 14].indexOf(R.op) >= 0) {
      R.operacao = "Alteração"
    } else if ([1, 3, 16].indexOf(R.op) >= 0) {
      R.operacao = "Erro"
    }
    data(R, 'ocorrencia', 6)
    texto(R, 'documento', 10)
    fixo(R.id, 8, true)
    texto(R, 'erro', 11)
    fixo(' ')
    data(R, 'vencimento', 6)
    numero(R, 'valor', 13, 2)
    mapa(R, 'banco', bancos)
    numero(R, 'agencia', 5)
    fixo('01')
    if (R.op == 24) {
      fixo('0', 13)
      numero(R, 'tarifa', 13, 2)
    } else {
      numero(R, 'tarifa', 13, 2)
      fixo('0', 13)
    }
    fixo('0', 26)
    numero(R, 'abatimento', 13, 2)
    fixo('0', 13)
    numero(R, 'saldo', 13, 2)
    numero(R, 'juros', 13, 2)
    numero(R, 'iof', 13, 2)
    fixo(' N ')
    data(R, 'credito', 6)
    texto(R, 'nome', 36)
    fixo(' 00')
    fixo('0', 26)
    fixo(() => R.saldo > R.tarifa || R.op == 24 ? Math.round(Math.abs(
      (R.saldo - R.tarifa) * 100
    )) : 0, 13, true)
    fixo(R.op == 24 ? 'D' : 'C')
    fixo(' ', 11)
    fixo(X.sequencia, 3)
    fixo(index + 2, 6, true)
    fixo('\r\n')
  })
  fixo('9201033')
  fixo(' ', 10)
  numero(X, 'quantidade', 8)
  numero(X, 'total', 14, 2)
  texto(X, 'info', 8)
  fixo(' ', 50)
  numero(X, 'quantidade2', 8)
  numero(X, 'total2', 14, 2)
  texto(X, 'info2', 8)
  fixo(' ', 10)
  numero(X, 'quantidade3', 8)
  numero(X, 'total3', 14, 2)
  texto(X, 'info3', 8)
  fixo(' ', 224)
  fixo(X.sequencia, 3)
  fixo(X.registros.length + 2, 6, true)
  fixo('\r\n')
}
