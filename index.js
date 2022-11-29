import layouts from './layouts.js'
import escritor from './escritor.js'
import leitor from './leitor.js'

export default dados => {
  if (typeof dados == 'string') {
    var valido = false
    var final = null
    var erros = ''
    Object.keys(layouts).forEach(tipo => {
      const schema = layouts[tipo].schema
      Object.keys(layouts[tipo]).forEach(banco => {
        if (banco != 'schema' && !valido) {
          const layout = layouts[tipo][banco]
          try {
            leitor(dados, schema, layout)
            valido = true
          } catch (err) {
            erros += `\n\n\n\n${tipo} ${banco}\n\n${err}`
          }
          if (valido) {
            try {
              final = leitor(dados, schema, layout, banco)
            } catch (err) {
              throw `${tipo} ${banco}\n\n${err}`
            }
          }
        }
      })
    })
    if (!valido) {
      throw `Não foi possível identificar o layout do arquivo${erros}`
    }
    return final
  } else {
    return escritor(dados, layouts[dados.tipo][dados.banco])
  }
}
