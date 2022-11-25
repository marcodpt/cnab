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
  fixo('707BANCO DAYCOVAL ')
  data(X, 'geracao', 6)
  fixo(' ', 294)
  fixo('000001')
  fixo('\n')
  X.registros.forEach((R, index) => {
    fixo('10')
    fixo(tipo(X, 'cnpjcpf'), 1)
    texto(X, 'cnpjcpf', 14)
    fixo(X.codigo, 20)
    fixo(' ', 25)
    fixo('0', 8)
    fixo(' ', 37)
    mapa(X, 'carteira', {
      '1': 'Simples',
      '2': 'Vinculada',
      '3': 'Descontada'
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
    fixo('707')
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
    texto(R, 'nome', 30)
    fixo(' ', 10)
    texto(R, 'endereco', 40)
    texto(R, 'bairro', 12)
    texto(R, 'cep', 8)
    texto(R, 'cidade', 15)
    texto(R, 'uf', 2)
    texto(X, 'nome', 40)
    numero(R, 'protestar', 2)
    fixo('0')
    fixo(index * 2 + 2, 6, true)
    fixo('\n')
    fixo('4')
    fixo(() => R.chave.substr(29, 5), 15)
    numero(R, 'total', 13, 2)
    data(R, 'emissao', 8)
    texto(R, 'chave', 44)
    fixo(' ', 313)
    fixo(index * 2 + 3, 6, true)
    fixo('\n')
  })
  fixo('9')
  fixo(' ', 393)
  fixo(X.registros.length * 2 + 2, 6, true)
  fixo('\n')
}
