import remessa_cobranca from './remessa_cobranca/dados.js'
import retorno_cobranca from './retorno_cobranca/dados.js'
import conciliacao from './conciliacao/dados.js'

const Testes = {
  remessa_cobranca: {
    dados: remessa_cobranca,
    bancos: {
      itau: null,
      bradesco: null,
      santander: null,
      caixa: null,
      bb: null,
      daycoval: null
    }
  },
  retorno_cobranca: {
    dados: retorno_cobranca,
    bancos: {
      itau: null,
      bradesco: null,
      santander: null,
      caixa: null,
      bb: null,
      daycoval: null
    }
  },
  conciliacao: {
    dados: conciliacao,
    bancos: {
      itau: null,
      bradesco: null,
      santander: null,
      caixa: null,
      bb: null,
      daycoval: null
    }
  }
}

export default async () => {
  const P = []
  Object.keys(Testes).forEach(tipo => {
    Object.keys(Testes[tipo].bancos).forEach(banco => {
      P.push(fetch(`${tipo}/${banco}.txt`)
        .then(data => data.text())
        .then(arquivo => {
          Testes[tipo].bancos[banco] = arquivo
        })
      )
    })
  })

  return Promise.all(P).then(() => Testes)
}
