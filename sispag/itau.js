import bancos from '../bancos.js'
import uf from '../uf.js'
import {tipo} from '../lib.js'
import servicos from './notas/servicos.js'
import pagamentos from './notas/pagamentos.js'

export default ({X, fixo, numero, texto, data, mapa}) => {
  fixo('34100000')
  fixo(' ', 6)
  fixo('080')
  fixo(tipo(X, 'cnpjcpf'), 1)
  numero(X, 'cnpjcpf', 14)
  fixo(' ', 20)
  numero(X, 'agencia', 5)
  fixo(' ')
  numero(X, 'conta', 12)
  fixo(' ')
  numero(X, 'dac', 1)
  texto(X, 'nome', 30)
  fixo('BCO ITAU S/A', 30)
  fixo(' ', 10)
  fixo('1')
  data(X, 'geracao', 14)
  fixo('0', 14)
  fixo('SISPAGWITV2018', 69)
  fixo('\r\n')
  fixo('34100011C')
  mapa(X, 'servico', servicos)
  mapa(X, 'pagamento', pagamentos)
  fixo('040', 4)
  fixo(tipo(X, 'cnpjcpf'), 1)
  fixo(X.cnpjcpf, 14)
  fixo(' ', 20)
  fixo(X.agencia, 5, true)
  fixo(' ')
  fixo(X.conta, 12, true)
  fixo(' ')
  fixo(X.dac, 1, true)
  fixo(X.nome, 30)
  fixo(' ', 40)
  texto(X, 'endereco', 30)
  numero(X, 'numero', 5)
  texto(X, 'complemento', 15)
  texto(X, 'cidade', 20)
  texto(X, 'cep', 8)
  texto(X, 'uf', 2)
  fixo(' ', 18)
  fixo('\r\n')
  X.registros.forEach((R, index) => {
    fixo('34100013')
    fixo(index + 1, 5, true)
    fixo('A000000')
    mapa(R, 'banco', bancos)
    numero(R, 'agencia', 5)
    fixo(' ')
    numero(R, 'conta', 12)
    fixo(' ')
    numero(R, 'dac', 1)
    texto(R, 'nome', 30)
    texto(R, 'documento', 20)
    data(R, 'vencimento', 8)
    fixo(['009', 'REA'], 3)
    fixo('0', 15)
    numero(R, 'valor', 15, 2)
    fixo(' ', 20)
    fixo('0', 23)
    fixo(' ', 20)
    fixo('0', 6)
    texto(R, 'cnpjcpf', 14)
    fixo(' ', 12)
    fixo('0')
    fixo(' ', 10)
    fixo('\r\n')
  })
  fixo('34100015')
  fixo(' ', 9)
  fixo(X.registros.length + 2, 6, true)
  fixo(Math.round(100 * X.registros.reduce(
    (total, {valor}) => total + valor
  , 0)), 18, true)
  fixo('0', 18)
  fixo(' ', 181)
  fixo('\r\n')
  fixo('34199999')
  fixo(' ', 9)
  fixo('000001')
  fixo(X.registros.length + 4, 6, true)
  fixo(' ', 211)
  fixo('\r\n')
}
