export default ({
  agencia,
  conta,
  empresa,
  cod_empresa,
  tipo_empresa,
  criacao,
  registros
}, {
  numero,
  texto,
  data,
  mapa,
  fixo
}) => 
  fixo('01REMESSA01COBRANCA       ')+
  numero(agencia, 4)+
  fixo('0', 2)+
  numero(conta, 6)+
  fixo(' ', 8)+
  texto(empresa, 30)+
  fixo('341BANCO ITAU SA  ')+
  data(criacao, 6)+
  fixo(' ', 294)+
  fixo('000001')+
  fixo('\n')+
  registros.map(({
    operacao,
    duplicata,
    vencimento,
    valor,
    emissao,
    juros,
    limite,
    desconto,
    iof,
    abatimento,
    tipo_cliente,
    cod_cliente,
    cliente,
    endereco,
    bairro,
    cep,
    cidade,
    uf
  }, index) => 
    fixo('10')+
    mapa(tipo_empresa, {
      '1': 'Física',
      '2': 'Jurídica'
    })+
    numero(cod_empresa, 14)+
    numero(agencia, 4)+
    fixo('0', 2)+
    numero(conta, 6)+
    fixo(' ', 33)+
    fixo('0', 21)+
    fixo('112')+
    fixo(' ', 21)+
    fixo('I')+
    mapa(operacao, {
      '01': 'Entrada',
      '02': 'Baixa',
      '04': 'Abatimento',
      '06': 'Prorrogação',
      '09': 'Protestar',
      '10': 'Não Protestar',
      '00': '*'
    })+
    texto(duplicata, 10)+
    data(vencimento, 6)+
    numero(valor, 13, 2)+
    fixo('3410000001N')+
    data(emissao, 6)+
    fixo('0', 4)+
    numero(juros, 13, 2)+
    data(limite, 6)+
    numero(desconto, 13, 2)+
    numero(iof, 13, 2)+
    numero(abatimento, 13, 2)+
    mapa(tipo_cliente, {
      '01': 'Física',
      '02': 'Jurídica'
    })+
    numero(cod_cliente, 14)+
    texto(cliente, 40)+
    texto(endereco, 40)+
    texto(bairro, 12)+
    texto(cep, 8)+
    texto(cidade, 15)+
    texto(uf, 2)+
    texto(empresa, 30)+
    fixo(' ', 4)+
    data(vencimento, 6)+
    fixo('00 ')+
    fixo(index + 2, 6, true)+
    fixo('\n')
  ).join('')+
  fixo('9')+
  fixo(' ', 393)+
  fixo(registros.length + 2, 6, true)+
  fixo('\n')
