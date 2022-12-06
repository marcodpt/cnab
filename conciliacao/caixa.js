import bancos from '../bancos.js'
import {tipo} from '../lib.js'

export default ({X, fixo, numero, texto, data, mapa}) => {
  fixo('10400000')
  fixo(' ', 9)
  fixo(tipo(X, 'cnpjcpf'), 1)
  numero(X, 'cnpjcpf', 14)
  numero(X, 'codigo', 20)
  numero(X, 'agencia', 6)
  numero(X, 'conta', 13)
  numero(X, 'dac', 1)
  texto(X, 'nome', 30)
  fixo('CAIXA', 30)
  fixo(' ', 10)
  fixo('2')
  data(X, 'geracao', 14)
  numero(X, 'sequencia', 6)
  fixo('08906250')
  fixo(' ', 69)
  fixo('\r\n')
  fixo('10400011E0440089 ')
  fixo(tipo(X, 'cnpjcpf'), 1)
  numero(X, 'cnpjcpf', 14)
  fixo(X.codigo, 20)
  fixo(X.agencia, 6, true)
  fixo(X.conta, 13, true)
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
    fixo('10400013')
    fixo(index + 1, 5, true)
    fixo('E')
    fixo(' ', 3)
    fixo(tipo(X, 'cnpjcpf'), 1)
    fixo(X.cnpjcpf, 14)
    fixo(X.codigo, 20)
    fixo(X.agencia, 6, true)
    fixo(X.conta, 13, true)
    fixo(X.dac, 1)
    fixo(X.nome, 30)
    fixo(' ', 6)
    mapa(R, 'status', {
      'DPV': 'Disponível',
      'SCR': 'Disponível não liberado',
      'SSR': 'A compensar',
      'CDS': 'Diversos'
    })
    fixo('00')
    fixo(' ', 20)
    fixo(['S', 'N', 'B'], 1)
    fixo(R, 'ocorrencia', 8)
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
    texto(R, 'tipo', 4)
    texto(R, 'descricao', 25)
    texto(R, 'id', 7)
    fixo(' ', 32)
    fixo('\r\n')
  })
  fixo('10400015')
  fixo(' ', 9)
  fixo(tipo(X, 'cnpjcpf'), 1)
  numero(X, 'cnpjcpf', 14)
  texto(X, 'id', 20)
  fixo(X.agencia, 6, true)
  fixo(X.conta, 13, true)
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
  fixo(' ', 28)
  fixo('\r\n')
  fixo('10499999')
  fixo(' ', 9)
  fixo('000001')
  fixo(X.registros.length + 4, 6, true)
  fixo('000001')
  fixo(' ', 205)
  fixo('\r\n')
}
