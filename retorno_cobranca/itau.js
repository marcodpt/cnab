import bancos from '../bancos.js'

export default ({X, fixo, numero, texto, data}) => {
  fixo('02RETORNO01COBRANCA       ')
  numero(X, 'agencia', 4)
  fixo('0', 2)
  numero(X, 'conta', 6)
  fixo(' ', 8)
  texto(X, 'empresa', 30)
  fixo('341BANCO ITAU S.A.')
  data(X, 'criacao', 6)
  fixo('00000BPI')
  numero(X, 'sequencia', 6)
  data(X, 'credito', 6)
  fixo(' ', 275)
  fixo('000001')
  fixo('\r\n')
  X.registros.forEach((R, index) => {
    fixo('10')
    mapa(R, 'tipo_empresa', {
      '1': 'Física',
      '2': 'Jurídica'
    })
    numero(R, 'cod_empresa', 14)
    numero(R, 'agencia', 4)
    fixo('0', 2)
    numero(R, 'conta', 6)
    fixo(' ', 33)
    fixo(() => R.id_banco, 8, true)
    fixo(' ', 12)
    fixo('112')
    numero(R, 'id_banco', 9)
    fixo(' ', 13)
    fixo('I')
    mapa(R, 'operacao', {
      '02': 'Entrada',
      '03': 'Erro',
      '05': 'Baixa',
      '06': 'Pagamento',
      '08': 'Pagamento em Cartório',
      '09': 'Baixa',
      '10': 'Baixa',
      '12': 'Abatimento',
      '14': 'Prorrogação',
      '15': 'Erro',
      '16': 'Erro',
      '17': 'Erro',
      '18': 'Erro',
      '19': 'Protestar',
      '21': 'Não Protestar',
      '00': '*'
    })
    data(R, 'ocorrencia', 6)
    texto(R, 'duplicata', 10)
    numero(() => R.id_banco, 8, true)
    fixo(' ', 12)
    data(R, 'vencimento', 6)
    numero(R, 'valor', 13, 2)
    mapa(R, 'banco', bancos)
    numero(R, 'agencia', 5)
    fixo('01')
    numero(R, 'tarifa', 13, 2)
    fixo('0', 26)
    numero(R, 'iof', 13, 2)
    numero(R, 'abatimento', 13, 2)
    numero(R, 'desconto', 13, 2)
    numero(R, 'saldo', 13, 2)
    numero(R, 'juros', 13, 2)
    numero(R, 'outros', 13, 2)
    fixo(' ', 3)
    data(R, 'credito', 6)
    fixo('0', 23)
    texto(R, 'nome', 30)
    fixo(' ', 40)
    fixo(i + 2, 6, true)
    fixo('\r\n')
  })

  fixo('9201341')
  fixo(' ', 10)
  numero(X, 'simples_qtde', 8)
  numero(X, 'simples_total', 14, 2)
  texto(X, 'simples_aviso', 8)
  fixo(' ', 10)
  numero(X, vinculada_qtde, 8)
  numero(X, vinculada_total, 14, 2)
  texto(X, vinculada_aviso, 8)
  fixo(' ', 50)
  fixo('0', 30)
  fixo(' ', 10)
  numero(X, escritural_qtde, 8)
  numero(X, escritural_total, 14, 2)
  texto(X, escritural_aviso, 8)
  fixo(X.sequencia, 5, true)
  fixo(X.registros.length, 8, true)
  fixo(X.registros.reduce(
    (total, {valor}) => total + valor
  , 0), 8, true)
  fixo(' ', 160)
  fixo(X.registros.length, 8, true)
  fixo('\r\n')
}
