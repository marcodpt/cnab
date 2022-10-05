export default {
  teste: /^02RETORNO01COBRANCA.{57}341BANCO ITAU S\.A\..{11}BPI.{292}$/,
  tipos: {
    header: {
      teste: /^0.{399}$/,
      dados: ({texto, data, numero}) => ({
        servico: texto(3, 7)+' '+texto(12, 15),
        banco: texto(80, 15),
        agencia: numero(27, 4),
        conta: numero(33, 5),
        digito: numero(38, 1),
        empresa: texto(47, 30),
        geracao: data(95, 6),
        sequencia: numero(109, 5),
        credito: data(114, 6),
        indice: numero(395, 6)
      })
    },
    registro: {
      teste: /^1.{399}$/,
    },
    trailer: {
      teste: /^9.{399}$/,
    }
  },
  assinatura: /^header\n(registro\n)+trailer$/
}
