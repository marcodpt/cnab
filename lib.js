const hoje = () => new Date().toISOString().substr(0, 10)

const imprimir = X => console.log(JSON.stringify(X, undefined, 2))

const copiar = X => JSON.parse(JSON.stringify(X))

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

export {hoje, imprimir, copiar, constante, dflt}
