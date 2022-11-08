import schemas from './schemas.js'
import {texto, numero, data, mapa, fixo, checar} from './lib.js'
import gravadores from './gravadores.js'

const checagem = (dados, esperado) => {
  var linha = 1
  var coluna = 1
  for (var i = 0; i < esperado.length; i++) {
    if (dados[i] != esperado[i] && esperado[i] != '*') {
      throw `${
        esperado.split('\n')[linha - 1]
      }\n${
        dados.split('\n')[linha - 1]
      }\n${linha}:${coluna} [${esperado[i]}] => [${dados[i]}]`
    }
    if (esperado[i] == '\n') {
      linha += 1
      coluna = 1
    } else {
      coluna += 1
    }
  }
}

export default dados => {
  if (typeof dados == 'string') {
    const falso = {
      texto: texto(false),
      numero: numero(false),
      data: data(false),
      mapa: mapa(false),
      fixo
    }
    dados = dados.replace(/\r\n/g, '\n')
    const Dados = dados.trim().split('\n')
    const header = Dados[0]
    var valido = false
    const Final = {
      registros: []
    }
    Object.keys(gravadores).forEach(tipo => {
      const schema = schemas[tipo]
      Object.keys(gravadores[tipo]).forEach(banco => {
        if (!valido) {
          const g = (dados, lib) => gravadores[tipo][banco](dados, lib).trim()
          const Dados0 = {
            tipo,
            banco,
            registros: []
          }
          const Dados1 = {
            tipo,
            banco,
            registros: [{}]
          }
          const r0 = g(Dados0, falso)
          const R0 = r0.split('\n')
          const h = R0[0]

          try {
            checagem(header, h)
            valido = true
          } catch (err) {
            console.log(err)
          }

          if (valido) {
            const r1 = g(Dados1, falso)
            const a = R0.length
            const n = Dados.length - a
            const b = r1.split('\n').length - a
            
            if (n % b) {
              throw `Número de linhas (${n + a}) incompatível com o cabeçalho (${a}) e os registros (${b})`
            }

            const x = n / b
            const Associar = {
              registros: []
            }
            Final.banco = banco
            const B = schema.properties
            Object.keys(B).forEach(k => {
              if (k != 'registros') {
                if (B[k].const != null) {
                  Final[k] = B[k].const
                } else {
                  Associar[k] = dado => {
                    Final[k] = dado
                  }
                }
              }
            })

            for (var i = 0; i < x; i++) {
              Final.registros.push({})
              const a = {}
              const P = B.registros.items.properties
              const j = i
              Object.keys(P).forEach(k => {
                if (P[k].const != null) {
                  Final.registros[j][k] = P[k].const
                } else {
                  a[k] = dado => {
                    Final.registros[j][k] = dado
                  }
                }
              })
              Associar.registros.push(a)
            }

            checagem(dados, g(Final, falso))
            const arquivo = Array.from(dados)
            g(Associar, {
              texto: texto(arquivo),
              numero: numero(arquivo),
              data: data(arquivo),
              mapa: mapa(arquivo),
              fixo: checar(arquivo)
            })
          }
        }
      })
    })
    if (!valido) {
      throw 'Não foi possível identificar o layout do arquivo'
    }
    const registros = Final.registros
    delete Final.registros
    Final.registros = registros
    return Final
  } else {
    return gravadores[dados.tipo][dados.banco](dados, {
      texto: texto(),
      numero: numero(),
      data: data(),
      mapa: mapa(),
      fixo
    })
  }
}
