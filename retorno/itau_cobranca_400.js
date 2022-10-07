import bancos from '../bancos.js'
import carteiras from '../itau/carteiras.js'
import especies from '../itau/especies.js'
import liquidacoes from '../itau/liquidacoes.js'
import {retorno as ocorrencias} from '../itau/ocorrencias.js'

export default {
  teste: /^02RETORNO01COBRANCA.{57}341BANCO ITAU S\.A\..{11}BPI.{292}$/,
  tipos: {
    header: {
      teste: /^02.{7}01.{65}341.{321}$/,
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
      dados: ({texto, data, numero, opcao}) => ({
        registro: opcao(2, 2, ['CPF', 'CNPJ']),
        inscricao: texto(4, 14),
        agencia: numero(18, 4),
        conta: numero(24, 5),
        digito: numero(29, 1),
        carteira: opcao(83, 3, carteiras),
        titulo: texto(117, 10),
        boleto: texto(63, 8),
        ocorrencia: opcao(109, 2, ocorrencias),
        data: data(111, 6),
        vencimento: data(147, 6),
        valor: numero(153, 13, 2),
        banco: opcao(166, 3, bancos),
        cobradora: texto(169, 4)+'-'+texto(173, 1),
        especie: opcao(174, 2, especies),
        tarifa: numero(176, 13, 2),
        iof: numero(215, 13, 2),
        abatimento: numero(228, 13, 2),
        descontos: numero(241, 13, 2),
        principal: numero(254, 13, 2),
        juros: numero(267, 13, 2),
        outros: numero(280, 13, 2),
        credito: data(296, 6),
        nome: texto(325, 30),
        cancelada: numero(302, 4),
        erros: texto(378, 8),
        liquidacao: opcao(393, 2, liquidacoes),
        indice: numero(396, 6)
      })
    },
    trailer: {
      teste: /^9201341.{393}$/,
      dados: ({texto, data, numero, opcao}) => ({
        simples: {
          quantidade: numero(18, 8),
          total: numero(26, 14, 2),
          aviso: texto(40, 8)
        },
        vinculada: {
          quantidade: numero(58, 8),
          total: numero(66, 14, 2),
          aviso: texto(80, 8)
        },
        escritural: {
          quantidade: numero(178, 8),
          total: numero(186, 14, 2),
          aviso: texto(200, 8)
        },
        sequencia: numero(208, 5),
        items: numero(213, 8),
        total: numero(221, 14, 2),
        indice: numero(395, 6)
      })
    }
  },
  assinatura: /^header\n(registro\n)+trailer$/,
  base: () => ({
    registros: []
  }),
  item: (base, tipo, dados, indice) => {
    if (dados.indice != indice + 1) {
      throw `Erro no indice: [${dados.indice} | ${indice + 1}]`
    }
    delete dados.indice

    if (tipo == 'header') {
      Object.keys(dados).forEach(campo => {
        base[campo] = dados[campo]
      })
    } else if (tipo == 'registro') {
      const T = ['agencia', 'conta', 'digito', 'credito']
      T.forEach(campo => {
        if (dados[campo] != base[campo] && dados[campo] != null) {
          throw `Erro ${campo}: [${dados[campo]} | ${base[campo]}]`
        }
        delete dados[campo]
      })
      base.registros.push(dados)
    } else if (tipo == 'trailer') {
      const n = base.registros.length
      if (dados.items != n) {
        throw `Erro nro registros: [${dados.items} | ${n}]`
      }

      const t = base.registros.reduce((t, r) => t + r.valor, 0).toFixed(2)
      if (dados.total != t) {
        throw `Erro total: [${dados.total} | ${t}]`
      }

      if (dados.sequencia != base.sequencia) {
        throw `Erro sequencia: [${dados.sequencia} | ${base.sequencia}]`
      }
      delete dados.sequencia
      Object.keys(dados).forEach(campo => {
        base[campo] = dados[campo]
      })
    }
  }
}
