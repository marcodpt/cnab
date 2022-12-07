import remessa_cobranca from './remessa_cobranca/schema.js'
import retorno_cobranca from './retorno_cobranca/schema.js'
import sispag from './sispag/schema.js'
import conciliacao from './conciliacao/schema.js'
import remessa_cobranca_itau from './remessa_cobranca/itau.js'
import retorno_cobranca_itau from './retorno_cobranca/itau.js'
import sispag_itau from './sispag/itau.js'
import conciliacao_itau from './conciliacao/itau.js'
import remessa_cobranca_bradesco from './remessa_cobranca/bradesco.js'
import retorno_cobranca_bradesco from './retorno_cobranca/bradesco.js'
import conciliacao_bradesco from './conciliacao/bradesco.js'
import remessa_cobranca_santander from './remessa_cobranca/santander.js'
import retorno_cobranca_santander from './retorno_cobranca/santander.js'
import conciliacao_santander from './conciliacao/santander.js'
import remessa_cobranca_bb from './remessa_cobranca/bb.js'
import retorno_cobranca_bb from './retorno_cobranca/bb.js'
import sispag_bb from './sispag/bb.js'
import conciliacao_bb from './conciliacao/bb.js'
import remessa_cobranca_caixa from './remessa_cobranca/caixa.js'
import retorno_cobranca_caixa from './retorno_cobranca/caixa.js'
import conciliacao_caixa from './conciliacao/caixa.js'
import remessa_cobranca_daycoval from './remessa_cobranca/daycoval.js'
import retorno_cobranca_daycoval from './retorno_cobranca/daycoval.js'
import conciliacao_daycoval from './conciliacao/daycoval.js'

export default {
  remessa_cobranca: {
    schema: remessa_cobranca,
    itau: remessa_cobranca_itau,
    bradesco: remessa_cobranca_bradesco,
    santander: remessa_cobranca_santander,
    bb: remessa_cobranca_bb,
    caixa: remessa_cobranca_caixa,
    daycoval: remessa_cobranca_daycoval
  },
  retorno_cobranca: {
    schema: retorno_cobranca,
    itau: retorno_cobranca_itau,
    bradesco: retorno_cobranca_bradesco,
    santander: retorno_cobranca_santander,
    bb: retorno_cobranca_bb,
    caixa: retorno_cobranca_caixa,
    daycoval: retorno_cobranca_daycoval
  },
  sispag: {
    schema: sispag,
    itau: sispag_itau,
    bb: sispag_bb
  },
  conciliacao: {
    schema: conciliacao,
    itau: conciliacao_itau,
    bradesco: conciliacao_bradesco,
    santander: conciliacao_santander,
    bb: conciliacao_bb,
    caixa: conciliacao_caixa,
    daycoval: conciliacao_daycoval
  }
}
