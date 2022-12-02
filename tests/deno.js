import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts"
import cnab from '../index.js'
import {linhas, copiar} from '../lib.js'
import remessa_cobranca from './remessa_cobranca/dados.js'
import retorno_cobranca from './retorno_cobranca/dados.js'

const Testes = {
  remessa_cobranca: {
    dados: remessa_cobranca,
    bancos: {
      itau: await Deno.readTextFile("./remessa_cobranca/itau.txt"),
      bradesco: await Deno.readTextFile("./remessa_cobranca/bradesco.txt"),
      santander: await Deno.readTextFile("./remessa_cobranca/santander.txt"),
      caixa: await Deno.readTextFile("./remessa_cobranca/caixa.txt"),
      bb: await Deno.readTextFile("./remessa_cobranca/bb.txt"),
      daycoval: await Deno.readTextFile("./remessa_cobranca/daycoval.txt")
    }
  },
  retorno_cobranca: {
    dados: retorno_cobranca,
    bancos: {
      itau: await Deno.readTextFile("./retorno_cobranca/itau.txt"),
      bradesco: await Deno.readTextFile("./retorno_cobranca/bradesco.txt"),
      santander: await Deno.readTextFile("./retorno_cobranca/santander.txt"),
      caixa: await Deno.readTextFile("./retorno_cobranca/caixa.txt"),
      bb: await Deno.readTextFile("./retorno_cobranca/bb.txt"),
      daycoval: await Deno.readTextFile("./retorno_cobranca/daycoval.txt")
    }
  }
}

Object.keys(Testes).forEach(tipo => {
  const B = Testes[tipo].bancos
  Object.keys(B).forEach(banco => {
    Deno.test(`${tipo} ${banco}`, () => {
      const esperado = B[banco]
      const Esperado = linhas(esperado)
      const a = Esperado.length
      const resultado = cnab({
        ...copiar(Testes[tipo].dados),
        banco: banco
      })
      const Resultado = linhas(resultado)
      const b = Resultado.length

      for (var i = 0; i < a && i < b; i++) {
        assertEquals(Esperado[i], Resultado[i])
      }
      assertEquals(b, a)
      assertEquals(resultado, esperado)
      assertEquals(cnab(cnab(resultado)), esperado)
    })
  })
})
