import remessa_cobranca from './remessa_cobranca/schema.js'
import retorno_cobranca from './retorno_cobranca/schema.js'
import remessa_cobranca_itau from './remessa_cobranca/itau.js'
import retorno_cobranca_itau from './retorno_cobranca/itau.js'

export default {
  remessa_cobranca: {
    schema: remessa_cobranca,
    itau: remessa_cobranca_itau
  },
  retorno_cobranca: {
    schema: retorno_cobranca,
    itau: retorno_cobranca_itau
  }
}
