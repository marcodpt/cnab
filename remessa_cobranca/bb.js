import {tipo} from '../lib.js'

export default ({
  X,
  numero,
  texto,
  data,
  mapa,
  fixo
}) => {
  fixo('00100000')
  fixo(' ', 9)
  fixo(tipo(X, 'cnpjcpf'), 1)
  texto(X, 'cnpjcpf', 14)
  texto(X, 'info', 9)
  fixo('0014')
  mapa(X, 'carteira', {
    '11': 'Simples',
    '31': 'Vinculada',
    '51': 'Descontada'
  })
  fixo('019', 5)
  numero(X, 'agencia', 6)
  numero(X, 'conta', 13)
  fixo(' ')
  texto(X, 'nome', 30)
  fixo('BANCO DO BRASIL S.A.', 30)
  fixo(' ', 10)
  fixo('1')
  data(X, 'geracao', 8)
  fixo('0', 6)
  numero(X, 'sequencia', 6)
  fixo('03000000')
  fixo(' ', 54)
  fixo('0', 3)
  fixo(' ', 12)
  fixo('\n')
  fixo('00100011R0100020 ')
  fixo(tipo(X, 'cnpjcpf'), 1)
  fixo(X.cnpjcpf, 15, true)
  fixo(X.info, 9)
  fixo('0014')
  mapa(X, 'carteira', {
    '11': 'Simples',
    '31': 'Vinculada',
    '51': 'Descontada'
  })
  fixo('019', 5)
  fixo(X.agencia, 6, true)
  fixo(X.conta, 13, true)
  fixo(' ')
  texto(X, 'nome', 31)
  fixo(' ', 39)
  fixo(' ', 40)
  numero(X, 'sequencia', 8)
  data(X, 'geracao', 8)
  fixo('0', 8)
  fixo(' ', 33)
  fixo('\n')
  X.registros.forEach((R, index) => {
    fixo('00100013')
    fixo(index * 2 + 1, 5, true)
    fixo('P ')
    mapa(R, 'operacao', {
      '01': 'Entrada',
      '02': 'Baixa',
      '04': 'Abatimento',
      '06': 'Prorrogação',
      '00': '*'
    })
    fixo(X.agencia, 6, true)
    fixo(X.conta, 13, true)
    fixo(' ')
    fixo('0', 20)
    fixo('11211')
    texto(R, 'documento', 15)
    data(R, 'vencimento', 8)
    numero(R, 'valor', 15, 2)
    fixo('00000002N')
    data(R, 'emissao', 8)
    fixo(() => R.juros > 0 ? 0 : 3, 1)
    fixo('0', 6)
    numero(R, 'juros', 13, 2)
    fixo('0', 35)
    numero(R, 'abatimento', 13, 2)
    fixo('0', 10)
    fixo(() => R.documento, 25)
    fixo(() => R.protestar > 0 ? 2 : 0, 1)
    numero(R, 'protestar', 2)
    fixo('200009')
    texto(X, 'contrato', 10)
    fixo(' ')
    fixo('\n')
    fixo('00100013')
    fixo(index * 2 + 2, 5, true)
    fixo('Q ')
    mapa(R, 'operacao', {
      '01': 'Entrada',
      '02': 'Baixa',
      '04': 'Abatimento',
      '06': 'Prorrogação',
      '09': 'Protestar',
      '10': 'Não Protestar',
      '00': '*'
    })
    fixo(tipo(R, 'cnpjcpf'), 1)
    fixo('0')
    texto(R, 'cnpjcpf', 14)
    texto(R, 'nome', 40)
    texto(R, 'endereco', 40)
    texto(R, 'bairro', 15)
    texto(R, 'cep', 8)
    texto(R, 'cidade', 15)
    texto(R, 'uf', 2)
    fixo('0', 16)
    fixo(' ', 40)
    fixo('0', 23)
    fixo(' ', 8)
    fixo('\n')
  })
  fixo('00100015')
  fixo(' ', 9)
  fixo(X.registros.length * 2 + 2, 6, true)
  fixo('0', 92)
  fixo(' ', 125)
  fixo('\n')
  fixo('00199999')
  fixo(' ', 9)
  fixo(1, 6, true)
  fixo('0', 6)
  fixo(' ', 211)
  fixo('\n')
}
