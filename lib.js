const hoje = () => new Date().toISOString().substr(0, 10)

const print = obj => console.log(JSON.stringify(obj, undefined, 2))

const getLen = schema => {
  if (schema.format == 'date6') {
    return 6
  } else if (schema.format == 'date8') {
    return 8
  } else if (schema.type == 'string' && schema.maxLength != null) {
    return schema.maxLength
  } else if (schema.type == 'string' && typeof schema.const == 'string') {
    return schema.const.length
  } else if (schema.type == 'integer' && schema.maximum != null) {
    return String(schema.maximum).length
  } else if (schema.type == 'integer' && schema.const != null) {
    return String(schema.const).length
  } else if (schema.type == 'number' && schema.maximum != null) {
    return String(schema.maximum).replace('.', '').length
  } else {
    return 0
  }
}

const texto = linha => {
  if (linha == null) {
    return (dados, comprimento) => {
      var r = String(dados).substr(0, comprimento)
      while (r.length < comprimento) {
        r += ' '
      }
      return r
    }
  } else {
    return (set, comprimento) => {
      const L = []
      while (L.length < comprimento && linha.length) {
        L.push(linha.shift())
      }
      set(L.join(''))
    }
  }
}

const numero = (dados, comprimento, precisao) => {
  if (
    typeof dados == 'object' &&
    dados &&
    typeof dados.read == 'function' &&
    typeof dados.write == 'function'
  ) {
    const {read, write} = dados
    const r = parseInt(read(comprimento))
    write(isNaN(r) ? null : r / (10 ** (precisao || 0)))
  } else {
    var r = String(Math.round(dados * 10 ** (precisao || 0)))
      .substr(0, comprimento)
    while (r.length < comprimento) {
      r = '0'+r
    }
    return r
  }
}

export {hoje, print, getLen}
