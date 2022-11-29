import uf from '../uf.js'
import bancos from '../bancos.js'
import {hoje} from '../lib.js'

export default {
  "title": "Retorno Cobrança",
  "description": "Objeto JSON para leitura de arquivo CNAB de Retorno de Cobrança",
  "type": "object",
  "properties": {
    "tipo": {
      "title": "Tipo",
      "type": "string",
      "const": "retorno_cobranca"
    },
    "nome": {
      "title": "Nome da Empresa",
      "type": "string",
      "maxLength": 30,
      "default": ""
    },
    "cnpjcpf": {
      "title": "CNPJ/CPF da Empresa",
      "type": "string",
      "pattern": "^(|\d{11}|\d{14})$",
      "maxLength": 14,
      "default": "",
      "format": "cnpjcpf"
    },
    "id": {
      "title": "Id da Empresa no banco",
      "type": "string",
      "maxLength": 20,
      "default": ""
    },
    "criacao": {
      "title": "Data de geração",
      "type": "string",
      "format": "date",
      "default": hoje()
    },
    "hora": {
      "title": "Hora de geração",
      "type": "string",
      "default": "000000",
      "maxLength": 6
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
      ],
      "default": ""
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
    "carteira": {
      "title": "Carteira",
      "type": "integer",
      "default": 0
    },
    "credito": {
      "title": "Data de crédito",
      "type": "string",
      "format": "date",
      "default": hoje()
    },
    "versao": {
      "title": "Versão",
      "type": "integer",
      "minimum": 1,
      "maximum": 999,
      "default": 0
    },
    "sequencia": {
      "title": "Numero Sequencial",
      "type": "integer",
      "minimum": 1,
      "maximum": 999999,
      "default": 1
    },
    "mensagem": {
      "title": "Mensagem",
      "type": "string",
      "maxLength": 20,
      "default": ""
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
          "nome": {
            "title": "Nome do Cliente",
            "type": "string",
            "maxLength": 40,
            "default": ""
          },
          "cnpjcpf": {
            "title": "CNPJ/CPF do Cliente",
            "type": "string",
            "pattern": "^(|\d{11}|\d{14})$",
            "maxLength": 14,
            "default": "",
            "format": "cnpjcpf"
          },
          "duplicata": {
            "title": "Duplicata",
            "type": "string",
            "maxLength": 10,
            "default": ""
          },
          "id": {
            "title": "Id do Título em Banco",
            "type": "string",
            "maxLength": 10,
            "default": ""
          },
          "carteira": {
            "title": "Carteira",
            "type": "integer",
            "default": 0
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
          "op": {
            "title": "Codigo da Operação",
            "type": "integer",
            "minimum": 0,
            "maximum": 99,
            "default": 0
          },
          "operacao": {
            "title": "Operação",
            "type": "string",
            "enum": [
              "Outro",
              "Erro",
              "Entrada",
              "Pagamento",
              "Cartório",
              "Baixa",
              "Alteração"
            ],
            "default": "Outro"
          },
          "ocorrencia": {
            "title": "Data da Ocorrência",
            "type": "string",
            "format": "date",
            "default": hoje()
          },
          "pagamento": {
            "title": "Meio de pagamento",
            "type": "string",
            "default": ""
          },
          "banco": {
            "title": "Banco",
            "type": "string",
            "enum": Object.values(bancos),
            "default": ""
          },
          "agencia": {
            "title": "Agência",
            "type": "integer",
            "default": 0,
            "minimum": 0,
            "maximum": 99999
          },
          "especie": {
            "title": "Espécie",
            "type": "string",
            "default": ""
          },
          "juros": {
            "title": "Juros (R$)",
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
          "iof": {
            "title": "IOF (R$)",
            "description": "",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "tarifa": {
            "title": "Tarifa (R$)",
            "description": "",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "despesas": {
            "title": "Despesas (R$)",
            "description": "",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "custas": {
            "title": "Custas (R$)",
            "description": "",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "total": {
            "title": "Total (R$)",
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
            "title": "Outros créditos (R$)",
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
          },
          "mensagem": {
            "title": "Mensagem/Erros",
            "type": "string",
            "default": ""
          },
          "cartorio": {
            "title": "Cartorio e Protocolo",
            "type": "string",
            "default": ""
          }
        }
      }
    }
  }
}
