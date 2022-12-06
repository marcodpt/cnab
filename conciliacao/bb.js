import bancos from '../bancos.js'
import {tipo} from '../lib.js'
import categorias from './notas/categorias.js'
import situacoes from './notas/situacoes.js'
import cpmf from './notas/cpmf.js'
import status from './notas/status.js'

export default ({X, fixo, numero, texto, data, mapa}) => {
  fixo('00100000')
  fixo(' ', 9)
  fixo(tipo(X, 'cnpjcpf'), 1)
  numero(X, 'cnpjcpf', 14)
  texto(X, 'codigo', 20)
  numero(X, 'agencia', 6)
  numero(X, 'conta', 13)
  numero(X, 'dac', 1)
  texto(X, 'nome', 30)
  fixo('BANCO DO BRASIL', 30)
  fixo(' ', 10)
  fixo('2')
  data(X, 'geracao', 14)
  numero(X, 'sequencia', 6)
  fixo('08906250')
  fixo(' ', 69)
  fixo('\r\n')
  fixo('00100011E0440032 ')
  fixo(tipo(X, 'cnpjcpf'), 1)
  numero(X, 'cnpjcpf', 14)
  fixo(X.codigo, 20)
  fixo(X.agencia, 6, true)
  fixo(X.conta, 13, true)
  fixo(X.dac, 1)
  fixo(X.nome, 30)
  fixo(' ', 40)
  data(X, 'data_inicial', 8)
  numero(X, 'valor_inicial', 18, 2, true)
  mapa(X, 'status_inicial', status)
  fixo('BRL')
  fixo(X.sequencia, 5, true)
  fixo(' ', 62)
  fixo('\r\n')
  X.registros.forEach((R, index) => {
    fixo('00100013')
    fixo(index + 1, 5, true)
    fixo('E')
    fixo(' ', 3)
    fixo(tipo(X, 'cnpjcpf'), 1)
    fixo(X.cnpjcpf, 14)
    fixo(X.codigo, 20)
    fixo(X.agencia, 6, true)
    fixo(X.conta, 13, true)
    fixo(X.dac, 1)
    fixo(X.nome, 30)
    fixo(' ', 6)
    mapa(R, 'situacao', situacoes)
    fixo('0')
    fixo(() => R.agencia == 0 ? 0 : 1, 1)
    mapa(R, 'banco', bancos)
    numero(R, 'agencia', 5)
    fixo('0', 12)
    fixo(Object.keys(cpmf), 1)
    fixo(R, 'ocorrencia', 8)
    data(R, 'movimento', 8)
    numero(R, 'valor', 18, 2, true)
    mapa(R, 'categoria', categorias)
    texto(R, 'info', 4)
    texto(R, 'descricao', 25)
    texto(R, 'id', 39)
    fixo('\r\n')
  })
  fixo('00100015')
  fixo(' ', 9)
  fixo(tipo(X, 'cnpjcpf'), 1)
  numero(X, 'cnpjcpf', 14)
  fixo(X.codigo, 20)
  fixo(X.agencia, 6, true)
  fixo(X.conta, 13, true)
  fixo(X.dac, 1)
  fixo(' ', 16)
  numero(X, 'bloqueado', 18, 2)
  numero(X, 'limite', 18, 2)
  numero(X, 'pendente', 18, 2)
  data(X, 'data_final', 8)
  numero(X, 'valor_final', 18, 2, true)
  mapa(X, 'status_final', status)
  fixo(X.registros.length + 2, 6, true)
  fixo(Math.round(100 * X.registros.reduce(
    (total, {valor}) => total + (valor < 0 ? -valor : 0)
  , 0)), 18, true)
  fixo(Math.round(100 * X.registros.reduce(
    (total, {valor}) => total + (valor > 0 ? valor : 0)
  , 0)), 18, true)
  fixo(' ', 28)
  fixo('\r\n')
  fixo('00199999')
  fixo(' ', 9)
  fixo('000001')
  fixo(X.registros.length + 4, 6, true)
  fixo('000001')
  fixo(' ', 205)
  fixo('\r\n')
}
