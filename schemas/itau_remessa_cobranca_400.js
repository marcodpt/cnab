import carteiras from '../itau/carteiras.js'
import {remessa as ocorrencias} from '../itau/ocorrencias.js'
import especies from '../itau/especies.js'
import aceites from '../itau/aceites.js'
import instrucoes from '../itau/instrucoes.js'
import servicos from '../itau/servicos.js'
import uf from '../uf.js'
import {hoje} from '../lib.js'

export default {
  "title": "Remessa Itaú Cobrança",
  "description": "Layout para envio de cobrança Itaú CNAB 400",
  "type": "object",
  "properties": {
    "header": {
      "type": "object",
      "properties": {
        "tipo": {
          "title": "Tipo de registro",
          "description": "Identificação do registro header",
          "type": "integer",
          "const": 0
        },
        "codigo_uso": {
          "title": "Operação",
          "description": "Tipo de operação - remessa",
          "type": "integer",
          "const": 1
        },
        "uso": {
          "title": "Literal de remessa",
          "description": "Identificação por extenso do movimento",
          "type": "string",
          "const": "REMESSA"
        },
        "codigo_servico": {
          "title": "Código do serviço",
          "description": "Identificação do tipo de serviço",
          "type": "string",
          "enum": Object.keys(servicos),
          "maxLength": 2
        },
        "servico": {
          "title": "Literal de serviço",
          "description": "Identificação por extenso do tipo de serviço",
          "type": "string",
          "enum": Object.values(servicos),
          "maxLength": 15
        },
        "agencia": {
          "title": "Agência",
          "description": "Agência mantedora da conta",
          "type": "integer",
          "minimum": 0,
          "maximum": 9999,
          "default": 0
        },
        "zeros": {
          "title": "Zeros",
          "description": "Complemento de registro",
          "type": "integer",
          "minimum": 0,
          "maximum": 99,
          "const": 0
        },
        "conta": {
          "title": "Conta",
          "description": "Número da conta corrente da empresa",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999,
          "default": 0
        },
        "dac": {
          "title": "Dígito",
          "description": "Dígito de auto conferência ag/conta empresa",
          "type": "integer",
          "minimum": 0,
          "maximum": 9,
          "default": 0
        },
        "brancos": {
          "title": "Brancos",
          "description": "Complemento de registro",
          "type": "string",
          "minLength": 8,
          "const": ""
        },
        "nome": {
          "title": "Nome da empresa",
          "description": "Nome por extenso da \"empresa mãe\"",
          "type": "string",
          "minLength": 0,
          "maxLength": 30,
          "default": ""
        },
        "codigo_banco": {
          "title": "Código do banco",
          "description": "Número do banco na câmara de compensação",
          "type": "integer",
          "const": 341
        },
        "banco": {
          "title": "Nome do banco",
          "description": "Nome por extenso do banco cobrador",
          "type": "string",
          "const": "BANCO ITAU S.A."
        },
        "geracao": {
          "title": "Data de geração",
          "description": "Data de geração do arquivo",
          "type": "string",
          "format": "date6",
          "default": hoje()
        },
        "brancos": {
          "title": "Brancos",
          "description": "Complemento de registro",
          "type": "string",
          "minLength": 294,
          "const": ""
        },
        "sequencia": {
          "title": "Número sequencial",
          "description": "Número seqüencial do registro no arquivo",
          "type": "integer",
          "minimum": 1,
          "maximum": 999999,
          "default": 1
        }
      }
    },
    "registros": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "properties": {
          "tipo": {
            "title": "Tipo de registro",
            "description": "Identificação do registro transação",
            "type": "integer",
            "const": 1
          },
          "cod_inscricao": {
            "title": "Código de inscrição",
            "description": "Identificação do tipo de inscrição/empresa",
            "type": "string",
            "enum": ['01', '02'],
            "labels": ['CPF', 'CNPJ'],
            "maxLength": 2
          },
          "inscricao": {
            "title": "Número de inscrição",
            "description": "Número de inscrição da empresa (cpf/cnpj)",
            "type": "string",
            "pattern": "^\d{14}$",
            "default": "00000000000000",
            "minLength": 14,
            "maxLength": 14
          },
          "carteira": {
            "title": "Carteira",
            "type": "string",
            "enum": Object.keys(carteiras),
            "labels": Object.values(carteiras),
            "default": "112",
            "minLength": 3,
            "maxLength": 3
          },
          "ocorrencia": {
            "title": "Ocorrência",
            "type": "string",
            "enum": Object.keys(ocorrencias),
            "labels": Object.values(ocorrencias),
            "default": "01",
            "minLength": 2,
            "maxLength": 2
          },
          "documento": {
            "title": "Nº do Documento",
            "description": "Nº do documento de cobrança (dupl.,np etc.)",
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
            "title": "Valor Nominal (R$)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0.01,
            "maximum": 99999999999.99,
            "default": 1
          },
          "especie": {
            "title": "Espécie",
            "type": "string",
            "enum": Object.keys(especies),
            "labels": Object.values(especies),
            "default": "01",
            "minLength": 2,
            "maxLength": 2
          },
          "aceite": {
            "title": "Aceite",
            "type": "string",
            "enum": Object.keys(aceites),
            "labels": Object.values(aceites),
            "default": "N",
            "minLength": 1,
            "maxLength": 1
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
              "minLength": 2,
              "maxLength": 2
            }
          },
          "juros": {
            "title": "Juros de 1 dia (%)",
            "description": "Valor de mora por dia de atraso",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "mora": {
            "title": "Data mora",
            "type": "string",
            "format": "date"
          },
          "limite": {
            "title": "Desconto até",
            "description": "Data limite para concessão de desconto",
            "type": "string",
            "format": "date"
          },
          "desconto": {
            "title": "Valor do desconto (R$)",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "iof": {
            "title": "Valor do IOF (R$)",
            "description": "Valor do IOF recolhido p/ notas seguro",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "abatimento": {
            "title": "Valor do abatimento (R$)",
            "description": "",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "nome": {
            "title": "Nome do sacado",
            "type": "string",
            "minLength": 0,
            "maxLength": 30,
            "default": ""
          },
          "cnpjcpf": {
            "title": "CNPJ/CPF",
            "description": "Nº de inscrição do sacado (cpf/cnpj)",
            "type": "string",
            "pattern": "^(|\d{11}|\d{14})$",
            "maxLength": 14,
            "format": "cnpjcpf",
            "default": ""
          },
          "logradouro": {
            "title": "Logradouro",
            "description": "Rua, número e complemento do sacado",
            "type": "string",
            "minLength": 0,
            "maxLength": 40,
            "default": ""
          },
          "bairro": {
            "title": "Bairro",
            "description": "Bairro do sacado",
            "type": "string",
            "minLength": 0,
            "maxLength": 12,
            "default": ""
          },
          "cep": {
            "title": "CEP",
            "description": "CEP do sacado",
            "type": "string",
            "pattern": "^(|\d{8})$",
            "minLength": 0,
            "maxLength": 8,
            "default": ""
          },
          "cidade": {
            "title": "Cidade",
            "description": "Cidade do sacado",
            "type": "string",
            "minLength": 0,
            "maxLength": 15,
            "default": ""
          },
          "estado": {
            "title": "Estado",
            "description": "UF do sacado",
            "type": "string",
            "enum": uf,
            "minLength": 2,
            "maxLength": 2,
            "default": "SP"
          },
          "avalista": {
            "title": "Nome do sacador/avalista",
            "type": "string",
            "minLength": 0,
            "maxLength": 30,
            "default": ""
          }
        }
      }
    }
  }
}
