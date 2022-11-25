import uf from '../uf.js'
import {hoje} from '../lib.js'

export default {
  "title": "Remessa Cobrança",
  "description": "Esquema JSON para geração de arquivo CNAB de Remessa de Cobrança",
  "type": "object",
  "properties": {
    "tipo": {
      "title": "Tipo",
      "description": "Tipo do objeto.\nNecessário preencher para identificar o tipo do layout ao gerar o arquivo.",
      "type": "string",
      "const": "remessa_cobranca"
    },
    "nome": {
      "title": "Nome da Empresa",
      "description": "Necessário preencher em todos os bancos.",
      "type": "string",
      "maxLength": 30,
      "default": ""
    },
    "cnpjcpf": {
      "title": "CNPJ/CPF da Empresa",
      "description": "No Bradesco apenas o código da empresa é necessário e pode deixar em branco.\nNos demais bancos é necessário preencher.",
      "type": "string",
      "pattern": "^(|\\d{11}|\\d{14})$",
      "maxLength": 14,
      "default": "",
      "format": "cnpjcpf"
    },
    "geracao": {
      "title": "Data de geração do Arquivo",
      "description": "Necessário preencher em todos os bancos.",
      "type": "string",
      "format": "date",
      "default": hoje()
    },
    "banco": {
      "title": "Banco",
      "description": "Layout que vai ser gerado o arquivo.",
      "type": "string",
      "enum": [
        "itau",
        "bradesco",
        "santader",
        "caixa",
        "bb",
        "daycoval"
      ],
      "default": ""
    },
    "codigo": {
      "title": "Código da Empresa",
      "description": "Identificador da empresa fornecido pelo banco.\nNecessário para: santander, daycoval e bradesco.\nNos demais casos ignorar e deixar em branco.",
      "type": "string",
      "maxLength": 20,
      "default": ""
    },
    "agencia": {
      "title": "Agência",
      "description": "É necessário em todos os bancos com exceção da caixa econômica.",
      "type": "integer",
      "minimum": 0,
      "maximum": 9999,
      "default": 0
    },
    "conta": {
      "title": "Conta Corrente",
      "description": "Necessário para: bb, itaú e bradesco.\nNos demais casos ignorar e deixar em branco.",
      "type": "integer",
      "minimum": 0,
      "maximum": 99999999,
      "default": 0
    },
    "carteira": {
      "title": "Carteira",
      "description": "No BB, santander e daycoval é acatado.\nCaixa e Bradesco não possuem essa informação no layout.\nNo Itaú é utilizado contas diferentes para cada tipo de carteira e esse campo é ignorado.",
      "type": "string",
      "enum": [
        "Simples",
        "Vinculada",
        "Descontada"
      ],
      "default": "Simples"
    },
    "contrato": {
      "title": "Número do Contrato",
      "description": "No Banco do Brasil utilizar o número do contrato de cobrança.\nNa caixa econômica utilizar o código do beneficiário.\nNos demais casos ignorar e deixar em branco.",
      "type": "string",
      "maxLength": 10,
      "default": "" 
    },
    "info": {
      "title": "Informações Complementares",
      "description": "No banco do brasil urtilizar o número do convênio de cobrança.\nNo santander quando necessário utilizar 'I{DC}' onde {DC} são o último dígito e o complemento da conta cobrança.\nNos demais casos ignorar e deixar em branco.",
      "type": "string",
      "maxLength": 9,
      "default": "" 
    },
    "sequencia": {
      "title": "Número Sequencial",
      "description": "Número sequencial do arquivo começando de 1.\nItaú e Daycoval ignoram esse campo.\nNos demais bancos é necessário preencher corretamente.",
      "type": "integer",
      "minimum": 1,
      "maximum": 999999,
      "default": 1
    },
    "registros": {
      "title": "Registros",
      "type": "array",
      "minItems": 1,
      "default": [],
      "items": {
        "type": "object",
        "properties": {
          "nome": {
            "title": "Nome do Cliente",
            "description": "Necessário preencher em todos os bancos.",
            "type": "string",
            "maxLength": 40,
            "default": ""
          },
          "cnpjcpf": {
            "title": "CNPJ/CPF do Cliente",
            "description": "Necessário preencher em todos os bancos.",
            "type": "string",
            "pattern": "^(|\\d{11}|\\d{14})$",
            "maxLength": 14,
            "default": "",
            "format": "cnpjcpf"
          },
          "operacao": {
            "title": "Operação",
            "description": "Necessário preencher em todos os bancos.",
            "type": "string",
            "enum": [
              "Entrada",
              "Baixa",
              "Abatimento",
              "Prorrogação"
            ],
            "default": "Entrada"
          },
          "chave": {
            "title": "Chave NFe",
            "description": "Apenas Daycoval faz uso da chave da NFe.\nIgnorar nos demais bancos.",
            "type": "string",
            "maxLength": 44,
            "default": ""
          },
          "total": {
            "title": "Total NFe (R$)",
            "description": "Apenas Daycoval faz uso do total da NFe.\nIgnorar nos demais bancos.",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "documento": {
            "title": "Id do documento (Duplicata)",
            "description": "Necessário preencher em todos os bancos.",
            "type": "string",
            "maxLength": 10,
            "default": ""
          },
          "emissao": {
            "title": "Data de Emissão",
            "description": "Necessário preencher em todos os bancos.",
            "type": "string",
            "format": "date",
            "default": hoje()
          },
          "vencimento": {
            "title": "Data de Vencimento",
            "description": "Necessário preencher em todos os bancos.",
            "type": "string",
            "format": "date",
            "default": hoje()
          },
          "valor": {
            "title": "Valor (R$)",
            "description": "Necessário preencher em todos os bancos.",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "juros": {
            "title": "Juros/dia (R$)",
            "description": "Valor acrescido ao título por dia de atraso.\nNecessário preencher em todos os bancos.",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "abatimento": {
            "title": "Abatimento (R$)",
            "description": "Abatimento no valor do título.\nPreencher apenas quando a operação for Abatimento, nesse caso deve ser preenchido em todos os bancos.",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "protestar": {
            "title": "Protestar (dias)",
            "description": "Número de dias úteis para protestar o título.\nSuportado apenas pelo BB, caixa e Daycoval.\nNos demais bancos deixar em branco.",
            "type": "integer",
            "minimum": 0,
            "maximum": 99,
            "default": 0
          },
          "uf": {
            "title": "Estado",
            "description": "UF do cliente.\nBradesco utiliza apenas o CEP e não é necessário preencher.\nDeve ser preenchido nos demais bancos.",
            "type": "string",
            "enum": uf,
            "default": "SP"
          },
          "cidade": {
            "title": "Cidade",
            "description": "Cidade do cliente.\nBradesco utiliza apenas o CEP e não é necessário preencher.\nDeve ser preenchido nos demais bancos.",
            "type": "string",
            "maxLength": 15,
            "default": ""
          },
          "cep": {
            "title": "CEP",
            "description": "CEP do cliente.\nDeve ser preenchido em todos os bancos.",
            "type": "string",
            "pattern": "^(|\\d{8})$",
            "maxLength": 8,
            "default": ""
          },
          "bairro": {
            "title": "Bairro",
            "description": "Bairro do cliente.\nBradesco utiliza apenas o CEP e não é necessário preencher.\nDeve ser preenchido nos demais bancos.",
            "type": "string",
            "maxLength": 12,
            "default": ""
          },
          "endereco": {
            "title": "Endereço",
            "description": "Endereço do cliente com número e complemento.\nDeve ser preenchido em todos os bancos.",
            "type": "string",
            "maxLength": 40,
            "default": ""
          }
        }
      }
    }
  }
}
