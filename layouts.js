import remessa_cobranca from './remessa_cobranca/schema.js'
import retorno_cobranca from './retorno_cobranca/schema.js'
import remessa_cobranca_itau from './remessa_cobranca/itau.js'
import retorno_cobranca_itau from './retorno_cobranca/itau.js'
import remessa_cobranca_bradesco from './remessa_cobranca/bradesco.js'
import retorno_cobranca_bradesco from './retorno_cobranca/bradesco.js'
import remessa_cobranca_santander from './remessa_cobranca/santander.js'
import retorno_cobranca_santander from './retorno_cobranca/santander.js'
import remessa_cobranca_bb from './remessa_cobranca/bb.js'
import retorno_cobranca_bb from './retorno_cobranca/bb.js'
import remessa_cobranca_caixa from './remessa_cobranca/caixa.js'
import remessa_cobranca_daycoval from './remessa_cobranca/daycoval.js'

export default {
  retorno_cobranca: {
    schema: retorno_cobranca,
    itau: retorno_cobranca_itau,
    bradesco: retorno_cobranca_bradesco,
    santander: retorno_cobranca_santander,
    bb: retorno_cobranca_bb
  },
  remessa_cobranca: {
    schema: remessa_cobranca,
    itau: remessa_cobranca_itau,
    bradesco: remessa_cobranca_bradesco,
    santander: remessa_cobranca_santander,
    bb: remessa_cobranca_bb,
    caixa: remessa_cobranca_caixa,
    daycoval: remessa_cobranca_daycoval
  }
}
