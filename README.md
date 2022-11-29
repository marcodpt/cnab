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
 - [Santander remessa cobrança 400](http://suporte.basesoft.com.br/Download/Updates/Layout_CNAB_400_posicoes_Ver20_Out2009.pdf)
 - [Santander retorno cobrança 400](http://suporte.basesoft.com.br/Download/Updates/Layout_CNAB_400_posicoes_Ver20_Out2009.pdf)
 - [BB remessa cobrança 240](https://www.bb.com.br/docs/pub/emp/empl/dwn/CNAB240SegPQRSTY.pdf)
 - [BB retorno cobrança 240](https://www.bb.com.br/docs/pub/emp/empl/dwn/CNAB240SegPQRSTY.pdf)
 - [BB remessa sispag 240](https://www.bb.com.br/docs/portal/disem/PgtVer03BB.pdf?pk_vid=f0d809ef68fd163c16692020076af852)
 - [Caixa remessa cobrança 400](https://www.caixa.gov.br/Downloads/cobranca-caixa/Manual_de_Leiaute_de_Arquivo_Eletronico_CNAB_400.pdf)
 - [Caixa retorno cobrança 400](https://www.caixa.gov.br/Downloads/cobranca-caixa/Manual_de_Leiaute_de_Arquivo_Eletronico_CNAB_400.pdf)
 - [Daycoval remessa cobrança 400](https://www.bib.com.br/Download.aspx?Arquivo=uSSnjvYUyTt0wTSkhJ2HtQ==&usg=AOvVaw2eT39jsaJdSwCPHZBc5fYb)
 - [Daycoval retorno cobrança 400](https://www.bib.com.br/Download.aspx?Arquivo=uSSnjvYUyTt0wTSkhJ2HtQ==&usg=AOvVaw2eT39jsaJdSwCPHZBc5fYb)

## Melhorias a serem feitas
 - Rever estrutura dos diretorios e separar o diretorio de codigo e automatizar o maximo adicionar um novo schema em relação aos testes e documentação
 - Datas com opção de hora junto com 12 e 14 digitos
 - Adicionar especificação para valores negativos
 - Campos formadores de lote
 - Identificador de registro com regex
 - Tamanho da linha, checar arquivo e gerar erro
 - Validação dos dados pelo schema
 - Formularios na interface gráfica
 - Gerar erro ao tentar salvar varias vezes a mesma variável
 - Corrigir problema no favicon na pagina de testes
 - Eliminar logs e disparar erro com logs quando o layout não for identificado!
 - Implementar retorno cobrança
 - Implementar sispag
 - Implementar conciliação bancária

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
