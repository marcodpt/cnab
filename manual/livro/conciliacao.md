# Conciliação Bancária

Objeto JSON para leitura de arquivo CNAB de Conciliação Bancária

## Propriedades

### tipo: `string`

#### Tipo

 - Fixo: `conciliacao`

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

### data_inicial: `string`

#### Data Inicial

 - Valor padrão: `Dia atual`

### valor_inicial: `number`

#### Valor Inicial (R$)

 - Precisão: `0.01`
 - Valor mínimo: `0`
 - Valor máximo: `10000000000000000`
 - Valor padrão: `0`

### situacao_inicial: `string`

#### Situação Inicial

 - Valor padrão: `""`
 - Opções: 
   - `"Devedor"`
   - `"Credor"`

### status_inicial: `string`

#### Status Inicial

 - Valor padrão: `""`
 - Opções: 
   - `"Parcial"`
   - `"Final"`

### bloqueado: `number`

#### Bloqueado (>24h) (R$)

 - Precisão: `0.01`
 - Valor mínimo: `0`
 - Valor máximo: `10000000000000000`
 - Valor padrão: `0`

### limite: `number`

#### Limite disponível (R$)

 - Precisão: `0.01`
 - Valor mínimo: `0`
 - Valor máximo: `10000000000000000`
 - Valor padrão: `0`

### pendente: `number`

#### Pendente (<24h) (R$)

 - Precisão: `0.01`
 - Valor mínimo: `0`
 - Valor máximo: `10000000000000000`
 - Valor padrão: `0`

### data_final: `string`

#### Data Final

 - Valor padrão: `Dia atual`

### valor_final: `number`

#### Valor Final (R$)

 - Precisão: `0.01`
 - Valor mínimo: `0`
 - Valor máximo: `10000000000000000`
 - Valor padrão: `0`

### situacao_final: `string`

#### Situação Final

 - Valor padrão: `""`
 - Opções: 
   - `"Devedor"`
   - `"Credor"`

### status_final: `string`

#### Status Final

 - Valor padrão: `""`
 - Opções: 
   - `"Parcial"`
   - `"Final"`

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

### indicador: `string`

#### Indicador

 - Valor padrão: `""`

### banco: `string`

#### Banco

 - Valor padrão: `""`
 - Opções: 
   - `"Planner Corretora de Valores S.A."`
   - `"RENASCENCA DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIÁRIOS LTDA"`
   - `"XP INVESTIMENTOS CORRETORA DE CÂMBIO,TÍTULOS E VALORES MOBILIÁRIOS S/A"`
   - `"CAIXA"`
   - `"Lecca Crédito, Financiamento e Investimento S/A"`
   - `"Banco BOCOM BBM S.A"`
   - `"PORTOCRED S.A. – CREDITO, FINANCIAMENTO E INVESTIMENTO"`
   - `"OLIVEIRA TRUST DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIARIOS S.A."`
   - `"Magliano S.A. Corretora de Cambio e Valores Mobiliarios"`
   - `"Central Cooperativa de Crédito no Estado do Espírito Santo – CECOOP"`
   - `"ADVANCED CORRETORA DE CÂMBIO LTDA"`
   - `"Banco Western Union do Brasil S.A"`
   - `"Banco Rodobens S.A"`
   - `"Banco Agibank S.A"`
   - `"Banco Bradesco BERJ S.A."`
   - `"Banco Woori Bank do Brasil S.A"`
   - `"Plural S.A. – Banco Múltipl"`
   - `"BR Partners Banco de Investimento S.A"`
   - `"Codepe Corretora de Valores e Câmbio S.A."`
   - `"MS Bank S.A. Banco de Câmbi"`
   - `"UBS Brasil Banco de Investimento S.A"`
   - `"CARUANA S.A. – SOCIEDADE DE CRÉDITO, FINANCIAMENTO E INVESTIMENTO"`
   - `"TULLETT PREBON BRASIL CORRETORA DE VALORES E CÂMBIO LTDA"`
   - `"ICBC do Brasil Banco Múltiplo S.A"`
   - `"CONFEDERAÇÃO NACIONAL DAS COOPERATIVAS CENTRAIS DE CRÉDITO E ECONOMIA FAMILIAR E"`
   - `"BGC LIQUIDEZ DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIÁRIOS LTDA"`
   - `"CONFEDERAÇÃO NACIONAL DAS COOPERATIVAS CENTRAIS UNICRED LTDA. – UNICRED DO BRASI"`
   - `"Get Money Corretora de Câmbio S.A."`
   - `"Intesa Sanpaolo Brasil S.A. – Banco Múltipl"`
   - `"Easynvest – Título Corretora de Valores SA"`
   - `"Broker Brasil Corretora de Câmbio Ltda."`
   - `"Treviso Corretora de Câmbio S.A."`
   - `"BEXS Banco de Câmbio S.A"`
   - `"LEVYCAM – CORRETORA DE CAMBIO E VALORES LTDA."`
   - `"GUITTA CORRETORA DE CAMBIO LTDA."`
   - `"Facta Financeira S.A. – Crédito Financiamento e Investimento"`
   - `"ICAP do Brasil Corretora de Títulos e Valores Mobiliários Ltda."`
   - `"Casa do Crédito S.A. Sociedade de Crédito ao Microempreendedor"`
   - `"Commerzbank Brasil S.A. – Banco Múltipl"`
   - `"Banco Olé Bonsucesso Consignado S.A"`
   - `"BRL Trust Distribuidora de Títulos e Valores Mobiliários S.A."`
   - `"PERNAMBUCANAS FINANCIADORA S.A. – CRÉDITO, FINANCIAMENTO E INVESTIMENTO"`
   - `"Guide Investimentos S.A. Corretora de Valores"`
   - `"CM CAPITAL MARKETS CORRETORA DE CÂMBIO, TÍTULOS E VALORES MOBILIÁRIOS LTDA"`
   - `"SOCRED S.A. – SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR E À EMPRESA DE PEQUENO P"`
   - `"Banco Itaú BBA S.A"`
   - `"ATIVA INVESTIMENTOS S.A. CORRETORA DE TÍTULOS, CÂMBIO E VALORES"`
   - `"HS FINANCEIRA S/A CREDITO, FINANCIAMENTO E INVESTIMENTOS"`
   - `"SERVICOOP – COOPERATIVA DE CRÉDITO DOS SERVIDORES PÚBLICOS ESTADUAIS DO RIO GRAN"`
   - `"Nova Futura Corretora de Títulos e Valores Mobiliários Ltda."`
   - `"PARMETAL DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIÁRIOS LTDA"`
   - `"FAIR CORRETORA DE CAMBIO S.A."`
   - `"Stone Pagamentos S.A."`
   - `"Banco BTG Pactual S.A"`
   - `"Banco Original S.A"`
   - `"Banco Arbi S.A"`
   - `"Banco John Deere S.A"`
   - `"Banco BS2 S.A"`
   - `"Banco Credit Agricole Brasil S.A"`
   - `"Banco Fibra S.A"`
   - `"Banco Cifra S.A"`
   - `"BRADESCO"`
   - `"Banco Clássico S.A"`
   - `"Banco Máxima S.A"`
   - `"Banco ABC Brasil S.A"`
   - `"Banco Investcred Unibanco S.A."`
   - `"BCV – Banco de Crédito e Varejo S.A"`
   - `"Bexs Corretora de Câmbio S/A"`
   - `"Paraná Banco S.A"`
   - `"MONEYCORP BANCO DE CÂMBIO S.A."`
   - `"Nu Pagamentos S.A."`
   - `"Banco Fator S.A"`
   - `"Banco Cédula S.A"`
   - `"BARI COMPANHIA HIPOTECÁRIA"`
   - `"HSBC Brasil S.A. – Banco de Investimento"`
   - `"Sagitur Corretora de Câmbio Ltda."`
   - `"IB Corretora de Câmbio, Títulos e Valores Mobiliários S.A."`
   - `"AGK CORRETORA DE CAMBIO S.A."`
   - `"Cooperativa de Crédito Rural de São Miguel do Oeste – Sulcredi/São Miguel"`
   - `"MONEY PLUS SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR E A EMPRESA DE PEQUENO PORT"`
   - `"Senff S.A. – Crédito, Financiamento e Investimento"`
   - `"Genial Investimentos Corretora de Valores Mobiliários S.A."`
   - `"COOPERATIVA DE CREDITO RURAL DE PRIMAVERA DO LESTE"`
   - `"Avista S.A. Crédito, Financiamento e Investimento"`
   - `"Cooperativa de Crédito Rural Coopavel"`
   - `"RB CAPITAL INVESTIMENTOS DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIÁRIOS LIMITADA"`
   - `"Frente Corretora de Câmbio Ltda."`
   - `"COOPERATIVA DE CRÉDITO RURAL DE OURO SULCREDI/OURO"`
   - `"CAROL DISTRIBUIDORA DE TITULOS E VALORES MOBILIARIOS LTDA."`
   - `"DECYSEO CORRETORA DE CAMBIO LTDA."`
   - `"Pagseguro Internet S.A."`
   - `"BS2 Distribuidora de Títulos e Valores Mobiliários S.A."`
   - `"Lastro RDV Distribuidora de Títulos e Valores Mobiliários Ltda."`
   - `"VISION S.A. CORRETORA DE CAMBIO"`
   - `"Vip’s Corretora de Câmbio Ltda."`
   - `"SOROCRED CRÉDITO, FINANCIAMENTO E INVESTIMENTO S.A."`
   - `"Banco de La Nacion Argentin"`
   - `"BPP Instituição de Pagamento S.A."`
   - `"PORTOPAR DISTRIBUIDORA DE TITULOS E VALORES MOBILIARIOS LTDA."`
   - `"Terra Investimentos Distribuidora de Títulos e Valores Mobiliários Ltda."`
   - `"CAMBIONET CORRETORA DE CÂMBIO LTDA."`
   - `"VORTX DISTRIBUIDORA DE TITULOS E VALORES MOBILIARIOS LTDA."`
   - `"PI Distribuidora de Títulos e Valores Mobiliários S.A."`
   - `"Banco BMG S.A"`
   - `"OM DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIÁRIOS LTDA"`
   - `"China Construction Bank (Brasil) Banco Múltiplo S.A"`
   - `"CREFAZ SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR E A EMPRESA DE PEQUENO PORTE LT"`
   - `"Cooperativa de Crédito Rural de Abelardo Luz – Sulcredi/Crediluz"`
   - `"MERCADOPAGO.COM REPRESENTACOES LTDA."`
   - `"Órama Distribuidora de Títulos e Valores Mobiliários S.A."`
   - `"PARATI – CREDITO, FINANCIAMENTO E INVESTIMENTO S.A."`
   - `"QI Sociedade de Crédito Direto S.A."`
   - `"Banco Bari de Investimentos e Financiamentos S/"`
   - `"Fram Capital Distribuidora de Títulos e Valores Mobiliários S.A."`
   - `"Acesso Soluções de Pagamento S.A."`
   - `"Banco Digio S.A."`
   - `"Banco C6 S.A."`
   - `"Super Pagamentos e Administração de Meios Eletrônicos S.A."`
   - `"BANCO ITAU S.A."`
   - `"Creditas Sociedade de Crédito Direto S.A."`
   - `"FFA SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR E À EMPRESA DE PEQUENO PORTE LTDA."`
   - `"Banco XP S.A."`
   - `"AMAGGI S.A. – CRÉDITO, FINANCIAMENTO E INVESTIMENTO"`
   - `"TORO CORRETORA DE TÍTULOS E VALORES MOBILIÁRIOS LTDA"`
   - `"NECTON INVESTIMENTOS S.A. CORRETORA DE VALORES MOBILIÁRIOS E COMMODITIES"`
   - `"ÓTIMO SOCIEDADE DE CRÉDITO DIRETO S.A"`
   - `"GERENCIANET PAGAMENTOS DO BRASIL LTDA"`
   - `"SOLIDUS S.A. CORRETORA DE CAMBIO E VALORES MOBILIARIOS"`
   - `"Banco Société Générale Brasil S.A"`
   - `"VITREO DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIÁRIOS S.A."`
   - `"Banco Mizuho do Brasil S.A"`
   - `"UP.P SOCIEDADE DE EMPRÉSTIMO ENTRE PESSOAS S.A."`
   - `"Banco J. P. Morgan S.A"`
   - `"Banco Mercantil do Brasil S.A"`
   - `"Banco Bradesco Financiamentos S.A."`
   - `"Kirton Bank S.A. – Banco Múltiplo"`
   - `"Banco Capital S.A"`
   - `"Banco Safra S.A"`
   - `"Banco MUFG Brasil S.A"`
   - `"Banco Sumitomo Mitsui Brasileiro S.A"`
   - `"Banco Caixa Geral – Brasil S.A"`
   - `"Citibank N.A"`
   - `"Banco ItauBank S."`
   - `"Deutsche Bank S.A. – Banco Alemã"`
   - `"JPMorgan Chase Bank"`
   - `"ING Bank N.V"`
   - `"Banco de La Provincia de Buenos Aire"`
   - `"Banco Credit Suisse (Brasil) S.A"`
   - `"SENSO CORRETORA DE CAMBIO E VALORES MOBILIARIOS S.A"`
   - `"Banco Luso Brasileiro S.A"`
   - `"Banco Industrial do Brasil S.A"`
   - `"Banco VR S.A"`
   - `"Banco Paulista S.A"`
   - `"Banco Guanabara S.A"`
   - `"Omni Banco S.A"`
   - `"Banco PAN S.A"`
   - `"Banco Ficsa S.A"`
   - `"Banco Smartbank S.A."`
   - `"Banco Rendimento S.A"`
   - `"Banco Triângulo S.A"`
   - `"Banco Sofisa S.A"`
   - `"Banco Pine S.A"`
   - `"Itaú Unibanco Holding S.A"`
   - `"Banco Indusval S.A"`
   - `"Banco A.J.Renner S.A"`
   - `"Banco Votorantim S.A"`
   - `"Banco Daycoval S.A"`
   - `"Banco Ourinvest S.A"`
   - `"Banco Cetelem S.A"`
   - `"Banco Ribeirão Preto S.A"`
   - `"Banco Semear S.A"`
   - `"Banco Citibank S.A"`
   - `"Banco Modal S.A"`
   - `"Banco Rabobank International Brasil S.A"`
   - `"Banco Cooperativo Sicredi S.A"`
   - `"Scotiabank Brasil S.A. Banco Múltipl"`
   - `"Banco BNP Paribas Brasil S.A"`
   - `"Novo Banco Continental S.A. – Banco Múltipl"`
   - `"Banco Sistema S.A"`
   - `"Bank of America Merrill Lynch Banco Múltiplo S.A"`
   - `"Banco Cooperativo do Brasil S.A. – BANCOO"`
   - `"Banco KEB HANA do Brasil S.A"`
   - `"Indefinido"`
   - `"Nenhum"`
   - `"B&T CORRETORA DE CAMBIO LTDA."`
   - `"Banco ABN AMRO S.A"`
   - `"Banco Alfa S.A"`
   - `"Banco Andbank (Brasil) S.A"`
   - `"Banco B3 S.A"`
   - `"Banco BANDEPE S.A"`
   - `"Banco Bradescard S.A"`
   - `"Banco Bradesco BBI S.A."`
   - `"Banco Cargill S.A"`
   - `"Banco Crefisa S.A"`
   - `"Banco da Amazônia S.A"`
   - `"Banco da China Brasil S.A"`
   - `"Banco do Brasil S.A"`
   - `"Banco do Estado de Sergipe S.A"`
   - `"Banco do Estado do Pará S.A"`
   - `"Banco do Estado do Rio Grande do Sul S.A"`
   - `"Banco do Nordeste do Brasil S.A"`
   - `"Banco Finaxis S.A"`
   - `"Banco Inbursa S.A"`
   - `"Banco Inter S.A"`
   - `"Banco Itaú Consignado S.A."`
   - `"Banco J. Safra S.A"`
   - `"Banco KDB S.A"`
   - `"Banco Morgan Stanley S.A"`
   - `"Banco Nacional de Desenvolvimento Econômico e Social – BNDE"`
   - `"Banco Original do Agronegócio S.A"`
   - `"SANTANDER"`
   - `"Banco Topázio S.A"`
   - `"Banco Tricury S.A"`
   - `"BancoSeguro S.A"`
   - `"BANESTES S.A. Banco do Estado do Espírito Sant"`
   - `"BNY Mellon Banco S.A"`
   - `"BRB – Banco de Brasília S.A"`
   - `"Brickell S.A. Crédito"`
   - `"CENTRAL DE COOPERATIVAS DE ECONOMIA E CRÉDITO MÚTUO DO ESTADO DO RIO GRANDE DO S"`
   - `"Confidence Corretora de Câmbio S.A."`
   - `"Cooperativa Central de Crédito Noroeste Brasileiro Ltda"`
   - `"Cooperativa Central de Crédito – AILO"`
   - `"COOPERATIVA DE CRÉDITO MÚTUO DOS DESPACHANTES DE TRÂNSITO DE SANTA CATARINA E RI"`
   - `"Credialiança Cooperativa de Crédito Rural"`
   - `"CREDICOAMO CREDITO RURAL COOPERATIVA"`
   - `"CREDISAN COOPERATIVA DE CRÉDITO"`
   - `"CREDIT SUISSE HEDGING-GRIFFO CORRETORA DE VALORES S.A"`
   - `"Goldman Sachs do Brasil Banco Múltiplo S.A"`
   - `"Haitong Banco de Investimento do Brasil S.A"`
   - `"Hipercard Banco Múltiplo S.A"`
   - `"PÓLOCRED SOCIEDADE DE CRÉDITO AO MICROEMPREENDEDOR E À EMPRESA DE PEQUENO PORT"`
   - `"State Street Brasil S.A. – Banco Comercia"`
   - `"Travelex Banco de Câmbio S.A"`
   - `"UBS Brasil Corretora de Câmbio, Títulos e Valores Mobiliários S.A."`
   - `"UNIPRIME CENTRAL – CENTRAL INTERESTADUAL DE COOPERATIVAS DE CREDITO LTDA."`
   - `"Uniprime Norte do Paraná – Coop de Economia e Crédito Mútuo dos Médicos"`
   - `"Desconhecido"`

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

### id: `string`

#### Id da transação

 - Valor padrão: `""`

### ocorrencia: `string`

#### Data da Ocorrência

 - Valor padrão: `Dia atual`

### movimento: `string`

#### Data do Movimento em Conta

 - Valor padrão: `Dia atual`

### valor: `number`

#### Valor (R$)

 - Precisão: `0.01`
 - Valor mínimo: `0`
 - Valor máximo: `99999999999.99`
 - Valor padrão: `0`

### lancamento: `string`

#### Lançamento

 - Valor padrão: `""`

### status: `string`

#### Status

 - Valor padrão: `""`

### situacao: `string`

#### Situação

 - Valor padrão: `""`
 - Opções: 
   - `"Devedor"`
   - `"Credor"`

### categoria: `string`

#### Categoria

 - Valor padrão: `""`

### tipo: `string`

#### Tipo

 - Valor padrão: `""`

### descricao: `string`

#### Descrição

 - Valor padrão: `""`