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
  numero(X, 'agencia', 4)
  numero(X, 'conta', 8)
  fixo(' ', 8)
  texto(X, 'nome', 30)
  fixo('341BANCO ITAU SA  ')
  data(X, 'geracao', 6)
  fixo(' ', 294)
  fixo('000001')
  fixo('\r\n')
  X.registros.forEach((R, index) => {
    fixo('10')
    fixo(tipo(X, 'cnpjcpf'), 1)
    numero(X, 'cnpjcpf', 14)
    numero(X, 'agencia', 4)
    numero(X, 'conta', 8)
    fixo(' ', 33)
    fixo('0', 21)
    fixo('112')
    fixo(' ', 21)
    fixo('I')
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
    fixo('3410000001N')
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
    texto(X, 'nome', 30)
    fixo(' ', 4)
    data(R, 'vencimento', 6)
    fixo('00 ')
    fixo(index + 2, 6, true)
    fixo('\r\n')
  })
  fixo('9')
  fixo(' ', 393)
  fixo(X.registros.length + 2, 6, true)
  fixo('\r\n')
}
