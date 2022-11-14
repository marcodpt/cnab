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
  fixo('0', 2)
  numero(X, 'conta', 6)
  fixo(' ', 8)
  texto(X, 'empresa', 30)
  fixo('341BANCO ITAU SA  ')
  data(X, 'criacao', 6)
  fixo(' ', 294)
  fixo('000001')
  fixo('\r\n')
  X.registros.forEach((R, index) => {
    fixo('10')
    mapa(X, 'tipo_empresa', {
      '1': 'Física',
      '2': 'Jurídica'
    })
    numero(X, 'cod_empresa', 14)
    numero(X, 'agencia', 4)
    fixo('0', 2)
    numero(X, 'conta', 6)
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
      '09': 'Protestar',
      '10': 'Não Protestar',
      '00': '*'
    })
    texto(R, 'duplicata', 10)
    data(R, 'vencimento', 6)
    numero(R, 'valor', 13, 2)
    fixo('3410000001N')
    data(R, 'emissao', 6)
    fixo('0', 4)
    numero(R, 'juros', 13, 2)
    data(R, 'limite', 6)
    numero(R, 'desconto', 13, 2)
    numero(R, 'iof', 13, 2)
    numero(R, 'abatimento', 13, 2)
    mapa(R, 'tipo_cliente', {
      '01': 'Física',
      '02': 'Jurídica'
    })
    numero(R, 'cod_cliente', 14)
    texto(R, 'cliente', 40)
    texto(R, 'endereco', 40)
    texto(R, 'bairro', 12)
    texto(R, 'cep', 8)
    texto(R, 'cidade', 15)
    texto(R, 'uf', 2)
    texto(X, 'empresa', 30)
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
