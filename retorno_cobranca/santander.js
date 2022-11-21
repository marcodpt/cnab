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
  numero(X, 'agencia', 4)
  numero(X, 'conta', 8)
  numero(X, 'carteira', 8)
  texto(X, 'nome', 30)
  fixo('033SANTANDER', 18)
  data(X, 'criacao', 6)
  fixo('0', 10)
  texto(X, 'id', 7)
  fixo(' ', 274)
  numero(X, 'versao', 3)
  numero(X, 'sequencia', 6)
  fixo('\r\n')
  X.registros.forEach((R, index) => {
    fixo('10')
    fixo(tipo(X, 'cnpjcpf'), 1)
    numero(X, 'cnpjcpf', 14)
    fixo(X.agencia, 4, true)
    fixo(X.conta, 8, true)
    fixo(X.carteira, 8, true)
    fixo(' ', 25)
    numero(R, 'id', 8)
    fixo(' ', 37)
    fixo('2')
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
    texto(R, 'duplicata', 10)
    fixo(R.id, 8, true)
    texto(R, 'mensagem', 11)
    fixo(' ')
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
    fixo(' N ')
    data(R, 'credito', 6)
    texto(R, 'nome', 36)
    fixo(' 00')
    fixo('0', 26)
    const x = Math.round((R.total - R.tarifa) * 100)
    fixo(x, 13, true)
    fixo(x >= 0 ? 'C' : 'D')
    fixo(' ', 11)
    fixo(X.versao, 3, true)
    fixo(index + 2, 6, true)
    fixo('\r\n')
  })
  fixo('9201033')
  fixo(' ', 10)
  numero(X, 'simples_qtde', 8)
  numero(X, 'simples_total', 14, 2)
  texto(X, 'simples_aviso', 8)
  fixo(' ', 50)
  numero(X, 'vinculada_qtde', 8)
  numero(X, 'vinculada_total', 14, 2)
  texto(X, 'vinculada_aviso', 8)
  fixo(' ', 10)
  numero(X, 'escritural_qtde', 8)
  numero(X, 'escritural_total', 14, 2)
  texto(X, 'escritural_aviso', 8)
  fixo(' ', 224)
  fixo(X.versao, 3, true)
  fixo(X.registros.length + 2, 6, true)
  fixo('\r\n')
}
