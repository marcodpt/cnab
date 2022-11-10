import {constante} from './lib.js'

const escrever = (arquivo, dados) => {
  Array.from(dados).forEach(c => {
    arquivo.push(c)
  })
}

const fixo = arquivo => (dados, tamanho, numerico) => escrever(arquivo,
  constante(typeof dados == 'function' ? dados() : dados, tamanho, numerico)
)

const texto = arquivo => (dados, tamanho) =>
  escrever(arquivo, constante(dados, tamanho))

const numero = arquivo => (dados, tamanho, precisao) => escrever(arquivo,
  constante(Math.round(dados * 10 ** (precisao || 0)), tamanho, true)
)

const data = arquivo => (dados, tamanho) => escrever(arquivo,
  /^\d{4}-\d{2}-\d{2}$/.test(dados) ?
    tamanho == 6 ?
      `${dados.substr(8, 2)}${dados.substr(5, 2)}${dados.substr(2, 2)}` : 
    tamanho == 8 ?
      `${dados.substr(8, 2)}${dados.substr(5, 2)}${dados.substr(0, 4)}` :
    constante('0', tamanho) : constante('0', tamanho)
)

const mapa = arquivo => (dados, mapa) => {
  const K = Object.keys(mapa)
  const V = Object.values(mapa)
  var i = V.indexOf(dados)
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
