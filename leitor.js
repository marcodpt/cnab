import {copiar, imprimir, constante, dflt} from './lib.js'
import escritor from './escritor.js'

const ler = (Escopo, tamanho) => {
  const L = []
  var linha = Escopo.linha
  var coluna = Escopo.coluna
  while (L.length < tamanho && Escopo.arquivo.length) {
    const c = Escopo.arquivo.shift()
    if (c == '\n') {
      linha += 1
      coluna = 1
    } else {
      coluna += 1
    }
    L.push(c)
  }
  if (L.length < tamanho) {
    throw `Arquivo acabou antes do esperado, faltou ${tamanho - L.length} caracter(es)!`
  }
  Escopo.proximo = () => {
    Escopo.linha = linha
    Escopo.coluna = coluna
  }
  return L.join('')
}

const igual = entrada => (valor, tamanho, numerico) => {
  const esperado = constante(valor, tamanho, numerico)
  if (esperado != entrada) {
    throw `DIFERENÇA\n${esperado}\n${entrada}`
  }
}

const fixo = Escopo => (dados, tamanho, numerico) => {
  if (!tamanho && (typeof dados != 'string' || !dados.length)) {
    throw "Não foi possível determinar o tamanho da entrada"
  }
  tamanho = tamanho || dados.length
  const teste = igual(ler(Escopo, tamanho))

  if (typeof dados == 'function') {
    Escopo.pilha.push({
      linha: Escopo.linha,
      coluna: Escopo.coluna,
      teste: () => {
        teste(dados(), tamanho, numerico)
      }
    })
  } else {
    teste(dados, tamanho, numerico)
  }
}

const texto = Escopo => (X, chave, tamanho) => {
  X[chave] = ler(Escopo, tamanho).trimEnd()
}

const numero = Escopo => (X, chave, tamanho, precisao) => {
  const d = ler(Escopo, tamanho)
  const n = parseInt(d)
  if (!isNaN(n)) {
    X[chave] = n / 10 ** (precisao || 0)
  } else {
    throw `Não é um número: ${d}`
  }
}

const data = Escopo => (X, chave, tamanho) => {
  const d = ler(Escopo, tamanho)

  if (tamanho != 6 && tamanho != 8) {
    throw `O tamanho do campo não é válido para datas: ${tamanho}`
  } else if (/^0+$/.test(d) || /^ +$/.test(d)) {
    X[chave] = ""
  } else if (/^\d+$/.test(d)) {
    X[chave] = [
      tamanho == 6 ? '20'+d.substr(4, 2) : d.substr(4, 4),
      d.substr(2, 2),
      d.substr(0, 2)
    ].join('-')
  } else {
    throw `Não é uma data válida: ${d}`
  }
}

const mapa = Escopo => (X, chave, mapa) => {
  const K = Object.keys(mapa)
  const k = ler(Escopo, K[0].length)
  if (mapa[k] != null) {
    X[chave] = mapa[k]
  } else {
    const V = Object.values(mapa)
    const i = V.indexOf('*')
    if (i >= 0) {
      associar(K[i])
    } else {
      throw `${imprimir(mapa)}\nNão é uma chave possível: ${k}`
    }
  }
}

const leitor = (Escopo, Dados, layout) => {
  const embrulho = nome => (X, Y, A, B) => {
    try {
      if (nome == 'fixo') {
        fixo(Escopo)(X, Y, A, B)
      } else {
        if (!X || typeof X != "object") {
          throw "Deve ser passado um objeto por referência"
        } else if (X[Y] == null) {
          throw `Campo desconhecido: ${Y}`
        }
        if (nome == 'texto') {
          texto(Escopo)(X, Y, A, B)
        } else if (nome == 'numero') {
          numero(Escopo)(X, Y, A, B)
        } else if (nome == 'data') {
          data(Escopo)(X, Y, A, B)
        } else if (nome == 'mapa') {
          mapa(Escopo)(X, Y, A, B)
        } else {
          throw 'Nome desconhecido!'
        }
      }
    } catch (err) {
      throw `(${nome}) linha: ${Escopo.linha} coluna: ${Escopo.coluna}\n${err}`
    }
    Escopo.proximo()
  }

  layout({
    X: Dados,
    fixo: embrulho('fixo'),
    texto: embrulho('texto'),
    numero: embrulho('numero'),
    data: embrulho('data'),
    mapa: embrulho('mapa')
  })

  if (Escopo.arquivo.length) {
    throw `${Escopo.arquivo.join()}\nArquivo não terminou no ponto esperado!`
  }

  Escopo.pilha.forEach(({linha, coluna, teste}) => {
    try {
      teste()
    } catch (err) {
      throw `(fixo) linha: ${linha} coluna: ${coluna}\n${err}`
    }
  })

  return X
}

export default (arquivo, schema, layout, teste) => {
  const Escopo = {
    arquivo: Array.from(arquivo),
    linha: 1,
    coluna: 1,
    proximo: () => {},
    pilha: []
  }

  const X = dflt(schema)

  if (teste) {
    X.registros = []
    try {
      leitor(Escopo, X, layout)
    } catch (err) {
      if (Escopo.linha == 1) {
        throw err
      }
    }
  } else {
    const a = escritor({
      ...X,
      registros: []
    }, layout).split('\n').length
    const b = escritor(X, layout).split('\n').length
    const n = arquivo.split('\n')

    if ((n - a) % b) {
      throw 'Não foi possível determinar o número de registros do arquivo!'
    }

    const k = (n - a) / b
    while (X.registros.length < k) {
      X.registros.push(copiar(X.registros[0]))
    }
    leitor(Escopo, X, layout)
  }
}
