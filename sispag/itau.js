import bancos from '../bancos.js'
import {tipo} from '../lib.js'

export default ({X, fixo, numero, texto, data, mapa}) => {
  fixo('34100000')
  fixo(' ', 6)
  fixo('080')
  fixo(tipo(X, 'cnpjcpf'), 1)
  numero(X, 'cnpjcpf', 14)
  fixo(' ', 20)
  numero(X, 'agencia', 5)
  fixo(' ')
  numero(X, 'conta', 12)
  fixo(' ')
  numero(X, 'dac', 1)
  texto(X, 'nome', 30)
  fixo('BCO ITAU S/A', 30)
  fixo(' ', 10)
  fixo('1')
  data(X, 'geracao', 8)
  texto(X, 'hora', 6)
  fixo('0', 14)
  fixo('SISPAGWITV2018', 69)
  fixo('\r\n')
  fixo('34100011C')
  mapa(X, 'destino', {
    '10': 'DIVIDENDOS',
    '15': 'DEBÊNTURES',
    '20': 'FORNECEDORES',
    '22': 'TRIBUTOS',
    '30': 'SALÁRIOS',
    '40': 'FUNDOS DE INVESTIMENTOS',
    '50': 'SINISTROS DE SEGUROS',
    '60': 'DESPESAS VIAJANTE EM TRÂNSITO',
    '80': 'REPRESENTANTES AUTORIZADOS',
    '90': 'BENEFÍCIOS',
    '98': 'DIVERSOS'
  })
  mapa(X, 'pagamento', {
    '01': 'CRÉDITO EM CONTA CORRENTE NO ITAÚ',
    '02': 'CHEQUE PAGAMENTO/ADMINISTRATIVO',
    '03': 'DOC “C”',
    '05': 'CRÉDITO EM CONTA POUPANÇA NO ITAÚ',
    '06': 'CRÉDITO EM CONTA CORRENTE DE MESMA TITULARIDADE',
    '07': 'DOC “D”',
    '10': 'ORDEM DE PAGAMENTO À DISPOSIÇÃO',
    '13': 'PAGAMENTO DE CONCESSIONÁRIAS',
    '16': 'DARF NORMAL',
    '17': 'GPS - GUIA DA PREVIDÊNCIA SOCIAL',
    '18': 'DARF SIMPLES',
    '19': 'IPTU/ISS/OUTROS TRIBUTOS MUNICIPAIS',
    '22': 'GARE – SP ICMS',
    '25': 'IPVA',
    '27': 'DPVAT',
    '30': 'PAGAMENTO DE TÍTULOS EM COBRANÇA NO ITAÚ',
    '31': 'PAGAMENTO DE TÍTULOS EM COBRANÇA EM OUTROS BANCOS',
    '32': 'NOTA FISCAL – LIQUIDAÇÃO ELETRÔNICA',
    '35': 'FGTS',
    '41': 'TED – OUTRO TITULAR',
    '43': 'TED – MESMO TITULAR',
    '45': 'PIX TRANSFERÊNCIA',
    '47': 'PIX QR-CODE',
    '60': 'CARTÃO SALÁRIO',
    '91': 'GNRE E TRIBUTOS COM CÓDIGO DE BARRAS'
  })
  fixo('040', 4)
  fixo(tipo(X, 'cnpjcpf'), 1)
  fixo(X.cnpjcpf, 14)
  fixo(' ', 20)
  fixo(X.agencia, 5, true)
  fixo(' ')
  fixo(X.conta, 12, true)
  fixo(' ')
  fixo(X.dac, 1, true)
  fixo(X.nome, 30)
  fixo(' ', 40)
  texto(X, 'endereco', 30)
  numero(X, 'numero', 5)
  texto(X, 'complemento', 15)
  texto(X, 'cidade', 20)
  texto(X, 'cep', 8)
  texto(X, 'uf', 2)
  fixo(' ', 18)
  fixo('\r\n')
  X.registros.forEach((R, index) => {
    fixo('34100013')
    fixo(index + 1, 5, true)
    fixo('A000000')
    fixo('341')
    numero(R, 'agencia', 5)
    fixo(' ')
    numero(R, 'conta', 12)
    fixo(' ')
    numero(R, 'dac', 1)
    texto(R, 'nome', 30)
    texto(R, 'documento', 20)
    data(R, 'vencimento', 8)
    fixo(['009', 'REA'], 3)
    fixo('0', 15)
    numero(R, 'valor', 15, 2)
    fixo(' ', 20)
    fixo('0', 23)
    fixo(' ', 20)
    fixo('0', 6)
    texto(R, 'cnpjcpf', 14)
    fixo(' ', 12)
    fixo('0')
    fixo(' ', 10)
    fixo('\r\n')
  })
  fixo('34100015')
  fixo(' ', 9)
  fixo(X.registros.length + 2, 6, true)
  fixo(Math.round(100 * X.registros.reduce(
    (total, {valor}) => total + valor
  , 0)), 18, true)
  fixo('0', 18)
  fixo(' ', 181)
  fixo('\r\n')
  fixo('34199999')
  fixo(' ', 9)
  fixo('000001')
  fixo(X.registros.length + 4, 6, true)
  fixo(' ', 211)
  fixo('\r\n')
}
