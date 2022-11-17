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
  texto(X, 'id', 20)
  texto(X, 'nome', 30)
  fixo('237BRADESCO       ')
  data(X, 'criacao', 6)
  fixo(' ', 8)
  fixo('MX')
  numero(X, 'sequencia', 7)
  fixo(' ', 277)
  fixo('000001')
  fixo('\r\n')
  X.registros.forEach((R, index) => {
    fixo('1')
    fixo('0', 5)
    fixo(' ')
    fixo('0', 12)
    fixo(' ')
    texto(X, 'carteira', 4)
    texto(X, 'agencia', 5)
    texto(X, 'conta', 8)
    texto(R, 'duplicata', 25)
    fixo('0', 30)
    fixo('1')
    fixo(' ', 15)
    mapa(R, 'operacao', {
      '01': 'Entrada',
      '02': 'Baixa',
      '04': 'Abatimento',
      '06': 'Prorrogação',
      '00': '*'
    })
    texto(R, 'duplicata', 10)
    data(R, 'vencimento', 6)
    numero(R, 'valor', 13, 2)
    fixo('0000000001N')
    data(R, 'emissao', 6)
    fixo('0', 4)
    numero(R, 'juros', 13, 2)
    fixo('0', 32)
    numero(R, 'abatimento', 13, 2)
    fixo('0')
    fixo(tipo(R, 'cnpjcpf'), 1)
    numero(R, 'cnpjcpf', 14)
    texto(R, 'nome', 40)
    texto(R, 'endereco', 40)
    fixo(' ', 12)
    texto(R, 'cep', 8)
    fixo(' ', 60)
    fixo(index + 2, 6, true)
    fixo('\r\n')
  })
  fixo('9')
  fixo(' ', 393)
  fixo(X.registros.length + 2, 6, true)
  fixo('\r\n')
}
