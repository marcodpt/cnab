import layouts from './layouts.js'
import escritor from './escritor.js'
import leitor from './leitor.js'

export default dados => {
  if (typeof dados == 'string') {
    var valido = false
    var final = null
    Object.keys(layouts).forEach(tipo => {
      const schema = layouts[tipo].schema
      Object.keys(layouts[tipo]).forEach(banco => {
        if (banco != 'schema' && !valido) {
          const layout = layouts[tipo][banco]
          try {
            leitor(dados, schema, layout)
            valido = true
          } catch (err) {
            console.log(`${tipo} ${banco}`)
            console.log(err)
          }
          if (valido) {
            try {
              final = leitor(dados, schema, layout, banco)
            } catch (err) {
              throw `${tipo} ${banco} ${err}`
            }
          }
        }
      })
    })
    if (!valido) {
      throw 'Não foi possível identificar o layout do arquivo'
    }
    return final
  } else {
    return escritor(dados, layouts[dados.tipo][dados.banco])
  }
}
