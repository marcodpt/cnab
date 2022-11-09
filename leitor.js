import {copiar, imprimir} from './lib.js'

const dflt = schema => {
  if (schema.const != null) {
    return schema.const
  }
  if (schema.type == "object") {
    const P = schema.properties
    const R = schema.default || {}
    Object.keys(P).forEach(k => {
      const d = dflt(R[k])
      if (d != null) {
        R[k] = d
      }
    })
    return R
  } else if (schema.type == "array") {
    const R = schema.default || []
    if (!schema.minItems || !schema.items) {
      return R
    }
    const d = dflt(schema.items)
    if (d == null) {
      return R
    }
    for (var i = 0; i < schema.minItems; i++) {
      R.push(copiar(d))
    }
  } else {
    return schema.dflt
  }
}

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

const constante = (valor, tamanho, numerico) => {
  const d = String(valor)
  var r = d.substr(0, tamanho)
  while (r.length < tamanho) {
    if (numerico) {
      r = '0'+r
    } else if (typeof valor == "string" && valor.length == 1) {
      r += d
    } else {
      r += ' '
    }
  }
  return r
}

const igual = entrada => (valor, tamanho, numerico) => {
  const entrada = constante(valor, tamanho, numerico)
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

export default (arquivo, schema, layout, teste) => {
  const Escopo = {
    arquivo: Array.from(arquivo),
    linha: 1,
    coluna: 1,
    proximo: () => {},
    teste: teste === true,
    pilha: []
  }
  const X = dflt(schema)

  const embrulho = (nome) => (X, Y, A, B) => {
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
    X: X,
    fixo: embrulho('fixo'),
    texto: embrulho('texto')
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
