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
  fixo('707BANCO DAYCOVAL ')
  data(X, 'criacao', 6)
  fixo(' ', 294)
  fixo('000001')
  fixo('\n')
  X.registros.forEach((R, index) => {
    fixo('10')
    mapa(X, 'tipo_empresa', {
      '1': 'Física',
      '2': 'Jurídica'
    })
    numero(X, 'cod_empresa', 14)
    texto(X, 'id_empresa', 20)
    fixo(' ', 25)
    fixo('0', 8)
    fixo(' ', 37)
    fixo('3')
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
    fixo('707')
    numero(X, 'agencia', 5)
    fixo('01N')
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
    texto(R, 'cliente', 30)
    fixo(' ', 10)
    texto(R, 'endereco', 40)
    texto(R, 'bairro', 12)
    texto(R, 'cep', 8)
    texto(R, 'cidade', 15)
    texto(R, 'uf', 2)
    texto(X, 'empresa', 40)
    fixo('0', 3)
    fixo(index * 2 + 2, 6, true)
    fixo('\n')
    fixo('4')
    texto(R, 'nota', 15)
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
