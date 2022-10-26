const remessa = {
  '01': 'ENTRADA DE TÍTULO',
  '02': 'BAIXA DE TÍTULO',
  '04': 'CONCESSÃO DE ABATIMENTO',
  '05': 'CANCELAMENTO ABATIMENTO',
  '06': 'PRORROGAÇÃO DE VENCIMENTO',
  '07': 'ALT. NÚMERO CONT.CEDENTE',
  '08': 'ALTERAÇÃO DO SEU NÚMERO',
  '09': 'PROTESTAR',
  '18': 'SUSTAR PROTESTO'
}

const retorno = {
  '01': 'título não existe',
  '02': 'entrada tít. confirmada',
  '03': 'entrada tít. rejeitada',
  '06': 'liquidação',
  '07': 'liquidação por conta',
  '08': 'liquidação por saldo',
  '09': 'baixa automática',
  '10': 'tít. baix. conf. instrução ou por título protestado',
  '11': 'em ser',
  '12': 'abatimento concedido',
  '13': 'abatimento cancelado',
  '14': 'prorrogação de vencimento',
  '15': 'Enviado para Cartório',
  '16': 'tít. já baixado/liquidado',
  '17': 'liquidado em cartório',
  '21': 'Entrada em Cartório',
  '22': 'Retirado de cartório',
  '24': 'Custas de Cartório',
  '25': 'Protestar Título',
  '26': 'Sustar Protesto'
}

export {remessa, retorno}
