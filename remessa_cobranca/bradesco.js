export default ({
  X,
  numero,
  texto,
  data,
  mapa,
  fixo
}) => {
  fixo('01REMESSA01COBRANCA       ')
  texto(X, 'id_empresa', 20)
  texto(X, 'empresa', 30)
  fixo('237BRADESCO       ')
  data(X, 'criacao', 6)
  fixo(' ', 8)
  fixo('MX')
  numero(X, 'sequencia', 6)
  fixo(' ', 277)
  fixo('000001')
  fixo('\n')
  X.registros.forEach((R, index) => {
    fixo('1')
    fixo('0', 5)
    fixo(' ')
    fixo('0', 12)
    fixo(' ')
    texto(X, 'id_empresa', 17)
    fixo(' ', 25)
    fixo('0', 3)
    fixo(() => R.multa > 0 ? 2 : 0)
    numero(R, 'multa', 4, 2)
    fixo(' ', 12)
    numero(R, 'desconto', 10, 2)
    fixo('1N')
    fixo(' ', 14)
    mapa(R, 'operacao', {
      '01': 'Entrada',
      '02': 'Baixa',
      '04': 'Abatimento',
      '06': 'Prorrogação',
      '09': 'Protestar',
      '19': 'Não Protestar',
      '00': '*'
    })
    texto(R, 'duplicata', 10)
    data(R, 'vencimento', 6)
    numero(R, 'valor', 13, 2)
    fixo('0000000001N')
    data(R, 'emissao', 6)
    fixo('0', 4)
    numero(R, 'atraso', 13, 2)
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
    fixo(' ', 12)
    texto(R, 'cep', 8)
    fixo(' ', 60)
    fixo(index + 2, 6, true)
    fixo('\n')
  })
  fixo('9')
  fixo(' ', 393)
  fixo(X.registros.length + 2, 6, true)
  fixo('\n')
}
