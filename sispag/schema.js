import uf from '../uf.js'
import bancos from '../bancos.js'
import servicos from './notas/servicos.js'
import pagamentos from './notas/pagamentos.js'
import {hoje} from '../lib.js'

export default {
  "title": "Sispag",
  "description": "Objeto JSON para envio de arquivo CNAB de Pagamentos",
  "type": "object",
  "properties": {
    "tipo": {
      "title": "Tipo",
      "type": "string",
      "const": "sispag"
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
      "title": "Código da Empresa",
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
      "title": "Agência da Empresa",
      "type": "integer",
      "default": 0,
      "minimum": 0,
      "maximum": 999999
    },
    "conta": {
      "title": "Conta da Empresa",
      "type": "integer",
      "default": 0,
      "minimum": 0,
      "maximum": 9999999999999
    },
    "dac": {
      "title": "Digito Verificador da Empresa",
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
    "servico": {
      "title": "Serviço",
      "type": "string",
      "enum": Object.values(servicos),
      "default": ""
    },
    "pagamento": {
      "title": "Forma de Pagamento",
      "type": "string",
      "enum": Object.values(pagamentos),
      "default": ""
    },
    "endereco": {
      "title": "Endereço",
      "type": "string",
      "maxLength": 30,
      "default": ""
    },
    "numero": {
      "title": "Número",
      "type": "integer",
      "default": 0,
      "minimum": 0,
      "maximum": 99999
    },
    "complemento": {
      "title": "Complemento",
      "type": "string",
      "maxLength": 15,
      "default": ""
    },
    "cidade": {
      "title": "Cidade",
      "type": "string",
      "maxLength": 20,
      "default": ""
    },
    "cep": {
      "title": "Endereço",
      "type": "string",
      "pattern": "^(|\d{8})$",
      "maxLength": 8,
      "default": ""
    },
    "uf": {
      "title": "Estado",
      "type": "string",
      "enum": uf,
      "default": "SP"
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
            "title": "Nome do Recebedor",
            "type": "string",
            "maxLength": 40,
            "default": ""
          },
          "cnpjcpf": {
            "title": "CNPJ/CPF do Recebedor",
            "type": "string",
            "pattern": "^(|\d{11}|\d{14})$",
            "maxLength": 14,
            "default": "",
            "format": "cnpjcpf"
          },
          "banco": {
            "title": "Banco do Recebedor",
            "type": "string",
            "enum": Object.values(bancos),
            "default": ""
          },
          "agencia": {
            "title": "Agência do Recebedor",
            "type": "integer",
            "default": 0,
            "minimum": 0,
            "maximum": 999999
          },
          "conta": {
            "title": "Conta do Recebedor",
            "type": "integer",
            "default": 0,
            "minimum": 0,
            "maximum": 9999999999999
          },
          "dac": {
            "title": "Digito Verificador do Recebedor",
            "type": "integer",
            "default": 0,
            "minimum": 0,
            "maximum": 9
          },
          "documento": {
            "title": "Numero do documento",
            "type": "string",
            "maxLength": 20,
            "default": ""
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
          }
        }
      }
    }
  }
}
