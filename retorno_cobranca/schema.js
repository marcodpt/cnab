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
      "description": "Tipo do objeto.\nNecessário preencher para identificar o tipo do layout ao gerar o arquivo.",
      "type": "string",
      "const": "retorno_cobranca"
    },
    "nome": {
      "title": "Nome da Empresa",
      "description": "Todos os bancos utilizam esse campo.",
      "type": "string",
      "maxLength": 30,
      "default": ""
    },
    "cnpjcpf": {
      "title": "CNPJ/CPF da Empresa",
      "description": "Todos os bancos utilizam esse campo.",
      "type": "string",
      "pattern": "^(|\\d{11}|\\d{14})$",
      "maxLength": 14,
      "default": "",
      "format": "cnpjcpf"
    },
    "geracao": {
      "title": "Data de geração do Arquivo",
      "description": "Todos os bancos utilizam esse campo.",
      "type": "string",
      "format": "date",
      "default": hoje()
    },
    "banco": {
      "title": "Banco",
      "description": "Layout do arquivo.",
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
      "description": "Identificador da empresa no banco.\nItaú e Caixa ignoram esse campo.",
      "type": "string",
      "maxLength": 20,
      "default": ""
    },
    "agencia": {
      "title": "Agência",
      "description": "Agência da empresa.\nDaycoval e Santander ignoram esse campo.",
      "type": "integer",
      "minimum": 0,
      "maximum": 99999,
      "default": 0
    },
    "conta": {
      "title": "Conta",
      "description": "Conta da empresa.\nNo Santander é preenchido com o código do cedente.\nDaycoval ignora esse campo.",
      "type": "integer",
      "minimum": 0,
      "maximum": 99999999,
      "default": 0
    },
    "sequencia": {
      "title": "Numero Sequencial",
      "description": "Número sequencial do arquivo começando de 1.\nTodos os bancos utilizam esse campo.",
      "type": "integer",
      "minimum": 1,
      "maximum": 999999,
      "default": 1
    },
    "quantidade": {
      "title": "Quantidade",
      "description": "Quantidade de títulos em cobrança simples",
      "type": "integer",
      "minimum": 0,
      "maximum": 99999999,
      "default": 0
    },
    "total": {
      "title": "Total (R$)",
      "description": "Valor total dos títulos em cobrança simples",
      "type": "number",
      "multipleOf": 0.01,
      "minimum": 0,
      "maximum": 999999999999.99,
      "default": 0
    },
    "info": {
      "title": "Aviso",
      "description": "Referência do aviso bancário dos títulos em cobrança simples",
      "type": "string",
      "maxLength": 20,
      "default": ""
    },
    "quantidade2": {
      "title": "Quantidade",
      "description": "Quantidade de títulos em cobrança simples",
      "type": "integer",
      "minimum": 0,
      "maximum": 99999999,
      "default": 0
    },
    "total2": {
      "title": "Total (R$)",
      "description": "Valor total dos títulos em cobrança simples",
      "type": "number",
      "multipleOf": 0.01,
      "minimum": 0,
      "maximum": 999999999999.99,
      "default": 0
    },
    "info2": {
      "title": "Aviso bancário",
      "description": "Referência do aviso bancário dos títulos em cobrança simples",
      "type": "string",
      "maxLength": 20,
      "default": ""
    },
    "quantidade3": {
      "title": "Quantidade de títulos",
      "description": "Quantidade de títulos em cobrança simples",
      "type": "integer",
      "minimum": 0,
      "maximum": 99999999,
      "default": 0
    },
    "total3": {
      "title": "Total (R$)",
      "description": "Valor total dos títulos em cobrança simples",
      "type": "number",
      "multipleOf": 0.01,
      "minimum": 0,
      "maximum": 999999999999.99,
      "default": 0
    },
    "info3": {
      "title": "Aviso bancário",
      "description": "Referência do aviso bancário dos títulos em cobrança simples",
      "type": "string",
      "maxLength": 20,
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
            "description": "Apenas Itaú e Santander utilizam esse campo.",
            "type": "string",
            "maxLength": 40,
            "default": ""
          },
          "documento": {
            "title": "Id do documento na empresa (Duplicata)",
            "description": "Todos os bancos utilizam esse campo.",
            "type": "string",
            "maxLength": 10,
            "default": ""
          },
          "id": {
            "title": "Id do Título em Banco",
            "description": "Todos os bancos utilizam esse campo.",
            "type": "string",
            "maxLength": 10,
            "default": ""
          },
          "carteira": {
            "title": "Carteira",
            "description": "Carteira do título no banco.",
            "type": "string",
            "enum": [
              "Simples",
              "Vinculada",
              "Descontada"
            ],
            "default": "Simples"
          },
          "vencimento": {
            "title": "Data de Vencimento",
            "description": "Todos os bancos utilizam esse campo.",
            "type": "string",
            "format": "date",
            "default": hoje()
          },
          "valor": {
            "title": "Valor (R$)",
            "description": "Todos os bancos utilizam esse campo.",
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
            "description": "Todos os bancos utilizam esse campo.",
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
          "saldo": {
            "title": "Saldo em Conta (R$)",
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
          "erro": {
            "title": "Código do Erro",
            "type": "string",
            "default": "",
            "maxLength": 4
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
