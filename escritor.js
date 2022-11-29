import {constante, formatoData} from './lib.js'

const escrever = (arquivo, dados) => {
  Array.from(dados).forEach(c => {
    arquivo.push(c.toUpperCase()
      .replace('Á', 'A')
      .replace('À', 'A')
      .replace('Â', 'A')
      .replace('Ã', 'A')
      .replace('É', 'E')
      .replace('È', 'E')
      .replace('Ê', 'E')
      .replace('Í', 'I')
      .replace('Ì', 'I')
      .replace('Î', 'I')
      .replace('Ó', 'O')
      .replace('Ò', 'O')
      .replace('Ô', 'O')
      .replace('Õ', 'O')
      .replace('Ú', 'U')
      .replace('Ù', 'U')
      .replace('Û', 'U')
      .replace('Ç', 'C')
      .replace('&', 'E')
    )
  })
}

const fixo = arquivo => (dados, tamanho, numerico) => escrever(arquivo,
  constante(
    typeof dados == 'function' ? dados() :
    dados instanceof Array ? dados[0] : dados
  , tamanho, numerico)
)

const texto = arquivo => (X, campo, tamanho) =>
  escrever(arquivo, constante(X[campo], tamanho))

const numero = arquivo => (X, campo, tamanho, precisao) => escrever(arquivo,
  constante(Math.round(X[campo] * 10 ** (precisao || 0)), tamanho, true)
)

const data = arquivo => (X, campo, tamanho, texto) => {
  var dados = formatoData(X[campo], tamanho)
  if (dados.length != tamanho) {
    dados = constante(texto ? ' ' : '0', tamanho)
  }
  return escrever(arquivo, dados)
}

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
