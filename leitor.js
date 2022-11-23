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
  valor = valor instanceof Array ? valor : [valor]
  valor = valor.map(v => constante(v, tamanho, numerico))

  if (!valor.reduce((res, v) => res || v == entrada, false)) {
    throw `OPÇÕES\n${valor.join('\n')}\n\nRESULTADO\n${entrada}`
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
      X[chave] = '*'
    } else {
      console.log(imprimir(mapa))
      throw `Não é uma chave possível: ${k}`
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
      const call = [X, Y, A, B].map(
        v => v == null || typeof v == "object" ? null :
          JSON.stringify(v, undefined, 2)
      ).filter(v => v != null).join(', ')
      throw `${Escopo.Arquivo[Escopo.linha - 1]}\n\n${nome}(${call}) linha:${
        Escopo.linha
      }/${Escopo.Arquivo.length} coluna:${Escopo.coluna}\n\n${err}`
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
      throw `${Escopo.Arquivo[linha - 1]}\n\n(fixo) linha: ${
        linha
      } coluna: ${coluna}\n\n${err}`
    }
  })
}

export default (arquivo, schema, layout, banco) => {
  const Escopo = {
    arquivo: Array.from(arquivo),
    Arquivo: arquivo.split('\n'),
    linha: 1,
    coluna: 1,
    proximo: () => {},
    pilha: []
  }

  const X = dflt(schema)

  if (!banco) {
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
    const b = escritor(X, layout).split('\n').length - a
    const n = arquivo.split('\n').length

    if ((n - a) % b) {
      throw 'Não foi possível determinar o número de registros do arquivo!'
    }

    const k = (n - a) / b
    while (X.registros.length < k) {
      X.registros.push(copiar(X.registros[0]))
    }
    X.banco = banco
    leitor(Escopo, X, layout)
    return X
  }
}
