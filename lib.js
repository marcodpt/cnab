const hoje = () => new Date().toISOString().substr(0, 10)

const imprimir = X => JSON.stringify(X, undefined, 2)

const copiar = X => JSON.parse(JSON.stringify(X))

const linhas = texto => {
  const L = texto.split(/\r?\n/)
  L.pop()
  return L
}

const formatoData = (valor, tamanho) => {
  if (
    typeof valor == "string" &&
    /^\d{4}-\d{2}-\d{2}(.\d{2}:\d{2}:\d{2})?/.test(valor) &&
    (tamanho == 6 || tamanho == 8 || tamanho == 12 || tamanho == 14)
  ) {
    const Dados = [
      valor.substr(8, 2),
      valor.substr(5, 2)
    ]
    if (tamanho == 6 || tamanho == 12) {
      Dados.push(valor.substr(2, 2))
    } else {
      Dados.push(valor.substr(0, 4))
    }
    if (tamanho == 12 || tamanho == 14) {
      if (valor.length > 10) {
        Dados.push(valor.substr(11, 2))
        Dados.push(valor.substr(14, 2))
        Dados.push(valor.substr(17, 2))
      } else {
        Dados.push('000000')
      }
    }
    return Dados.join('')
  } else {
    return valor
  }
}

const constante = (valor, tamanho, numerico) => {
  valor = formatoData(valor, tamanho)
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

const dflt = schema => {
  if (schema.const != null) {
    return copiar(schema.const)
  }
  if (schema.type == "object") {
    const P = schema.properties
    const R = copiar(schema.default || {})
    Object.keys(P).forEach(k => {
      const d = dflt(P[k])
      if (d != null) {
        R[k] = d
      }
    })
    return R
  } else if (schema.type == "array") {
    const R = copiar(schema.default || [])
    if (!schema.items) {
      return R
    }
    const d = dflt(schema.items)
    if (d == null) {
      return R
    }
    R.push(d)
    return R
  } else if (schema.default !== undefined) {
    return copiar(schema.default)
  }
}

const tipo = (X, campo) => () => {
  const c = String(X[campo])
  return c.length < 14 || (
    c.substr(0, 3) == "000" && c.substr(8, 3) != "000"
  ) ? '1' : '2'
}

export {hoje, imprimir, linhas, copiar, formatoData, constante, dflt, tipo}
