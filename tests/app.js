import cnab from '../index.js'
import tests from  './tests.js'
import {linhas, copiar} from '../lib.js'

QUnit.config.autostart = false
const Testes = await tests()

QUnit.start()
Object.keys(Testes).forEach(tipo => {
  QUnit.module(tipo, () => {
    const B = Testes[tipo].bancos
    Object.keys(B).forEach(banco => {
      QUnit.test(banco, assert => {
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
          assert.equal(Esperado[i], Resultado[i], `Linha ${i + 1}`)
        }
        assert.equal(b, a, `Número de linhas`)
        assert.equal(resultado, esperado, `Arquivos`)
        assert.equal(cnab(cnab(resultado)), esperado, `Identidade`)
      })
    })
  })
})
