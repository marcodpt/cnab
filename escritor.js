import {constante} from './lib.js'

const escrever = (arquivo, dados) => {
  Array.from(dados).forEach(c => {
    arquivo.push(c)
  })
}

const fixo = arquivo => (dados, tamanho, numerico) => escrever(arquivo,
  constante(typeof dados == 'function' ? dados() : dados, tamanho, numerico)
)

const texto = arquivo => (X, campo, tamanho) =>
  escrever(arquivo, constante(X[campo], tamanho))

const numero = arquivo => (X, campo, tamanho, precisao) => escrever(arquivo,
  constante(Math.round(X[campo] * 10 ** (precisao || 0)), tamanho, true)
)

const data = arquivo => (X, campo, tamanho) => escrever(arquivo,
  /^\d{4}-\d{2}-\d{2}$/.test(X[campo]) ?
    tamanho == 6 ?
      `${X[campo].substr(8, 2)}${X[campo].substr(5, 2)}${X[campo].substr(2, 2)}` : 
    tamanho == 8 ?
      `${X[campo].substr(8, 2)}${X[campo].substr(5, 2)}${X[campo].substr(0, 4)}` :
    constante('0', tamanho) : constante('0', tamanho)
)

const mapa = arquivo => (X, campo, mapa) => {
  const K = Object.keys(mapa)
  const V = Object.values(mapa)
  var i = V.indexOf(X[campo])
  if (i < 0) {
    i = V.indexOf('*')
  }
  return escrever(arquivo, constante(K[i < 0 ? 0 : i], K[0].length, true))
}

export default (Dados, layout) => {
  const Arquivo = []
  layout({
    X: Dados,
    fixo: fixo(Arquivo),
    texto: texto(Arquivo),
    numero: numero(Arquivo),
    data: data(Arquivo),
    mapa: mapa(Arquivo)
  })

  return Arquivo.join('')
}
