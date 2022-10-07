import carteiras from '../itau/carteiras.js'
import {remessa as ocorrencias} from '../itau/ocorrencias.js'
import especies from '../itau/especies.js'
import aceites from '../itau/aceites.js'
import instrucoes from '../itau/instrucoes.js'
import uf from '../uf.js'
import {hoje} from '../lib.js'

export default {
  "title": "Remessa Itaú Cobrança",
  "description": "Layout para envio de cobrança Itaú CNAB 400",
  "type": "object",
  "properties": {
    "agencia": {
      "title": "Agência",
      "description": "Agência mantedora da conta",
      "type": "integer",
      "minimum": 0,
      "maximum": 9999,
      "default": 0,
      "pos": 27
    },
    "conta": {
      "title": "Conta",
      "description": "Número da conta corrente da empresa",
      "type": "integer",
      "minimum": 0,
      "maximum": 99999,
      "default": 0,
      "pos": 33
    },
    "dac": {
      "title": "Dígito",
      "description": "Dígito de auto conferência ag/conta empresa",
      "type": "integer",
      "minimum": 0,
      "maximum": 9,
      "default": 0,
      "pos": 38
    },
    "nome": {
      "title": "Nome da empresa",
      "description": "Nome por extenso da \"empresa mãe\"",
      "type": "string",
      "minlength": 0,
      "maxlength": 30,
      "default": "",
      "pos": 47
    },
    "cnpjcpf": {
      "title": "CNPJ/CPF",
      "description": "CNPJ ou CPF da \"empresa mãe\"",
      "type": "string",
      "pattern": "^(|\d{11}|\d{14})$",
      "maxlength": 30,
      "format": "cnpjcpf",
      "default": "",
      "pos": 0
    },
    "sequencia": {
      "title": "Número sequencial",
      "description": "Número seqüencial do registro no arquivo",
      "type": "integer",
      "minimum": 1,
      "maximum": 999999,
      "default": 1,
      "pos": 395
    },
    "registros": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "properties": {
          "carteira": {
            "title": "Carteira",
            "type": "string",
            "enum": Object.keys(carteiras),
            "labels": Object.values(carteiras),
            "default": "112",
            "minlength": 3,
            "maxlength": 3,
            "pos": 84
          },
          "ocorrencia": {
            "title": "Ocorrência",
            "type": "string",
            "enum": Object.keys(ocorrencias),
            "labels": Object.values(ocorrencias),
            "default": "01",
            "minlength": 2,
            "maxlength": 2,
            "pos": 109
          },
          "documento": {
            "title": "Nº do Documento",
            "description": "Nº do documento de cobrança (dupl.,np etc.)",
            "type": "string",
            "maxlength": 10,
            "default": "",
            "pos": 111
          },
          "emissao": {
            "title": "Data de Emissão",
            "type": "string",
            "format": "date",
            "default": hoje(),
            "pos": 151
          },
          "vencimento": {
            "title": "Data de Vencimento",
            "type": "string",
            "format": "date",
            "default": hoje(),
            "pos": 121
          },
          "valor": {
            "title": "Valor Nominal (R$)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0.01,
            "maximum": 99999999999.99,
            "default": 1,
            "pos": 127
          },
          "especie": {
            "title": "Espécie",
            "type": "string",
            "enum": Object.keys(especies),
            "labels": Object.values(especies),
            "default": "01",
            "minlength": 2,
            "maxlength": 2,
            "pos": 148
          },
          "aceite": {
            "title": "Aceite",
            "type": "string",
            "enum": Object.keys(aceites),
            "labels": Object.values(aceites),
            "default": "N",
            "minlength": 1,
            "maxlength": 1,
            "pos": 150
          },
          "instrucoes": {
            "title": "Instruções",
            "type": "array",
            "maxItems": 2,
            "default": [],
            "items": {
              "type": "string",
              "enum": Object.keys(instrucoes),
              "labels": Object.values(instrucoes),
              "default": "02",
              "minlength": 2,
              "maxlength": 2
            },
            "pos": 157
          },
          "juros": {
            "title": "Juros de 1 dia (%)",
            "description": "Valor de mora por dia de atraso",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0,
            "pos": 161
          },
          "mora": {
            "title": "Data mora",
            "type": "string",
            "format": "date",
            "pos": 386
          },
          "limite": {
            "title": "Desconto até",
            "description": "Data limite para concessão de desconto",
            "type": "string",
            "format": "date",
            "pos": 
          },
          "desconto": {
            "title": "Valor do desconto (R$)",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0,
            "pos": 
          },
          "iof": {
            "title": "Valor do IOF (R$)",
            "description": "Valor do IOF recolhido p/ notas seguro",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0,
            "pos": 
          },
          "abatimento": {
            "title": "Valor do abatimento (R$)",
            "description": "",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0,
            "pos": 206
          },
          "nome": {
            "title": "Nome do sacado",
            "type": "string",
            "minlength": 0,
            "maxlength": 30,
            "default": "",
            "pos": 235
          },
          "cnpjcpf": {
            "title": "CNPJ/CPF",
            "description": "Nº de inscrição do sacado (cpf/cnpj)",
            "type": "string",
            "pattern": "^(|\d{11}|\d{14})$",
            "maxlength": 14,
            "format": "cnpjcpf",
            "default": "",
            "pos": 221
          },
          "logradouro": {
            "title": "Logradouro",
            "description": "Rua, número e complemento do sacado",
            "type": "string",
            "minlength": 0,
            "maxlength": 40,
            "default": "",
            "pos": 275
          },
          "bairro": {
            "title": "Bairro",
            "description": "Bairro do sacado",
            "type": "string",
            "minlength": 0,
            "maxlength": 12,
            "default": "",
            "pos": 315
          },
          "cep": {
            "title": "CEP",
            "description": "CEP do sacado",
            "type": "string",
            "pattern": "^(|\d{8})$"
            "minlength": 0,
            "maxlength": 8,
            "default": "",
            "pos": 327
          },
          "cidade": {
            "title": "Cidade",
            "description": "Cidade do sacado",
            "type": "string",
            "minlength": 0,
            "maxlength": 15,
            "default": "",
            "pos": 335
          },
          "estado": {
            "title": "Estado",
            "description": "UF do sacado",
            "type": "string",
            "enum": uf,
            "minlength": 2,
            "maxlength": 2,
            "default": "SP",
            "pos": 350
          },
          "avalista": {
            "title": "Nome do sacador/avalista",
            "type": "string",
            "minlength": 0,
            "maxlength": 30,
            "default": "",
            "pos": 352
          }
        }
      }
    }
  }
}
