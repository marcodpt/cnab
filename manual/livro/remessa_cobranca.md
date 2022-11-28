# Remessa Cobrança

Esquema JSON para geração de arquivo CNAB de Remessa de Cobrança

## Propriedades

### tipo: `string`

#### Tipo

Tipo do objeto.

Necessário preencher para identificar o tipo do layout ao gerar o arquivo.

 - Fixo: `remessa_cobranca`

### nome: `string`

#### Nome da Empresa

Necessário preencher em todos os bancos.

 - Comprimento máximo: `30`
 - Valor padrão: `""`

### cnpjcpf: `string`

#### CNPJ/CPF da Empresa

No Bradesco apenas o código da empresa é necessário e pode deixar em branco.

Nos demais bancos é necessário preencher.

 - Comprimento máximo: `14`
 - Expressão Regular: `^(|\d{11}|\d{14})$`
 - Valor padrão: `""`

### geracao: `string`

#### Data de geração do Arquivo

Necessário preencher em todos os bancos.

 - Valor padrão: `Dia atual`

### banco: `string`

#### Banco

Layout que vai ser gerado o arquivo.

 - Valor padrão: `""`
 - Opções: 
   - `"itau"`
   - `"bradesco"`
   - `"santander"`
   - `"caixa"`
   - `"bb"`
   - `"daycoval"`

### codigo: `string`

#### Código da Empresa

Identificador da empresa fornecido pelo banco.

Necessário para: santander, daycoval e bradesco.

Nos demais casos ignorar e não preencher.

 - Comprimento máximo: `20`
 - Valor padrão: `""`

### agencia: `integer`

#### Agência

É necessário em todos os bancos com exceção da caixa econômica.

 - Valor mínimo: `0`
 - Valor máximo: `9999`
 - Valor padrão: `0`

### conta: `integer`

#### Conta Corrente

Necessário para: bb, itaú e bradesco.

Nos demais casos ignorar e não preencher.

 - Valor mínimo: `0`
 - Valor máximo: `99999999`
 - Valor padrão: `0`

### carteira: `string`

#### Carteira

No BB, santander e daycoval é acatado.

Caixa e Bradesco não possuem essa informação no layout.

No Itaú é utilizado contas diferentes para cada tipo de carteira e esse campo é ignorado.

 - Valor padrão: `"Simples"`
 - Opções: 
   - `"Simples"`
   - `"Vinculada"`
   - `"Descontada"`

### contrato: `string`

#### Número do Contrato

No Banco do Brasil utilizar o número do contrato de cobrança.

Na caixa econômica utilizar o código do beneficiário.

Nos demais casos ignorar e não preencher.

 - Comprimento máximo: `10`
 - Valor padrão: `""`

### info: `string`

#### Informações Complementares

No banco do brasil urtilizar o número do convênio de cobrança.

No santander quando necessário utilizar 'I{DC}' onde {DC} são o último dígito e o complemento da conta cobrança.

Nos demais casos ignorar e não preencher.

 - Comprimento máximo: `9`
 - Valor padrão: `""`

### sequencia: `integer`

#### Número Sequencial

Número sequencial do arquivo começando de 1.

Itaú e Daycoval ignoram esse campo.

Nos demais bancos é necessário preencher corretamente.

 - Valor mínimo: `1`
 - Valor máximo: `999999`
 - Valor padrão: `1`

## Registros

### nome: `string`

#### Nome do Cliente

Necessário preencher em todos os bancos.

 - Comprimento máximo: `40`
 - Valor padrão: `""`

### cnpjcpf: `string`

#### CNPJ/CPF do Cliente

Necessário preencher em todos os bancos.

 - Comprimento máximo: `14`
 - Expressão Regular: `^(|\d{11}|\d{14})$`
 - Valor padrão: `""`

### operacao: `string`

#### Operação

Necessário preencher em todos os bancos.

 - Valor padrão: `"Entrada"`
 - Opções: 
   - `"Entrada"`
   - `"Baixa"`
   - `"Abatimento"`
   - `"Prorrogação"`

### chave: `string`

#### Chave NFe

Apenas Daycoval faz uso da chave da NFe.

Ignorar nos demais bancos.

 - Comprimento máximo: `44`
 - Valor padrão: `""`

### total: `number`

#### Total NFe (R$)

Apenas Daycoval faz uso do total da NFe.

Ignorar nos demais bancos.

 - Precisão: `0.01`
 - Valor mínimo: `0`
 - Valor máximo: `99999999999.99`
 - Valor padrão: `0`

### documento: `string`

#### Id do documento (Duplicata)

Necessário preencher em todos os bancos.

 - Comprimento máximo: `10`
 - Valor padrão: `""`

### emissao: `string`

#### Data de Emissão

Necessário preencher em todos os bancos.

 - Valor padrão: `Dia atual`

### vencimento: `string`

#### Data de Vencimento

Necessário preencher em todos os bancos.

 - Valor padrão: `Dia atual`

### valor: `number`

#### Valor (R$)

Necessário preencher em todos os bancos.

 - Precisão: `0.01`
 - Valor mínimo: `0`
 - Valor máximo: `99999999999.99`
 - Valor padrão: `0`

### juros: `number`

#### Juros/dia (R$)

Valor acrescido ao título por dia de atraso.

Necessário preencher em todos os bancos.

 - Precisão: `0.01`
 - Valor mínimo: `0`
 - Valor máximo: `99999999999.99`
 - Valor padrão: `0`

### abatimento: `number`

#### Abatimento (R$)

Abatimento no valor do título.

Preencher apenas quando a operação for Abatimento, nesse caso deve ser preenchido em todos os bancos.

 - Precisão: `0.01`
 - Valor mínimo: `0`
 - Valor máximo: `99999999999.99`
 - Valor padrão: `0`

### protestar: `integer`

#### Protestar (dias)

Número de dias úteis para protestar o título.

Suportado apenas pelo BB, caixa e Daycoval.

Nos demais bancos não preencher.

 - Valor mínimo: `0`
 - Valor máximo: `99`
 - Valor padrão: `0`

### uf: `string`

#### Estado

UF do cliente.

Bradesco utiliza apenas o CEP e não é necessário preencher.

Deve ser preenchido nos demais bancos.

 - Valor padrão: `"SP"`
 - Opções: 
   - `"AC"`
   - `"AL"`
   - `"AM"`
   - `"AP"`
   - `"BA"`
   - `"CE"`
   - `"DF"`
   - `"ES"`
   - `"GO"`
   - `"MA"`
   - `"MG"`
   - `"MS"`
   - `"MT"`
   - `"PA"`
   - `"PB"`
   - `"PE"`
   - `"PI"`
   - `"PR"`
   - `"RJ"`
   - `"RN"`
   - `"RO"`
   - `"RR"`
   - `"RS"`
   - `"SC"`
   - `"SE"`
   - `"SP"`
   - `"TO"`

### cidade: `string`

#### Cidade

Cidade do cliente.

Bradesco utiliza apenas o CEP e não é necessário preencher.

Deve ser preenchido nos demais bancos.

 - Comprimento máximo: `15`
 - Valor padrão: `""`

### cep: `string`

#### CEP

CEP do cliente.

Deve ser preenchido em todos os bancos.

 - Comprimento máximo: `8`
 - Expressão Regular: `^(|\d{8})$`
 - Valor padrão: `""`

### bairro: `string`

#### Bairro

Bairro do cliente.

Bradesco utiliza apenas o CEP e não é necessário preencher.

Deve ser preenchido nos demais bancos.

 - Comprimento máximo: `12`
 - Valor padrão: `""`

### endereco: `string`

#### Endereço

Endereço do cliente com número e complemento.

Deve ser preenchido em todos os bancos.

 - Comprimento máximo: `40`
 - Valor padrão: `""`