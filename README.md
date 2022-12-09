# CNAB
Um modulo javascript para criar e converter arquivos CNAB com JSON 

[Experimente Online](https://marcodpt.github.io/cnab/)

## Layouts suportados
 - [Itaú remessa cobrança 400](https://download.itau.com.br/bankline/layout_cobranca_400bytes_cnab_itau_mensagem.pdf)
 - [Itaú retorno cobrança 400](https://download.itau.com.br/bankline/layout_cobranca_400bytes_cnab_itau_mensagem.pdf)
 - [Itaú remessa sispag 240](https://download.itau.com.br/bankline/sispag_cnab.pdf)
 - [Itaú conciliação bancária 240](https://download.itau.com.br/bankline/conciliacao_bancaria_%20240.pdf)
 - [Bradesco remessa cobrança 400](https://banco.bradesco/assets/pessoajuridica/pdf/4008-524-0121-layout-cobranca-versao-portugues.pdf)
 - [Bradesco retorno cobrança 400](https://banco.bradesco/assets/pessoajuridica/pdf/4008-524-0121-layout-cobranca-versao-portugues.pdf)
 - [Bradesco sispag 240](https://banco.bradesco/assets/pessoajuridica/pdf/4008-523-0687-layout-multipag.pdf)
 - [Bradesco conciliação bancária 240](https://banco.bradesco/assets/pessoajuridica/pdf/solucoes-integradas/outros/layout-de-arquivo/conciliacao_bancaria_240_posicoes_v_5.pdf)
 - [Santander remessa cobrança 400](http://suporte.basesoft.com.br/Download/Updates/Layout_CNAB_400_posicoes_Ver20_Out2009.pdf)
 - [Santander retorno cobrança 400](http://suporte.basesoft.com.br/Download/Updates/Layout_CNAB_400_posicoes_Ver20_Out2009.pdf)
 - [Santander sispag 240](https://cms.santander.com.br/sites/WPS/documentos/arq-layout-de-arquivos-1/17-10-26_171722_258-37-pagamento+a+fornecedores+layout+cnab+240+-+v10.pdf)
 - [Santander conciliação bancária 240](https://www.bb.com.br/docs/pub/emp/empl/dwn/Doc3526SegtoE.pdf)
 - [BB remessa cobrança 240](https://www.bb.com.br/docs/pub/emp/empl/dwn/CNAB240SegPQRSTY.pdf)
 - [BB retorno cobrança 240](https://www.bb.com.br/docs/pub/emp/empl/dwn/CNAB240SegPQRSTY.pdf)
 - [BB remessa sispag 240](https://www.bb.com.br/docs/portal/disem/PgtVer03BB.pdf?pk_vid=f0d809ef68fd163c16692020076af852)
 - [BB conciliação bancária 240](https://www.bb.com.br/docs/pub/emp/empl/dwn/Doc3526SegtoE.pdf)
 - [Caixa remessa cobrança 400](https://www.caixa.gov.br/Downloads/cobranca-caixa/Manual_de_Leiaute_de_Arquivo_Eletronico_CNAB_400.pdf)
 - [Caixa retorno cobrança 400](https://www.caixa.gov.br/Downloads/cobranca-caixa/Manual_de_Leiaute_de_Arquivo_Eletronico_CNAB_400.pdf)
 - [Caixa sispag 240](https://www.caixa.gov.br/Downloads/pagamentos-de-salarios-fornecedores-e-auto-pagamento/Leiaute_CNAB_240_Pagamentos.pdf)
 - [Caixa conciliação bancária 240](https://www.caixa.gov.br/Downloads/extrato-eletronico-conciliacao-bancaria/Manual_de_Leiaute_CNAB_240_Extrato_Eletronico_Para_Conciliacao_Bancaria.pdf)
 - [Daycoval remessa cobrança 400](https://www.bib.com.br/Download.aspx?Arquivo=uSSnjvYUyTt0wTSkhJ2HtQ==&usg=AOvVaw2eT39jsaJdSwCPHZBc5fYb)
 - [Daycoval retorno cobrança 400](https://www.bib.com.br/Download.aspx?Arquivo=uSSnjvYUyTt0wTSkhJ2HtQ==&usg=AOvVaw2eT39jsaJdSwCPHZBc5fYb)
 - Daycoval sispag 240
 - [Daycoval conciliação bancária 240](https://www.bb.com.br/docs/pub/emp/empl/dwn/Doc3526SegtoE.pdf)

## Melhorias a serem feitas
 - Rever estrutura dos diretorios e separar o diretorio de codigo e automatizar o maximo adicionar um novo schema em relação aos testes e documentação
 - Campos formadores de lote
 - Identificador de registro com regex
 - Tamanho da linha, checar arquivo e gerar erro
 - Validação dos dados pelo schema
 - Formularios na interface gráfica
 - Gerar erro ao tentar salvar varias vezes a mesma variável
 - Corrigir problema no favicon na pagina de testes
 - Valores defaults preenchidos no objeto
 - Eliminar regra de 1 caracter repete ele nos campos fixos
 - campos fixos saber tratar mapas
 - adicionar testes ao objeto

## Testes
### deno
```
cd tests
deno test --allow-read deno.js
```

### browser
[Testar](https://marcodpt.github.io/cnab/tests/)

## Gerar documentação
[Documentação](https://marcodpt.github.io/cnab/docs/)

```
cd manual
deno run --allow-write manual.js
mdbook build
```
