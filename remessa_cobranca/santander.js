import {tipo} from '../lib.js'

export default ({
  X,
  numero,
  texto,
  data,
  mapa,
  fixo
}) => {
  fixo('01REMESSA01COBRANCA       ')
  texto(X, 'codigo', 20)
  texto(X, 'nome', 30)
  fixo('033SANTANDER      ')
  data(X, 'geracao', 6)
  fixo('0', 16)
  fixo(' ', 275)
  fixo('0', 3)
  numero(X, 'sequencia', 6)
  fixo('\n')
  X.registros.forEach((R, index) => {
    fixo('10')
    fixo(tipo(X, 'cnpjcpf'), 1)
    texto(X, 'cnpjcpf', 14)
    fixo(X.codigo, 20)
    fixo(' ', 25)
    fixo('0', 14)
    fixo(' ')
    fixo('0', 20)
    fixo(' ', 4)
    fixo('0', 6)
    mapa(X, 'carteira', {
      '1': 'Simples',
      '3': 'Vinculada',
      '7': 'Descontada'
    })
    mapa(R, 'operacao', {
      '01': 'Entrada',
      '02': 'Baixa',
      '04': 'Abatimento',
      '06': 'Prorrogação',
      '00': '*'
    })
    texto(R, 'documento', 10)
    data(R, 'vencimento', 6)
    numero(R, 'valor', 13, 2)
    fixo('033')
    numero(X, 'agencia', 5)
    fixo('01N')
    data(R, 'emissao', 6)
    fixo('0', 4)
    numero(R, 'juros', 13, 2)
    fixo('0', 32)
    numero(R, 'abatimento', 13, 2)
    fixo('0')
    fixo(tipo(R, 'cnpjcpf'), 1)
    texto(R, 'cnpjcpf', 14)
    texto(R, 'nome', 40)
    texto(R, 'endereco', 40)
    texto(R, 'bairro', 12)
    texto(R, 'cep', 8)
    texto(R, 'cidade', 15)
    texto(R, 'uf', 2)
    fixo(' ', 31)
    texto(X, 'info', 3)
    fixo('      00 000000')
    fixo('\n')
  })
  fixo('9')
  fixo(X.registros.length + 2, 6, true)
  fixo(Math.round(X.registros.reduce(
    (total, item) => total + item.valor * 100
  , 0)), 13, 2)
  fixo('0', 374)
  fixo(X.registros.length + 2, 6, true)
  fixo('\n')
}
