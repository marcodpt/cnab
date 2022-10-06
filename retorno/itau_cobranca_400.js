import bancos from '../bancos.js'

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
        carteira: opcao(83, 3, {
          '108': 'DIRETA ELETRÔNICA EMISSÃO INTEGRAL – CARNÊ',
          '104': 'ESCRITURAL ELETRÔNICA – CARNÊ',
          '138': 'ESCRITURAL ELETRÔNICA – MENSAGEM COLORIDA',
          '112': 'ESCRITURAL ELETRÔNICA – SIMPLES',
          '173': 'SEM REGISTRO COM EMISSÃO E ENTREGA',
          '196': 'SEM REGISTRO COM EMISSÃO E ENTREGA – 15 POSIÇÕES',
          '103': 'SEM REGISTRO COM EMISSÃO E ENTREGA – CARNÊ',
          '147': 'ESCRITURAL ELETRÔNICA – DÓLAR'
        }),
        titulo: texto(117, 10),
        boleto: texto(63, 8),
        ocorrencia: opcao(109, 2, {
          '02': 'ENTRADA CONFIRMADA COM POSSIBILIDADE DE MENSAGEM',
          '03': 'ENTRADA REJEITADA',
          '04': 'ALTERAÇÃO DE DADOS - NOVA ENTRADA OU ALTERAÇÃO/EXCLUSÃO DE DADOS ACATADA',
          '05': 'ALTERAÇÃO DE DADOS – BAIXA',
          '06': 'LIQUIDAÇÃO NORMAL',
          '07': 'LIQUIDAÇÃO PARCIAL – COBRANÇA INTELIGENTE (B2B)',
          '08': 'LIQUIDAÇÃO EM CARTÓRIO',
          '09': 'BAIXA SIMPLES',
          '10': 'BAIXA POR TER SIDO LIQUIDADO',
          '11': 'EM SER (SÓ NO RETORNO MENSAL)',
          '12': 'ABATIMENTO CONCEDIDO',
          '13': 'ABATIMENTO CANCELADO',
          '14': 'VENCIMENTO ALTERADO',
          '15': 'BAIXAS REJEITADAS',
          '16': 'INSTRUÇÕES REJEITADAS',
          '17': 'ALTERAÇÃO/EXCLUSÃO DE DADOS REJEITADOS',
          '18': 'COBRANÇA CONTRATUAL - INSTRUÇÕES/ALTERAÇÕES REJEITADAS/PENDENTES',
          '19': 'CONFIRMA RECEBIMENTO DE INSTRUÇÃO DE PROTESTO',
          '20': 'CONFIRMA RECEBIMENTO DE INSTRUÇÃO DE SUSTAÇÃO DE PROTESTO /TARIFA',
          '21': 'CONFIRMA RECEBIMENTO DE INSTRUÇÃO DE NÃO PROTESTAR',
          '23': 'TÍTULO ENVIADO A CARTÓRIO/TARIFA',
          '24': 'INSTRUÇÃO DE PROTESTO REJEITADA / SUSTADA / PENDENTE',
          '25': 'ALEGAÇÕES DO SACADO',
          '26': 'TARIFA DE AVISO DE COBRANÇA',
          '27': 'TARIFA DE EXTRATO POSIÇÃO (B40X)',
          '28': 'TARIFA DE RELAÇÃO DAS LIQUIDAÇÕES',
          '29': 'TARIFA DE MANUTENÇÃO DE TÍTULOS VENCIDOS',
          '30': 'DÉBITO MENSAL DE TARIFAS (PARA ENTRADAS E BAIXAS)',
          '32': 'BAIXA POR TER SIDO PROTESTADO',
          '33': 'CUSTAS DE PROTESTO',
          '34': 'CUSTAS DE SUSTAÇÃO',
          '35': 'CUSTAS DE CARTÓRIO DISTRIBUIDOR',
          '36': 'CUSTAS DE EDITAL',
          '37': 'TARIFA DE EMISSÃO DE BOLETO/TARIFA DE ENVIO DE DUPLICATA',
          '38': 'TARIFA DE INSTRUÇÃO',
          '39': 'TARIFA DE OCORRÊNCIAS',
          '40': 'TARIFA MENSAL DE EMISSÃO DE BOLETO/TARIFA MENSAL DE ENVIO DE DUPLICATA',
          '41': 'DÉBITO MENSAL DE TARIFAS – EXTRATO DE POSIÇÃO (B4EP/B4OX)',
          '42': 'DÉBITO MENSAL DE TARIFAS – OUTRAS INSTRUÇÕES',
          '43': 'DÉBITO MENSAL DE TARIFAS – MANUTENÇÃO DE TÍTULOS VENCIDOS',
          '44': 'DÉBITO MENSAL DE TARIFAS – OUTRAS OCORRÊNCIAS',
          '45': 'DÉBITO MENSAL DE TARIFAS – PROTESTO',
          '46': 'DÉBITO MENSAL DE TARIFAS – SUSTAÇÃO DE PROTESTO',
          '47': 'BAIXA COM TRANSFERÊNCIA PARA DESCONTO',
          '48': 'CUSTAS DE SUSTAÇÃO JUDICIAL',
          '51': 'TARIFA MENSAL REF A ENTRADAS BANCOS CORRESPONDENTES NA CARTEIRA',
          '52': 'TARIFA MENSAL BAIXAS NA CARTEIRA',
          '53': 'TARIFA MENSAL BAIXAS EM BANCOS CORRESPONDENTES NA CARTEIRA',
          '54': 'TARIFA MENSAL DE LIQUIDAÇÕES NA CARTEIRA',
          '55': 'TARIFA MENSAL DE LIQUIDAÇÕES EM BANCOS CORRESPONDENTES NA CARTEIRA',
          '56': 'CUSTAS DE IRREGULARIDADE',
          '57': 'INSTRUÇÃO CANCELADA',
          '59': 'BAIXA POR CRÉDITO EM C/C ATRAVÉS DO SISPAG',
          '60': 'ENTRADA REJEITADA CARNÊ',
          '61': 'TARIFA EMISSÃO AVISO DE MOVIMENTAÇÃO DE TÍTULOS (2154)',
          '62': 'DÉBITO MENSAL DE TARIFA - AVISO DE MOVIMENTAÇÃO DE TÍTULOS (2154)',
          '63': 'TÍTULO SUSTADO JUDICIALMENTE',
          '64': 'ENTRADA CONFIRMADA COM RATEIO DE CRÉDITO',
          '69': 'CHEQUE DEVOLVIDO',
          '71': 'ENTRADA REGISTRADA, AGUARDANDO AVALIAÇÃO',
          '72': 'BAIXA POR CRÉDITO EM C/C ATRAVÉS DO SISPAG SEM TÍTULO CORRESPONDENTE',
          '73': 'CONFIRMAÇÃO DE ENTRADA NA COBRANÇA SIMPLES – ENTRADA NÃO ACEITA NA COBRANÇA CONTRATUAL',
          '76': 'CHEQUE COMPENSADO'
        }),
        data: data(111, 6),
        vencimento: data(147, 6),
        valor: numero(153, 13, 2),
        banco: opcao(166, 3, bancos),
        cobradora: texto(169, 4)+'-'+texto(173, 1),
        especie: opcao(174, 2, {
          '01': 'DUPLICATA MERCANTIL',
          '02': 'NOTA PROMISSÓRIA',
          '03': 'NOTA DE SEGURO',
          '04': 'MENSALIDADE ESCOLAR',
          '05': 'RECIBO',
          '06': 'CONTRATO',
          '07': 'COSSEGUROS',
          '08': 'DUPLICATA DE SERVIÇO',
          '09': 'LETRA DE CÂMBIO',
          '13': 'NOTA DE DÉBITOS',
          '15': 'DOCUMENTO DE DÍVIDA',
          '16': 'ENCARGOS CONDOMINIAIS',
          '17': 'CONTA DE PRESTAÇÃO DE SERVIÇOS',
          '99': 'DIVERSOS'
        }),
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
        liquidacao: opcao(393, 2, {
          'AA': 'CAIXA ELETRÔNICO BANCO ITAÚ DISPONÍVEL', 
          'AC': 'PAGAMENTO EM CARTÓRIO AUTOMATIZADO A COMPENSAR', 
          'AO': 'ACERTO ONLINE DISPONÍVEL', 
          'BC': 'BANCOS CORRESPONDENTES DISPONÍVEL', 
          'BF': 'ITAÚ BANKFONE DISPONÍVEL', 
          'BL': 'ITAÚ BANKLINE DISPONÍVEL',
          'B0': 'OUTROS BANCOS – RECEBIMENTO OFF-LINE A COMPENSAR',
          'B1': 'OUTROS BANCOS – PELO CÓDIGO DE BARRAS A COMPENSAR',
          'B2': 'OUTROS BANCOS – PELA LINHA DIGITÁVEL A COMPENSAR',
          'B3': 'OUTROS BANCOS – PELO AUTO ATENDIMENTO A COMPENSAR',
          'B4': 'OUTROS BANCOS – RECEBIMENTO EM CASA LOTÉRICA A COMPENSAR',
          'B5': 'OUTROS BANCOS – CORRESPONDENTE A COMPENSAR',
          'B6': 'OUTROS BANCOS – TELEFONE A COMPENSAR',
          'B7': 'OUTROS BANCOS – ARQUIVO ELETRÔNICO (Pagamento Efetuado por meio de troca de arquivos) A COMPENSAR',
          'CC': 'AGÊNCIA ITAÚ – COM CHEQUE DE OUTRO BANCO ou (CHEQUE ITAÚ) A COMPENSAR',
          'CI': 'CORRESPONDENTE ITAÚ DISPONÍVEL',
          'CK': 'SISPAG – SISTEMA DE CONTAS A PAGAR ITAÚ DISPONÍVEL',
          'CP': 'AGÊNCIA ITAÚ – POR DÉBITO EM CONTA CORRENTE, CHEQUE ITAÚ OU DINHEIRO DISPONÍVEL',
          'DG': 'AGÊNCIA ITAÚ – CAPTURADO EM OFF-LINE DISPONÍVEL',
          'LC': 'PAGAMENTO EM CARTÓRIO DE PROTESTO COM CHEQUE A COMPENSAR',
          'EA': 'TERMINAL DE CAIXA DISPONÍVEL',
          'Q0': 'AGENDAMENTO – PAGAMENTO AGENDADO VIA BANKLINE OU OUTRO CANAL ELETRÔNICO E LIQUIDADO NA DATA INDICADA DISPONÍVEL',
          'RA': 'DIGITAÇÃO – REALIMENTAÇÃO AUTOMÁTICA DISPONÍVEL',
          'ST': 'PAGAMENTO VIA SELTEC DISPONÍVEL'
        }),
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
        registros: numero(213, 8),
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
      base.registros.push(dados)
    } else if (tipo == 'trailer') {
      const n = base.registros.length
      if (dados.registros != n) {
        throw `Erro nro registros: [${} | ${}]`
      }
      delete dados.registros
    }
  }
}
