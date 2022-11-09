import uf from '../uf.js'
import bancos from '../bancos.js'
import {hoje} from '../lib.js'

export default {
  "title": "Remessa Cobrança",
  "type": "object",
  "properties": {
    "tipo": {
      "title": "Tipo",
      "type": "string",
      "const": "retorno_cobranca"
    },
    "empresa": {
      "title": "Empresa",
      "type": "string",
      "maxLength": 30,
      "default": ""
    },
    "tipo_empresa": {
      "title": "Pessoa",
      "type": "string",
      "enum": ["Física", "Jurídica"],
      "default": "Jurídica"
    },
    "cod_empresa": {
      "title": "CNPJ/CPF",
      "type": "string",
      "pattern": "^(|\d{11}|\d{14})$",
      "maxLength": 14,
      "default": "",
      "format": "cnpjcpf"
    },
    "criacao": {
      "title": "Data de geração",
      "type": "string",
      "format": "date",
      "default": hoje()
    },
    "credito": {
      "title": "Data de crédito",
      "type": "string",
      "format": "date",
      "default": hoje()
    },
    "banco": {
      "title": "Banco",
      "type": "string",
      "enum": [
        "itau",
        "bradesco",
        "santader",
        "caixa",
        "bb",
        "daycoval"
      ]
    },
    "agencia": {
      "title": "Agência",
      "type": "integer",
      "default": 0
    },
    "conta": {
      "title": "Conta",
      "type": "integer",
      "default": 0
    },
    "sequencia": {
      "title": "Numero Sequencial",
      "type": "integer",
      "minimum": 1,
      "maximum": 999999,
      "default": 1
    },
    "simples_qtde": {
      "title": "Quantidade simples",
      "description": "Quantidade de títulos em cobrança simples",
      "type": "integer",
      "minimum": 0,
      "maximum": 99999999,
      "default": 0
    },
    "simples_total": {
      "title": "Total simples (R$)",
      "description": "Valor total dos títulos em cobrança simples",
      "type": "number",
      "multipleOf": 0.01,
      "minimum": 0,
      "maximum": 999999999999.99,
      "default": 0
    },
    "simples_aviso": {
      "title": "Aviso simples",
      "description": "Referência do aviso bancário dos títulos em cobrança simples",
      "type": "string",
      "maxLength": 8,
      "default": ""
    },
    "vinculada_qtde": {
      "title": "Quantidade vinculada",
      "description": "Quantidade de títulos em cobrança vinculada",
      "type": "integer",
      "minimum": 0,
      "maximum": 99999999,
      "default": 0
    },
    "vinculada_total": {
      "title": "Total vinculada (R$)",
      "description": "Valor total dos títulos em cobrança vinculada",
      "type": "number",
      "multipleOf": 0.01,
      "minimum": 0,
      "maximum": 999999999999.99,
      "default": 0
    },
    "vinculada_aviso": {
      "title": "Aviso vinculada",
      "description": "Referência do aviso bancário dos títulos em cobrança vinculada",
      "type": "string",
      "maxLength": 8,
      "default": ""
    },
    "escritural_qtde": {
      "title": "Quantidade direta/escritural",
      "description": "Quantidade de títulos em cobrança direta/escritural",
      "type": "integer",
      "minimum": 0,
      "maximum": 99999999,
      "default": 0
    },
    "escritural_total": {
      "title": "Total direta/escritural (R$)",
      "description": "Valor total dos títulos em cobrança direta/escritural",
      "type": "number",
      "multipleOf": 0.01,
      "minimum": 0,
      "maximum": 999999999999.99,
      "default": 0
    },
    "escritural_aviso": {
      "title": "Aviso direta/escritural",
      "description": "Referência do aviso bancário dos títulos em cobrança direta/escritural",
      "type": "string",
      "maxLength": 8,
      "default": ""
    },
    "registros": {
      "title": "Registros",
      "type": "array",
      "minItems": 1,
      "default": [],
      "items": {
        "type": "object",
        "properties": {
          "cliente": {
            "title": "Cliente",
            "type": "string",
            "maxLength": 40
          },
          "tipo_cliente": {
            "title": "Pessoa",
            "type": "string",
            "enum": ["Física", "Jurídica"],
            "default": "Jurídica"
          },
          "cod_cliente": {
            "title": "CNPJ/CPF",
            "type": "string",
            "pattern": "^(|\d{11}|\d{14})$",
            "maxLength": 14,
            "default": "",
            "format": "cnpjcpf"
          },
          "operacao": {
            "title": "Operação",
            "type": "string",
            "enum": [
              "Erro",
              "Entrada",
              "Pagamento",
              "Pagamento em Cartório",
              "Baixa",
              "Abatimento",
              "Prorrogação",
              "Protestar",
              "Não Protestar"
            ],
            "default": "Pagamento"
          },
          "ocorrencia": {
            "title": "Data da Ocorrência",
            "type": "string",
            "format": "date",
            "default": hoje()
          },
          "duplicata": {
            "title": "Duplicata",
            "type": "string",
            "maxLength": 10,
            "default": ""
          },
          "id_banco": {
            "title": "Id Banco",
            "type": "string",
            "maxLength": 10,
            "default": ""
          },
          "emissao": {
            "title": "Data de Emissão",
            "type": "string",
            "format": "date",
            "default": hoje()
          },
          "vencimento": {
            "title": "Data de Vencimento",
            "type": "string",
            "format": "date",
            "default": hoje()
          },
          "valor": {
            "title": "Valor (R$)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "banco": {
            "title": "Banco",
            "type": "string",
            "enum": Object.values(bancos)
          },
          "agencia": {
            "title": "Agência",
            "type": "integer",
            "default": 0,
            "minimum": 0,
            "maximum": 99999
          },
          "juros": {
            "title": "Juros/dia (R$)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "desconto": {
            "title": "Desconto (R$)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "limite": {
            "title": "Desconto até",
            "type": "string",
            "format": "date",
            "default": ""
          },
          "iof": {
            "title": "IOF (R$)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "abatimento": {
            "title": "Abatimento (R$)",
            "description": "",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "saldo": {
            "title": "Saldo (R$)",
            "description": "",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "outros": {
            "title": "Outros (R$)",
            "description": "",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "credito": {
            "title": "Data de crédito",
            "type": "string",
            "format": "date",
            "default": hoje()
          }
        }
      }
    }
  }
}
