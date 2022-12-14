import bancos from '../bancos.js'
import {tipo} from '../lib.js'
import servicos from './notas/servicos.js'
import pagamentos from './notas/pagamentos.js'

export default ({X, fixo, numero, texto, data, mapa}) => {
  fixo('03300000')
  fixo(' ', 9)
  fixo(tipo(X, 'cnpjcpf'), 1)
  numero(X, 'cnpjcpf', 14)
  texto(X, 'codigo', 20)
  numero(X, 'agencia', 6)
  numero(X, 'conta', 13)
  numero(X, 'dac', 1)
  texto(X, 'nome', 30)
  fixo('BANCO SANTANDER', 30)
  fixo(' ', 10)
  fixo('1')
  data(X, 'geracao', 14)
  numero(X, 'sequencia', 6)
  fixo('06000000')
  fixo(' ', 69)
  fixo('\n')
  fixo('03300011C')
  mapa(X, 'servico', servicos)
  mapa(X, 'pagamento', pagamentos)
  fixo('031', 4)
  fixo(tipo(X, 'cnpjcpf'), 1)
  fixo(X.cnpjcpf, 14)
  fixo(X.codigo, 20)
  fixo(X.agencia, 6, true)
  fixo(X.conta, 13, true)
  fixo(X.dac, 1, true)
  fixo(X.nome, 30)
  fixo(' ', 40)
  texto(X, 'endereco', 30)
  texto(X, 'numero', 5)
  texto(X, 'complemento', 15)
  texto(X, 'cidade', 20)
  texto(X, 'cep', 8)
  texto(X, 'uf', 2)
  fixo(' ', 18)
  fixo('\n')
  X.registros.forEach((R, index) => {
    fixo('03300013')
    fixo(index * 2 + 1, 5, true)
    fixo('A000000')
    mapa(R, 'banco', bancos)
    numero(R, 'agencia', 6)
    numero(R, 'conta', 13)
    numero(R, 'dac', 1)
    texto(R, 'nome', 30)
    texto(R, 'documento', 20)
    data(R, 'vencimento', 8)
    fixo('BRL', 3)
    fixo('0', 15)
    numero(R, 'valor', 15, 2)
    fixo(' ', 20)
    fixo('0', 23)
    fixo(' ', 63)
    fixo('\n')
    fixo('03300013')
    fixo(index * 2 + 2, 5, true)
    fixo('B   ')
    fixo(tipo(R, 'cnpjcpf'), 1)
    texto(R, 'cnpjcpf', 14)
    fixo(' ', 95)
    data(R, 'vencimento', 8)
    fixo('0', 75)
    fixo(' ', 30)
    fixo('\n')
  })
  fixo('03300015')
  fixo(' ', 9)
  fixo(X.registros.length * 2 + 2, 6, true)
  fixo(Math.round(100 * X.registros.reduce(
    (total, {valor}) => total + valor
  , 0)), 18, true)
  fixo(' ', 199)
  fixo('\n')
  fixo('03399999')
  fixo(' ', 9)
  fixo('000001')
  fixo(X.registros.length * 2 + 4, 6, true)
  fixo(' ', 211)
  fixo('\n')
}
