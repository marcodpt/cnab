import itau_cobranca_400 from './itau_cobranca_400.js'
import schemas from '../schemas/index.js'
import {print, getLen} from '../lib.js'

const retorno = {itau_cobranca_400}

const readLine = (schema, linha) => {
  if (schema.type != 'object') {
    print(schema)
    throw 'O JSON esquema deve ser do tipo: objeto'
  }
  if (schema.properties == null) {
    print(schema)
    throw 'O JSON esquema deve contêr propriedades'
  }
  const P = schema.properties

  const Dados = {}
  var pos = 0
  Object.keys(P).forEach(k => {
    const len = getLen(P[k])

    if (!len) {
      print(P[k])
      throw `Não foi possível determinar o tamanho da entrada: ${k}`
    }


    const x = linha.substr(pos, len)

    var d = x.trim()
    if (d.length) {
      d = x.substr(0, x.indexOf(d) + d.length)
    }
    pos += len

    if (P[k].enum != null) {
      const i = P[k].enum.indexOf(d)

      if (i < 0) {
        print(Dados)
        console.log(linha)
        print(P[k].enum)
        throw `[${k}] não é uma das opções possíveis: ${d}`
      }

      if (P[k].labels && P[k].labels[i] != null) {
        d = P[k].labels[i]
      }
    } else if (P[k].format == "date6") {
      if (/^\d{6}$/.test(d) && !/^0+$/.test(d)) {
        d = '20'+d.substr(4, 2)+'-'+d.substr(2, 2)+'-'+d.substr(0, 2)
      }
    } else if (P[k].type == "integer" || P[k].type == "number") {
      if (!/^\d+$/.test(d)) {
        throw `[${k}] deve ser um número: ${d}`
      }
      d = parseInt(d)

      if (P[k].type == "number") {
        if (!P[k].multipleOf) {
          print(P[k])
          throw `[${k}] precisão numérica indefinida (multipleOf)!`
        }

        const pow = Math.round(1 / P[k].multipleOf)
        d = d / pow
      }
    }

    Dados[k] = d
    if (P[k].const != null && typeof P[k].const != 'function') {
      if (d !== P[k].const /*&& (!/^0+$/.test(d) || P[k].const != "")*/) {
        print(Dados)
        console.log(linha)
        print(P[k])
        throw `[${k}] deveria ser exatamente: (${P[k].const}). Obtido: (${d})`
      }
      if (typeof d != 'string' || d === "") {
        delete Dados[k]
      }
    }
  })

  if (pos != linha.length) {
    print(schema)
    console.log(linha)
    throw `O tamanho da linha (${linha.length}) difere do esperado (${pos})`
  }

  return Dados
}

const checkDynConst = (Dados, linha, schema) => {
  const P = schema.properties
  Object.keys(P).forEach(k => {
    if (typeof P[k].const == 'function') {
      const d = P[k].const(Dados, linha)
      if (d != linha[k]) {
        print(Dados)
        print(linha)
        print(P[k])
        throw `[${k}] deveria ser exatamente: (${d}). Obtido: (${linha[k]})`
      }
      delete linha[k]
    }
  })
}

const reader = (dados, schema) => {
  const Linhas = dados.trim().split('\n').map(l => l.trim())
  if (Linhas.length < 2) {
    throw "Todo arquivo deve contêr ao menos o header e o trailer!"
  }

  const Dados = {
    header: null,
    registros: [],
    trailer: null
  }
  schema = Object.keys(schemas).reduce((schema, k) => {
    if (schema == null) {
      try {
        Dados.header = readLine(schema.properties.header, Linhas[0])
        schema = schemas[k]
      } catch (err) {}
    }
    return schema
  }, schema)

  if (schema == null) {
    throw 'Não foi possível reconhecer o JSON schema associado aos dados!'
  }
  if (Dados.header == null) {
    Dados.header = readLine(schema.properties.header, Linhas.shift())
  }

  Dados.trailer = readLine(schema.properties.trailer, Linhas.pop())
  Linhas.forEach(linha => {
    Dados.registros.push(readLine(schema.properties.registros.items, linha))
  })

  checkDynConst(Dados, Dados.header, schema.properties.header)
  checkDynConst(Dados, Dados.trailer, schema.properties.trailer)
  Dados.registros.forEach(linha => {
    checkDynConst(Dados, linha, schema.properties.registros.items)
  })

  return Dados
}

const writeLine = (schema, Dados, Global) => {
  if (schema.type != 'object') {
    print(Dados)
    print(schema)
    throw 'O JSON esquema deve ser do tipo: objeto'
  }
  if (schema.properties == null) {
    print(Dados)
    print(schema)
    throw 'O JSON esquema deve contêr propriedades'
  }

  const P = schema.properties
  return Object.keys(P).reduce((linha, k) => {
    var x = null

    if (typeof P[k].const == 'function') {
      x = P[k].const(Global, Dados)
    } else if (P[k].const != null) {
      x = P[k].const
    } else if (Dados[k] != null) {
      x = Dados[k]
    } else if (P[k].default != null) {
      x = P[k].default
    } else {
      print(Dados)
      print(schema)
      throw `[${k}] não tem valor definido!`
    }

    if (P[k].enum instanceof Array) {
      const L = P[k].labels instanceof Array ? P[k].labels : P[k].enum

      var i = L.indexOf(x)
      if (i < 0) {
        i = P[k].enum.indexOf(x)
      }

      if (i < 0) {
        print(Dados)
        print(schema)
        print(L)
        throw `[${k}] ${x} não é uma opção válida!`
      } else {
        x = P[k].enum[i]
      }
    }

    if (typeof x == "string" && P[k].format == "date6") {
      x = `${x.substr(8, 2)}${x.substr(5, 2)}${x.substr(2, 2)}`
    }

    const len = getLen(P[k])
    if (!len) {
      print(Dados)
      print(schema)
      throw `Não foi possível determinar o tamanho da entrada: ${k}`
    }

    if (P[k].type == 'integer' || P[k].type == 'number') {
      if (P[k].type == 'integer') {
        x = String(x)
      } else if (P[k].type == 'number') {
        if (!P[k].multipleOf) {
          print(Dados)
          print(schema)
          throw `[${k}] precisão numérica indefinida (multipleOf)!`
        }
        x = String(Math.round(x / P[k].multipleOf))
      }
      while (x.length < len) {
        x = '0'+x
      }
    } else if (P[k].type == 'string'){
      while (x.length < len) {
        x = x+' '
      }
    } else {
      throw `[${k}] tipo (${t}) não é suportado!`
    }

    return linha+x
  }, '')
}

const writer = (Dados, schema) => {
  const L = []
  const P = schema.properties
  Object.keys(P).forEach(key => {
    if (P[key].type == "object") {
      L.push(writeLine(P[key], Dados[key], Dados))
    } else if (P[key].type == "array" && Dados[key] instanceof Array) {
      Dados[key].forEach(item => {
        L.push(writeLine(P[key].items, item, Dados))
      })
    }
  })

  return L.join('\n')
}

export {reader, writer} 
