import itau_cobranca_400 from './itau_cobranca_400.js'
import schemas from '../schemas/index.js'
import {print, getLen} from '../lib.js'

const retorno = {itau_cobranca_400}

const old = dados => {
  const Linhas = dados.trim().split('\n').map(l => l.trim())
  if (Linhas.length < 1) {
    throw "Arquivo vazio!"
  }

  const formato = Object.keys(retorno).reduce((formato, k) => {
    if (formato == '' && retorno[k].teste.test(Linhas[0])) {
      formato = k 
    }
    return formato 
  }, '')

  if (formato == '') {
    throw 'Formato do arquivo não suportado!'
  }

  const {tipos, assinatura, base, item} = retorno[formato]
  const Assinatura = []
  const Resultado = base()

  Linhas.forEach((linha, seq) => {
    const texto = (inicio, comprimento) =>
      linha.substr(inicio - 1, comprimento).trim()

    const data = (inicio, comprimento) => {
      const d = texto(inicio, comprimento)
      if (/^\d+$/.test(d) && !/^0+$/.test(d)) {
        if (comprimento == 6) {
          return '20'+d.substr(4, 2)+'-'+d.substr(2, 2)+'-'+d.substr(0, 2)
        }
      }
    }

    const numero = (inicio, comprimento, decimais) => {
      var n = texto(inicio, comprimento)
      n = parseInt(n)
      if (n && !isNaN(n) && decimais) {
        return n / 10 ** decimais
      } else {
        return n
      }
    }

    const opcao = (inicio, comprimento, opcoes) => {
      if (opcoes instanceof Array) {
        const n = numero(inicio, comprimento)
        return n && !isNaN(n) ? opcoes[n - 1] : null
      } else {
        return opcoes[texto(inicio, comprimento)]
      }
    }

    const tipo = Object.keys(tipos).reduce((tipo, t) => {
      if (tipo == '' && tipos[t].teste.test(linha)) {
        tipo = t
      }
      return tipo
    }, '')

    if (tipo == '') {
      console.log(linha)
      throw `[${formato}] (${seq+1}): tipo da linha desconhecido!`
    }

    try {
      item(
        Resultado,
        tipo,
        (tipos[tipo].dados || (() => ({})))({texto, data, numero, opcao}),
        seq
      )
    } catch (err) {
      throw `[${formato} ${tipo}] (${seq+1}): ${err}`
    }

    Assinatura.push(tipo)
  })

  const a = Assinatura.join('\n')
  if (!assinatura.test(a)) {
    console.log(a)
    throw `[${formato}]: assinatura incorreta do arquivo!`
  }

  return Resultado
}

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

    var d = linha.substr(pos, len).trim()
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

export {old, reader}
