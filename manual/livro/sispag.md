# Sispag

Objeto JSON para envio de arquivo CNAB de Pagamentos

## Propriedades

### tipo: `string`

#### Tipo

 - Fixo: `sispag`

### nome: `string`

#### Nome da Empresa

 - Comprimento máximo: `30`
 - Valor padrão: `""`

### cnpjcpf: `string`

#### CNPJ/CPF da Empresa

 - Comprimento máximo: `14`
 - Expressão Regular: `^(|d{11}|d{14})$`
 - Valor padrão: `""`

### id: `string`

#### Identificador da Empresa

 - Comprimento máximo: `20`
 - Valor padrão: `""`

### sequencia: `integer`

#### Numero Sequencial

 - Valor mínimo: `1`
 - Valor máximo: `999999`
 - Valor padrão: `1`

### banco: `string`

#### Banco

 - Valor padrão: `""`
 - Opções: 
   - `"itau"`
   - `"bradesco"`
   - `"santader"`
   - `"caixa"`
   - `"bb"`
   - `"daycoval"`

### agencia: `integer`

#### Agência

 - Valor mínimo: `0`
 - Valor máximo: `999999`
 - Valor padrão: `0`

### conta: `integer`

#### Conta

 - Valor mínimo: `0`
 - Valor máximo: `9999999999999`
 - Valor padrão: `0`

### dac: `integer`

#### Digito Verificador

 - Valor mínimo: `0`
 - Valor máximo: `9`
 - Valor padrão: `0`

### geracao: `string`

#### Data de geração

 - Valor padrão: `Dia atual`

### hora: `string`

#### Hora de geração

 - Comprimento máximo: `6`
 - Valor padrão: `"000000"`

### servico: `string`

#### Serviço

 - Valor padrão: `""`

### pagamento: `string`

#### Forma de Pagamento

 - Valor padrão: `""`

### endereco: `string`

#### Endereço

 - Comprimento máximo: `30`
 - Valor padrão: `""`

### numero: `integer`

#### Número

 - Valor mínimo: `0`
 - Valor máximo: `99999`
 - Valor padrão: `0`

### complemento: `string`

#### Complemento

 - Comprimento máximo: `15`
 - Valor padrão: `""`

### cidade: `string`

#### Cidade

 - Comprimento máximo: `20`
 - Valor padrão: `""`

### cep: `string`

#### Endereço

 - Comprimento máximo: `8`
 - Expressão Regular: `^(|d{8})$`
 - Valor padrão: `""`

### uf: `string`

#### Estado

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

## Registros

### nome: `string`

#### Nome do Recebedor

 - Comprimento máximo: `40`
 - Valor padrão: `""`

### cnpjcpf: `string`

#### CNPJ/CPF do Recebedor

 - Comprimento máximo: `14`
 - Expressão Regular: `^(|d{11}|d{14})$`
 - Valor padrão: `""`

### agencia: `integer`

#### Agência

 - Valor mínimo: `0`
 - Valor máximo: `999999`
 - Valor padrão: `0`

### conta: `integer`

#### Conta

 - Valor mínimo: `0`
 - Valor máximo: `9999999999999`
 - Valor padrão: `0`

### dac: `integer`

#### Digito Verificador

 - Valor mínimo: `0`
 - Valor máximo: `9`
 - Valor padrão: `0`

### documento: `string`

#### Numero do documento

 - Comprimento máximo: `10`
 - Valor padrão: `""`

### vencimento: `string`

#### Data de Vencimento

 - Valor padrão: `Dia atual`

### valor: `number`

#### Valor (R$)

 - Precisão: `0.01`
 - Valor mínimo: `0`
 - Valor máximo: `99999999999.99`
 - Valor padrão: `0`