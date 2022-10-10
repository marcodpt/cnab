const hoje = () => Date.now().toISOString().substr(0, 10)

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

export {hoje, print, getLen}
