import uf from '../uf.js'
import {hoje} from '../lib.js'

export default {
  "title": "Remessa Cobrança",
  "type": "object",
  "properties": {
    "tipo": {
      "title": "Tipo",
      "type": "string",
      "const": "remessa_cobranca"
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
    "id_empresa": {
      "title": "Id empresa",
      "type": "string",
      "maxLength": 20,
      "default": ""
    },
    "contrato": {
      "title": "contrato",
      "type": "string",
      "maxLength": 10,
      "default": ""
    },
    "criacao": {
      "title": "Data de geração",
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
    "sequencia": {
      "title": "Numero Sequencial",
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
              "Entrada",
              "Baixa",
              "Abatimento",
              "Prorrogação",
              "Protestar",
              "Não Protestar"
            ],
            "default": "Entrada"
          },
          "nota": {
            "title": "Nota",
            "type": "string",
            "maxLength": 15,
            "default": ""
          },
          "chave": {
            "title": "Chave NFe",
            "type": "string",
            "maxLength": 44,
            "default": ""
          },
          "total": {
            "title": "Total (R$)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "duplicata": {
            "title": "Duplicata",
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
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "multa": {
            "title": "Multa (%)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99.99,
            "default": 0
          },
          "protestar": {
            "title": "Protestar (dias)",
            "type": "integer",
            "minimum": 0,
            "maximum": 99,
            "default": 0
          },
          "baixa": {
            "title": "Baixa (dias)",
            "type": "integer",
            "minimum": 0,
            "maximum": 999,
            "default": 0
          },
          "uf": {
            "title": "Estado",
            "type": "string",
            "enum": uf,
            "default": "SP"
          },
          "cidade": {
            "title": "Cidade",
            "type": "string",
            "maxLength": 15,
            "default": "SAO PAULO"
          },
          "cep": {
            "title": "CEP",
            "type": "string",
            "pattern": "^(|\d{8})$",
            "maxLength": 8,
            "default": ""
          },
          "bairro": {
            "title": "Bairro",
            "type": "string",
            "maxLength": 12,
            "default": ""
          },
          "endereco": {
            "title": "Endereço",
            "type": "string",
            "maxLength": 40,
            "default": ""
          }
        }
      }
    }
  }
}
