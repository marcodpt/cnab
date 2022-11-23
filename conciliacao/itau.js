import bancos from '../bancos.js'
import {tipo} from '../lib.js'

export default ({X, fixo, numero, texto, data, mapa}) => {
  fixo('34100000')
  fixo(' ', 9)
  fixo(tipo(X, 'cnpjcpf'), 1)
  numero(X, 'cnpjcpf', 14)
  fixo(' ', 15)
  numero(X, 'id', 5)
  numero(X, 'agencia', 6)
  numero(X, 'conta', 12)
  fixo(' ')
  numero(X, 'dac', 1)
  texto(X, 'nome', 30)
  fixo('BANCO ITAU S/A', 30)
  fixo(' ', 10)
  fixo('2')
  data(X, 'geracao', 8)
  texto(X, 'hora', 6)
  numero(X, 'sequencia', 6)
  fixo('050')
  fixo('0', 5)
  fixo(' ', 69)
  fixo('\r\n')
  fixo('34100011E0440050 ')
  fixo(tipo(X, 'cnpjcpf'), 1)
  numero(X, 'cnpjcpf', 14)
  fixo(' ', 15)
  fixo(X.id, 5, true)
  fixo(X.agencia, 6, true)
  fixo(X.conta, 12, true)
  fixo(' ')
  fixo(X.dac, 1)
  fixo(X.nome, 30)
  fixo(' ', 40)
  data(X, 'data_inicial', 8)
  numero(X, 'valor_inicial', 18, 2)
  mapa(X, 'situacao_inicial', {
    'D': 'Devedor',
    'C': 'Credor'
  })
  mapa(X, 'status_inicial', {
    'P': 'Parcial',
    'F': 'Final'
  })
  fixo('BRL')
  fixo(X.sequencia, 5, true)
  fixo(' ', 62)
  fixo('\r\n')
  X.registros.forEach((R, index) => {
    fixo('34100013')
    fixo(index + 1, 5, true)
    fixo('E')
    mapa(R, 'lancamento', {
      '1': 'Disponível',
      '2': 'A compensar',
      '5': 'Futuro'
    })
    fixo(' ', 2)
    fixo(tipo(X, 'cnpjcpf'), 1)
    fixo(X.cnpjcpf, 14)
    fixo('0', 6)
    fixo(' ', 9)
    fixo(X.id, 5)
    fixo(X.agencia, 6, true)
    fixo(X.conta, 12, true)
    fixo(' ')
    fixo(X.dac, 1)
    fixo(X.nome, 30)
    fixo(' ', 6)
    mapa(R, 'status', {
      'DPV': 'Disponível',
      'SCR': 'Disponível não liberado',
      'SSR': 'A compensar'
    })
    texto(R, 'indicador', 2)
    mapa(R, 'banco', bancos)
    texto(R, 'agencia', 5)
    texto(R, 'conta', 12)
    fixo(['S', 'N', 'B'], 1)
    fixo(' ', 8)
    data(R, 'movimento', 8)
    numero(R, 'valor', 18, 2)
    mapa(R, 'situacao', {
      'D': 'Devedor',
      'C': 'Credor'
    })
    mapa(R, 'categoria', {
      '101': 'CHEQUES',
      '102': 'ENCARGOS',
      '103': 'ESTORNOS DÉBITO',
      '104': 'LANÇAMENTOS AVISADOS DÉBITO',
      '105': 'TARIFAS',
      '106': 'APLICAÇÃO',
      '107': 'EMPRESTIMO / FINANCIAMENTO',
      '108': 'CAMBIO DÉBITO',
      '109': 'CPMF',
      '110': 'IOF',
      '111': 'IMPOSTO DE RENDA',
      '112': 'PAGAMENTO FORNECEDORES',
      '113': 'PAGAMENTO FUNCIONÁRIOS',
      '114': 'SAQUE ELETRÔNICO',
      '115': 'AÇÕES DÉBITO',
      '116': 'SEGURO DÉBITO',
      '117': 'TRANSFERÊNCIA ENTRE CONTAS DÉBITO',
      '118': 'DEVOLUÇÃO DA COMPENSAÇÃO DÉBITO',
      '119': 'DEVOLUÇÃO DE CHEQUES DÉBITO',
      '120': 'TRANSF. INTERBANCÁRIAS (DOC/TED) DÉBITO',
      '121': 'DESCONTO DE DUPLICATAS',
      '201': 'DEPÓSITOS',
      '202': 'COBRANÇA',
      '203': 'DEVOLUÇÃO DE CHEQUES CRÉDITO',
      '204': 'ESTORNOS CRÉDITO',
      '205': 'LANÇAMENTOS AVISADOS CRÉDITO',
      '206': 'RESGATE DE APLICAÇÕES',
      '207': 'EMPRÉSTIMO / FINANCIAMENTO',
      '208': 'CAMBIO CRÉDITO',
      '209': 'TRANSF. INTERBANCÁRIAS (DOC/TED) CRÉDITO',
      '210': 'AÇÕES CRÉDITO',
      '211': 'DIVIDENDOS',
      '212': 'SEGURO CRÉDITO',
      '213': 'TRANSFERÊNCIA ENTRE CONTAS CRÉDITO',
      '214': 'DEPÓSITOS ESPECIAIS',
      '215': 'DEVOLUÇÃO DE COMPENSAÇÃO CRÉDITO'
    })
    mapa(R, 'tipo', {
      '0000': 'OUTROS LANÇAMENTOS',
      '0001': 'CHEQUE PAGO NO CAIXA',
      '0002': 'RECIBO RET CH AVULSO',
      '0003': 'COMPENSACAO RECEBIDA',
      '0004': 'COMP INTERNA RECEBIDA',
      '0005': 'CHEQUE OP',
      '0006': 'CHEQUE VISADO',
      '0007': 'TEDs RECEBIDAS',
      '0008': 'TEDs ENVIADAS',
      '0011': 'DOCs DEPOSITADOS',
      '0012': 'EMISSAO DE DOCs',
      '0015': 'DEPOSITO DINHEIRO',
      '0016': 'DEP. DINHEIRO C/ CARTAO',
      '0017': 'DEPOSITO EM CHEQUES',
      '0018': 'DEP. CHEQUE-AUTO-ATEND',
      '0019': 'DEP. CHEQUE C/ CARTAO',
      '0025': 'CREI',
      '0026': 'SISREC',
      '0027': 'DEPOSITO IDENTIFICADO',
      '0028': 'COPEI',
      '0029': 'OUTROS DEPOSITOS ESPEC',
      '0032': 'DEVOL CH. - EXPEDIDA',
      '0033': 'DEVOL CH. - RECEBIDA',
      '0034': 'DEVOL DOC - EXPED.',
      '0035': 'DEVOL DOC - RECEB.',
      '0038': 'COBRANCA RECEBIDA',
      '0039': 'COBRANCA EXPEDIDA',
      '0041': 'OPERACAO CRED./FINANC.',
      '0042': 'DESCONTO DUPL./CHEQUE',
      '0045': 'APLICACOES',
      '0046': 'DEVOLUÇÃO TED – RECEBIDA',
      '0047': 'DEVOLUÇÃO TED – EXPEDIDA',
      '0048': 'RESGATE DE APLICACOES',
      '0051': 'CAMBIO',
      '0054': 'ACOES',
      '0057': 'DIVIDENDOS',
      '0060': 'SEGUROS',
      '0063': 'TRANSF. ENTRE CONTAS',
      '0066': 'SAQUES ELETRONICOS',
      '0069': 'PAGTOS FORNECEDOR',
      '0070': 'PAGTOS FUNCIONARIO',
      '0071': 'PAGTOS DIVERSOS',
      '0074': 'TARIFAS',
      '0075': 'TAXAS',
      '0077': 'ENCARGOS',
      '0080': 'CPMF',
      '0081': 'ESTORNO CPMF',
      '0082': 'BONUS CPMF',
      '0083': 'IOF',
      '0084': 'OUTROS CPMF',
      '0086': 'IR',
      '0089': 'ESTORNO',
      '0092': 'CARTÃO PERSONALITÊ',
      '0093': 'CARTÃO DE CRÉDITO',
      '0096': 'RESSARCIMENTO DE VALORES',
      '0098': 'RECEBIMENTO DIVERSOS',
      '0099': 'COLETA DE VALORES'
    })
    texto(R, 'descricao', 25)
    fixo(' ', 33)
    texto(R, 'id', 6)
    fixo('\r\n')
  })
  fixo('34100015')
  fixo(' ', 9)
  fixo(tipo(X, 'cnpjcpf'), 1)
  numero(X, 'cnpjcpf', 14)
  fixo(' ', 15)
  texto(X, 'id', 5)
  fixo(X.agencia, 6, true)
  fixo(X.conta, 12, true)
  fixo(' ')
  fixo(X.dac, 1)
  fixo(' ', 16)
  numero(X, 'bloqueado', 18, 2)
  numero(X, 'limite', 18, 2)
  numero(X, 'pendente', 18, 2)
  data(X, 'data_final', 8)
  numero(X, 'valor_final', 18, 2)
  mapa(X, 'situacao_final', {
    'D': 'Devedor',
    'C': 'Credor'
  })
  mapa(X, 'status_final', {
    'P': 'Parcial',
    'F': 'Final'
  })
  fixo(X.registros.length + 2, 6, true)
  fixo(Math.round(100 * X.registros.reduce(
    (total, {valor, situacao}) => total + (situacao == 'Devedor' ? valor : 0)
  , 0)), 18, true)
  fixo(Math.round(100 * X.registros.reduce(
    (total, {valor, situacao}) => total + (situacao == 'Credor' ? valor : 0)
  , 0)), 18, true)
  fixo(Math.round(100 * X.registros.reduce(
    (total, {valor, lancamento}) => total + (lancamento == 'Futuro' ? valor : 0)
  , 0)), 18, true)
  fixo('0', 10)
  fixo('\r\n')
  fixo('34199999')
  fixo(' ', 9)
  fixo('000001')
  fixo(X.registros.length + 4, 6, true)
  fixo('000001')
  fixo(' ', 205)
  fixo('\r\n')
}
