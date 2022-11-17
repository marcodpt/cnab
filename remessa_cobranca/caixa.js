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
  numero(X, 'id', 10)
  fixo(' ', 10)
  texto(X, 'nome', 30)
  fixo('104C ECON FEDERAL ')
  data(X, 'criacao', 6)
  fixo(' ', 289)
  numero(X, 'sequencia', 5)
  fixo('000001')
  fixo('\n')
  X.registros.forEach((R, index) => {
    fixo('10')
    fixo(tipo(X, 'cnpjcpf'), 1)
    numero(X, 'cnpjcpf', 14)
    numero(X, 'id', 10)
    fixo('1100')
    fixo(() => R.duplicata, 25)
    fixo('0', 17)
    fixo(' ', 33)
    fixo('0101')
    texto(R, 'duplicata', 10)
    data(R, 'vencimento', 6)
    numero(R, 'valor', 13, 2)
    fixo('1040000001N')
    data(R, 'emissao', 6)
    mapa(R, 'operacao', {
      '01': 'Entrada',
      '02': 'Baixa',
      '04': 'Abatimento',
      '06': 'Prorrogação',
      '09': 'Protestar',
      '18': 'Não Protestar',
      '00': '*'
    })
    fixo('00')
    numero(R, 'juros', 13, 2)
    fixo('0', 32)
    numero(R, 'abatimento', 13, 2)
    fixo('0')
    fixo(tipo(R, 'cnpjcpf'), 1)
    numero(R, 'cnpjcpf', 14)
    texto(R, 'nome', 40)
    texto(R, 'endereco', 40)
    texto(R, 'bairro', 12)
    texto(R, 'cep', 8)
    texto(R, 'cidade', 15)
    texto(R, 'uf', 2)
    fixo('0', 16)
    fixo(' ', 22)
    fixo('0', 2)
    numero(R, 'protestar', 2)
    fixo('1')
    fixo(index * 2 + 2, 6, true)
    fixo('\n')
    fixo('20')
    fixo(tipo(X, 'cnpjcpf'), 1)
    numero(X, 'cnpjcpf', 14)
    numero(X, 'id', 10)
    fixo(' ', 29)
    fixo('0', 17)
    fixo(' ', 33)
    fixo('0101')
    fixo(' ', 29)
    fixo('104')
    fixo(' ', 252)
    fixo(index * 2 + 3, 6, true)
    fixo('\n')
  })
  fixo('9')
  fixo(' ', 393)
  fixo(X.registros.length * 2 + 2, 6, true)
  fixo('\n')
}
