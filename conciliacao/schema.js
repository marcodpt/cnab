import bancos from '../bancos.js'
import {hoje} from '../lib.js'
import categorias from './notas/categorias.js'
import situacoes from './notas/situacoes.js'
import status from './notas/status.js'

export default {
  "title": "Conciliação Bancária",
  "description": "Objeto JSON para leitura de arquivo CNAB de Conciliação Bancária",
  "type": "object",
  "properties": {
    "tipo": {
      "title": "Tipo",
      "type": "string",
      "const": "conciliacao"
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
    "codigo": {
      "title": "Código da Empresa no Banco",
      "type": "string",
      "maxLength": 20,
      "default": ""
    },
    "sequencia": {
      "title": "Numero Sequencial",
      "type": "integer",
      "minimum": 1,
      "maximum": 999999,
      "default": 1
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
      "default": 0,
      "minimum": 0,
      "maximum": 999999
    },
    "conta": {
      "title": "Conta",
      "type": "integer",
      "default": 0,
      "minimum": 0,
      "maximum": 9999999999999
    },
    "dac": {
      "title": "Digito Verificador",
      "type": "integer",
      "default": 0,
      "minimum": 0,
      "maximum": 9
    },
    "geracao": {
      "title": "Data de geração",
      "type": "string",
      "format": "date",
      "default": hoje()
    },
    "data_inicial": {
      "title": "Data Inicial",
      "type": "string",
      "format": "date",
      "default": hoje()
    },
    "valor_inicial": {
      "title": "Valor Inicial (R$)",
      "type": "number",
      "multipleOf": 0.01,
      "minimum": -9999999999999999.99,
      "maximum": 9999999999999999.99,
      "default": 0
    },
    "status_inicial": {
      "title": "Status Inicial",
      "type": "string",
      "default": "",
      "enum": Object.values(status)
    },
    "bloqueado": {
      "title": "Bloqueado (>24h) (R$)",
      "type": "number",
      "multipleOf": 0.01,
      "minimum": 0,
      "maximum": 9999999999999999.99,
      "default": 0
    },
    "limite": {
      "title": "Limite disponível (R$)",
      "type": "number",
      "multipleOf": 0.01,
      "minimum": 0,
      "maximum": 9999999999999999.99,
      "default": 0
    },
    "pendente": {
      "title": "Pendente (<24h) (R$)",
      "type": "number",
      "multipleOf": 0.01,
      "minimum": 0,
      "maximum": 9999999999999999.99,
      "default": 0
    },
    "data_final": {
      "title": "Data Final",
      "type": "string",
      "format": "date",
      "default": hoje()
    },
    "valor_final": {
      "title": "Valor Final (R$)",
      "type": "number",
      "multipleOf": 0.01,
      "minimum": -9999999999999999.99,
      "maximum": 9999999999999999.99,
      "default": 0
    },
    "status_final": {
      "title": "Status Final",
      "type": "string",
      "default": "",
      "enum": Object.values(status)
    },
    "registros": {
      "title": "Registros",
      "type": "array",
      "minItems": 1,
      "default": [],
      "items": {
        "type": "object",
        "properties": {
          "banco": {
            "title": "Banco de Origem",
            "type": "string",
            "enum": Object.values(bancos),
            "default": ""
          },
          "agencia": {
            "title": "Agência de origem",
            "type": "string",
            "default": "",
            "maxLength": 5
          },
          "conta": {
            "title": "Conta de origem",
            "type": "string",
            "default": "",
            "maxLength": 12
          },
          "id": {
            "title": "Id da transação",
            "type": "string",
            "default": "" 
          },
          "ocorrencia": {
            "title": "Data da Ocorrência",
            "type": "string",
            "format": "date",
            "default": hoje()
          },
          "movimento": {
            "title": "Data do Movimento em Conta",
            "type": "string",
            "format": "date",
            "default": hoje()
          },
          "valor": {
            "title": "Valor (R$)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": -99999999999.99,
            "maximum": 99999999999.99,
            "default": 0
          },
          "situacao": {
            "title": "Situação do Lançamento",
            "type": "string",
            "default": "",
            "enum": Object.values(situacoes)
          },
          "categoria": {
            "title": "Categoria",
            "type": "string",
            "default": "",
            "enum": Object.values(categorias)
          },
          "info": {
            "title": "Info da Descrição",
            "type": "integer",
            "default": 0,
            "minimum": 0,
            "maximum": 9999
          },
          "descricao": {
            "title": "Descrição",
            "type": "string",
            "default": "",
            "maxLength": 25
          }
        }
      }
    }
  }
}
