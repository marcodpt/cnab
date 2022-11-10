import schemas from './schemas.js'
import layouts from './layouts.js'
import escritor from './escritor.js'
import leitor from './leitor.js'

export default dados => {
  if (typeof dados == 'string') {
    var valido = false
    var final = null
    Object.keys(layouts).forEach(tipo => {
      const schema = schemas[tipo]
      Object.keys(layouts[tipo]).forEach(banco => {
        const layout = layouts[tipo][banco]
        if (!valido) {
          try {
            leitor(dados, schema, layout, true)
            valido = true
          } catch (err) {
            console.log(`${tipo} ${banco}`)
            console.log(err)
          }
          try {
            final = leitor(dados, schema, layout)
          } catch (err) {
            throw `${tipo} ${banco} ${err}`
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
