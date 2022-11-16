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
  fixo('033SANTANDER      ')
  data(X, 'criacao', 6)
  fixo('0', 16)
  fixo(' ', 275)
  fixo('0', 3)
  numero(X, 'sequencia', 6)
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
    fixo('0', 14)
    fixo(' ')
    fixo('0', 20)
    fixo(' ', 4)
    fixo('0', 6)
    fixo('1')
    mapa(R, 'operacao', {
      '01': 'Entrada',
      '02': 'Baixa',
      '04': 'Abatimento',
      '06': 'Prorrogação',
      '09': 'Protestar',
      '18': 'Não Protestar',
      '00': '*'
    })
    texto(R, 'duplicata', 10)
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
    fixo(' ', 31)
    fixo('I')
    numero(X, 'carteira', 2)
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
