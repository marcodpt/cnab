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
  fixo('00100000')
  fixo(' ', 9)
  fixo(tipo(X, 'cnpjcpf'), 1)
  texto(X, 'cnpjcpf', 14)
  fixo('000')
  texto(X, 'info', 6)
  fixo('0014', 11)
  numero(X, 'agencia', 6)
  numero(X, 'conta', 13)
  fixo(' ')
  texto(X, 'nome', 30)
  fixo('BANCO DO BRASIL', 30)
  fixo(' ', 10)
  fixo('2')
  data(X, 'geracao', 14)
  numero(X, 'sequencia', 6)
  fixo('03000000')
  texto(X, 'info2', 20)
  fixo(' ', 49)
  fixo('\r\n')
  fixo('00100011T0100020 ')
  fixo(tipo(X, 'cnpjcpf'), 1)
  fixo(X.cnpjcpf, 15, true)
  fixo(X.info, 9, true)
  fixo('0014', 11)
  fixo(X.agencia, 6, true)
  fixo(X.conta, 13, true)
  fixo(' ')
  fixo(X.nome, 31)
  fixo(' ', 39)
  fixo(' ', 40)
  fixo('0', 8)
  fixo(X.geracao, 8)
  fixo('0', 8)
  fixo(' ', 2)
  fixo('0', 9)
  fixo(' ', 22)
  fixo('\r\n')
  X.registros.forEach((R, index) => {
    fixo('00100013')
    fixo(index * 2 + 1, 5, true)
    fixo('T ')
    numero(R, 'op', 2)
    if (R.op == 2 || R.op == 4) {
      R.operacao = "Entrada"
    } else if (R.op == 6 || R.op == 44 || R.op == 50) {
      R.operacao = "Pagamento"
    } else if (R.op == 23) {
      R.operacao = "Cartório"
    } else if (R.op == 5 || R.op == 9 || R.op == 25 || R.op == 93) {
      R.operacao = "Baixa"
    } else if ([12, 13, 14, 19, 20, 27, 61].indexOf(R.op) >= 0) {
      R.operacao = "Alteração"
    } else if ([3, 17, 26, 30].indexOf(R.op) >= 0) {
      R.operacao = "Erro"
    }
    fixo(X.agencia, 6, true)
    fixo(X.conta, 13, true)
    fixo(' ')
    texto(R, 'id', 20)
    mapa(R, 'carteira', {
      '1': 'Simples',
      '2': 'Vinculada',
      '4': 'Descontada'
    })
    texto(R, 'documento', 15)
    data(R, 'vencimento', 8)
    numero(R, 'valor', 15, 2)
    mapa(R, 'banco', bancos)
    texto(R, 'agencia', 6)
    fixo(() => R.documento, 25)
    fixo('09')
    fixo('0', 12)
    fixo(() => 
      R.erro == 'A9A4' ? 1050 :
      R.erro == 'A9' ? 1000 :
      R.erro == '04' ? 1010 :
      R.erro == '08' ? R.operacao != 'Pagamento' ? 0 : 1011 :
      R.erro == '33' ? 1006 :
      R.erro == '34' ? 1004 : 0
    , 4, true)
    fixo('0', 37)
    fixo(' ', 3)
    fixo('0', 10)
    numero(R, 'tarifa', 15, 2)
    texto(R, 'erro', 4)
    fixo(' ', 6)
    mapa(R, 'carteira', {
      '11': 'Simples',
      '31': 'Vinculada',
      '51': 'Descontada'
    })
    fixo('019')
    fixo(X.info, 6, true)
    fixo(() => R.operacao != 'Entrada' || R.erro[0] == 'A' ? '' : 
      R.carteira == 'Descontada' || R.op == 4 ? [4, 1] : 
      R.carteira == 'Simples' ? 1 :
      R.carteira == 'Vinculada' ? 2 : ''
    , 1)
    fixo(' ', 5)
    fixo('\r\n')
    fixo('00100013')
    fixo(index * 2 + 2, 5, true)
    fixo('U ')
    fixo(R.op, 2, true)
    numero(R, 'juros', 15, 2)
    fixo('0', 15)
    fixo('0', 15)
    numero(R, 'iof', 15, 2)
    fixo(() => R.operacao != "Pagamento" ? 0 :
      Math.round(100 * (R.valor + R.juros))
    , 15, true)
    numero(R, 'saldo', 15, 2)
    numero(R, 'abatimento', 15, 2)
    fixo('0', 15)
    data(R, 'ocorrencia', 8)
    data(R, 'credito', 8)
    fixo(' ', 12)
    fixo('0', 15)
    fixo(' ', 30)
    fixo('0', 3)
    fixo(' ', 27)
    fixo('\r\n')
  })
  fixo('00100015')
  fixo(' ', 9)
  fixo(X.registros.length * 2 + 2, 6, true)
  numero(X, 'quantidade', 6)
  numero(X, 'total', 17, 2)
  fixo('0', 23)
  numero(X, 'quantidade2', 6)
  fixo('0', 23)
  numero(X, 'total2', 17, 2)
  fixo('0', 31)
  fixo(' ', 94)
  fixo('\r\n')
  fixo('00199999')
  fixo(' ', 9)
  fixo(1, 6, true)
  fixo(X.registros.length * 2 + 4, 6, true)
  fixo('0', 6)
  fixo(' ', 156)
  fixo('0', 29)
  fixo(' ', 20)
  fixo('\r\n')
}
