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
  mapa(X, 'tipo_empresa', {
    '1': 'Física',
    '2': 'Jurídica'
  })
  numero(X, 'cod_empresa', 14)
  numero(X, 'id_empresa', 9)
  fixo('001411019')
  fixo(' ', 2)
  numero(X, 'agencia', 6)
  numero(X, 'conta', 13)
  fixo(' ')
  texto(X, 'empresa', 30)
  fixo('BANCO DO BRASIL S.A.', 30)
  fixo(' ', 10)
  fixo('1')
  data(X, 'criacao', 8)
  texto(X, 'hora', 6)
  numero(X, 'sequencia', 6)
  fixo('03000000')
  fixo(' ', 54)
  fixo('0', 3)
  fixo(' ', 12)
  fixo('\n')
  fixo('00100011R01000200')
  mapa(X, 'tipo_empresa', {
    '1': 'Física',
    '2': 'Jurídica'
  })
  numero(X, 'cod_empresa', 15)
  fixo(' ', 20)
  numero(X, 'id_empresa', 9)
  fixo('00141019')
  fixo(' ', 2)
  numero(X, 'agencia', 6)
  numero(X, 'conta', 13)
  texto(X, 'empresa', 30)
  fixo(' ', 40)
  fixo(' ', 40)
  numero(X, 'sequencia', 8)
  data(X, 'criacao', 8)
  fixo('0', 8)
  fixo(' ', 33)
  fixo('\n')
  X.registros.forEach((R, index) => {
    fixo('00100013')
    fixo(index, 5, true)
    fixo('P ')
    mapa(R, 'operacao', {
      '01': 'Entrada',
      '02': 'Baixa',
      '04': 'Abatimento',
      '06': 'Prorrogação',
      '09': 'Protestar',
      '10': 'Não Protestar',
      '00': '*'
    })
    numero(X, 'agencia', 6)
    numero(X, 'conta', 13)
    fixo('0', 20)
    fixo('11211')
    texto(R, 'duplicata', 15)
    data(R, 'vencimento', 8)
    numero(R, 'valor', 15, 2)
    fixo('00000002N')
    data(R, 'emissao', 8)
    fixo(() => R.juros > 0 ? 3 : 0)
    data(R, 'limite', 6)
    numero(R, 'juros', 13, 2)
    fixo('0', 22)
    numero(R, 'iof', 13, 2)
    numero(R, 'abatimento', 13, 2)
    texto(R, 'duplicata', 25)
    fixo(() => R.protestar > 0 ? 2 : 0)
    numero(R, 'protestar', 2)
    fixo(() => R.baixa > 0 ? 2 : 0)
    numero(R, 'baixa', 3)
    numero(X, 'contrato', 10)
    fixo(' ')
    fixo('\n')
    fixo('00100013')
    fixo(index, 5, true)
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
    mapa(R, 'tipo_cliente', {
      '1': 'Física',
      '2': 'Jurídica'
    })
    numero(R, 'cod_cliente', 15)
    texto(R, 'cliente', 40)
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
  fixo('1')
  fixo('0', 6)
  fixo(' ', 211)
  fixo('\n')
}
