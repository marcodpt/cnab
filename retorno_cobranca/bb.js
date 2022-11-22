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
  texto(X, 'id', 20)
  numero(X, 'agencia', 6)
  numero(X, 'conta', 13)
  fixo(' ')
  texto(X, 'nome', 30)
  fixo('BANCO DO BRASIL', 30)
  fixo(' ', 10)
  fixo('2')
  data(X, 'criacao', 8)
  texto(X, 'hora', 6)
  numero(X, 'sequencia', 6)
  fixo('03000000')
  texto(X, 'mensagem', 20)
  fixo(' ', 49)
  fixo('\r\n')
  fixo('00100011T0100020 ')
  fixo(tipo(X, 'cnpjcpf'), 1)
  fixo(X.cnpjcpf, 15, true)
  fixo(X.id, 20)
  fixo(X.agencia, 6, true)
  fixo(X.conta, 13, true)
  fixo(' ')
  fixo(X.nome, 31)
  fixo(' ', 39)
  fixo(' ', 40)
  fixo('0', 8)
  data(X, 'criacao', 8)
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
    numero(R, 'carteira', 1)
    texto(R, 'duplicata', 15)
    data(R, 'vencimento', 8)
    numero(R, 'valor', 15, 2)
    mapa(R, 'banco', bancos)
    texto(R, 'agencia', 6)
    fixo(() => R.duplicata, 25)
    fixo('09')
    numero(R, 'tarifa', 16, 2)
    fixo('0', 37)
    fixo(' ', 3)
    fixo('0', 10)
    numero(R, 'custas', 15, 2)
    texto(R, 'pagamento', 10)
    texto(R, 'mensagem', 17)
    fixo('\r\n')
    fixo('00100013')
    fixo(index * 2 + 2, 5, true)
    fixo('U ')
    fixo(R.op, 2, true)
    numero(R, 'juros', 15, 2)
    fixo('0', 15)
    numero(R, 'abatimento', 15, 2)
    numero(R, 'iof', 15, 2)
    numero(R, 'total', 15, 2)
    numero(R, 'saldo', 15, 2)
    numero(R, 'despesas', 15, 2)
    numero(R, 'outros', 15, 2)
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
  numero(X, 'simples_qtde', 6)
  numero(X, 'simples_total', 17, 2)
  fixo('0', 23)
  numero(X, 'vinculada_qtde', 6)
  fixo('0', 23)
  numero(X, 'vinculada_total', 17, 2)
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
