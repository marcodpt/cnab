export default ({
  agencia,
  conta,
  empresa,
  cod_empresa,
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
  '\n'+
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
    cod_cliente,
    cliente,
    endereco,
    bairro,
    cep,
    cidade
  }, index) => 
    fixo('10')+
    (cod_empresa.length > 11 ? '2' : '1')+ 
    numero(cod_empresa, 14)+
    numero(agencia, 4)+
    fixo('0', 2)+
    numero(conta, 6)+
    fixo(' ', 33)+
    fixo('0', 21)+
    fixo('112')+
    fixo(' ', 21)+
    'I'+mapa(operacao, {
      '01': 'Entrada',
      '02': 'Baixa',
      '04': 'Abatimento',
      '06': 'Prorrogação',
      '09': 'Protestar',
      '10': 'Não Protestar',
      '00': '*'
    })+texto(duplicata, 10)+
    data(vencimento, 6)+
    numero(valor, 13, 2)+
    '3410000001N'+
    data(emissao, 6)+
    '0'.repeat(4)+
    numero(juros, 13, 2)+
    data(limite, 6)+
    numero(desconto, 13, 2)+
    numero(iof, 13, 2)+
    numero(abatimento, 13, 2)+
    (cod_cliente.length > 11 ? '2' : '1')+ 
    numero(cod_cliente, 14)+
    texto(cliente, 40)+
    texto(endereco, 40)+
    texto(bairro, 12)+
    numero(cep, 8)+
    texto(cidade, 15)+
    texto(uf, 2)+
    texto(empresa, 30)+
    ' '.repeat(4)+
    data(vencimento, 6)+
    '00 '+
    numero(index + 2, 6)
  ).join('\n')+(registros.length ? '\n' : '')+
  fixo('9')+fixo(' ', 393)+numero(registros.length + 2, 6)+'\n'
