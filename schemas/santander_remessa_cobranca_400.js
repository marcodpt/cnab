import {remessa as ocorrencias} from '../santander/ocorrencias.js'
import especies from '../santander/especies.js'
import instrucoes from '../santander/instrucoes.js'
import carteiras from '../santander/carteiras.js'
import uf from '../uf.js'
import {hoje} from '../lib.js'

export default {
  "title": "Remessa Santander Cobrança",
  "description": "Layout para envio de cobrança Santander CNAB 400",
  "type": "object",
  "properties": {
    "header": {
      "type": "object",
      "properties": {
        "tipo": {
          "title": "Código do registro",
          "type": "integer",
          "const": 0
        },
        "codigo_uso": {
          "title": "Código da remessa",
          "type": "integer",
          "const": 1
        },
        "uso": {
          "title": "Literal de transmissão",
          "type": "string",
          "const": "REMESSA"
        },
        "codigo_servico": {
          "title": "Código do serviço",
          "type": "string",
          "const": "01",
          "maxLength": 2
        },
        "servico": {
          "title": "Literal de serviço",
          "type": "string",
          "const": "COBRANCA",
          "maxLength": 15
        },
        "codigo_empresa": {
          "title": "Código de Transmissão",
          "type": "string",
          "default": "",
          "maxLength": 20
        },
        "nome": {
          "title": "Nome do cedente",
          "type": "string",
          "maxLength": 30,
          "default": ""
        },
        "codigo_banco": {
          "title": "Código do Banco",
          "type": "integer",
          "const": 33,
          "maximum": 999
        },
        "banco": {
          "title": "Nome do Banco",
          "type": "string",
          "maxLength": 15,
          "const": "SANTANDER"
        },
        "geracao": {
          "title": "Data de Gravação",
          "type": "string",
          "format": "date6",
          "default": hoje()
        },
        "zeros": {
          "title": "Zeros",
          "type": "string",
          "const": "0000000000000000"
        },
        "brancos": {
          "title": "Branco",
          "type": "string",
          "maxLength": 275,
          "const": ""
        },
        "versao": {
          "title": "Número da versão da remessa opcional, se informada, será controlada pelo sistema",
          "type": "integer",
          "default": 0,
          "maximum": 999
        },
        "sequencia": {
          "title": "Número seqüencial do registro no arquivo",
          "type": "integer",
          "minimum": 1,
          "maximum": 999999,
          "default": 0
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
            "title": "Código do registro",
            "type": "integer",
            "const": 1
          },
          "cod_inscricao_empresa": {
            "title": "Tipo de inscrição do cedente",
            "type": "string",
            "enum": ['01', '02'],
            "labels": ['CPF', 'CNPJ'],
            "maxLength": 2
          },
          "inscricao_empresa": {
            "title": "CGC ou CPF do cedente",
            "type": "string",
            "pattern": "^\d{14}$",
            "default": "00000000000000",
            "minLength": 14,
            "maxLength": 14
          },
          "codigo_empresa": {
            "title": "Código de Transmissão",
            "type": "string",
            "default": "",
            "maxLength": 20
          },
          "uso_empresa": {
            "title": "Número de controle do participante, para controle por parte do cedente",
            "type": "string",
            "default": "",
            "maxLength": 25
          },
          "id_banco": {
            "title": "Nosso número",
            "type": "string",
            "default": "",
            "maxLength": 8
          },
          "desconto2": {
            "title": "Data do segundo desconto",
            "type": "string",
            "default": "",
            "maxLength": 6
          },
          "brancos1": {
            "title": "Branco",
            "type": "string",
            "default": "",
            "maxLength": 1
          },
          "codigo_multa": {
            "title": "Informação de multa",
            "type": "string",
            "enum": ['0', '4'],
            "labels": ['Sem multa', 'Com multa'],
            "default": "",
            "maxLength": 1
          },
          "multa": {
            "title": "Percentual multa por atraso %",
            "type": "number",
            "default": 0,
            "multipleOf": 0.01,
            "maximum": 99.99
          },
          "moeda": {
            "title": "Unidade de valor moeda corrente",
            "type": "integer",
            "default": 0,
            "maximum": 99
          },
          "cambio": {
            "title": "Valor do título em outra unidade de valor",
            "type": "number",
            "multipleOf": 0.00001,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "brancos2": {
            "title": "Brancos",
            "type": "string",
            "default": "",
            "maxLength": 4
          },
          "data_multa": {
            "title": "Data para cobrança de multa.",
            "type": "string",
            "maxLength": 6,
            "default": ""
          },
          "carteira": {
            "title": "Código da carteira",
            "type": "string",
            "enum": Object.keys(carteiras),
            "labels": Object.values(carteiras),
            "maxLength": 1
          },
          "ocorrencia": {
            "title": "Código de ocorrência",
            "type": "string",
            "enum": Object.keys(ocorrencias),
            "labels": Object.values(ocorrencias),
            "maxLength": 2
          },
          "documento": {
            "title": "Seu número",
            "type": "string",
            "default": "",
            "maxLength": 10
          },
          "vencimento": {
            "title": "Data de vencimento do título",
            "type": "string",
            "format": "date6",
            "default": hoje()
          },
          "valor": {
            "title": "Valor do título - moeda corrente",
            "type": "number",
            "multipleOf": 0.01,
            "maximum": 99999999999.99,
            "default": 0
          },
          "banco": {
            "title": "Número do Banco cobrador",
            "type": "string",
            "const": "033"
          },
          "cobradora": {
            "title": "Código da agência cobradora do Banco Santander",
            "type": "integer",
            "default": 0,
            "maximum": 99999
          },
          "especie": {
            "title": "Espécie de Título",
            "type": "string",
            "default": "01",
            "maxLength": 2,
            "enum": Object.keys(especies),
            "labels": Object.values(especies)
          },
          "aceite": {
            "title": "Tipo de aceite",
            "type": "string",
            "const": "N"
          },
          "emissao": {
            "title": "Data da Emissão do Título",
            "type": "string",
            "format": "date6",
            "default": hoje()
          },
          "instrucao1": {
            "title": "Primeira instrução cobrança",
            "type": "string",
            "enum": Object.keys(instrucoes),
            "labels": Object.values(instrucoes),
            "default": "00",
            "maxLength": 2
          },
          "instrucao2": {
            "title": "Segunda instrução cobrança",
            "type": "string",
            "enum": Object.keys(instrucoes),
            "labels": Object.values(instrucoes),
            "default": "00",
            "maxLength": 2
          },
          "mora": {
            "title": "Valor de mora a ser cobrado por dia de atraso",
            "type": "number",
            "multipleOf": 0.01,
            "maximum": 99999999999.99,
            "default": 0
          },
          "limite": {
            "title": "Data limite para concessão de desconto",
            "type": "string",
            "maxLength": 6
          },
          "desconto": {
            "title": "Valor de desconto a ser concedido",
            "type": "number",
            "multipleOf": 0.01,
            "maximum": 99999999999.99,
            "default": 0
          },
          "iof": {
            "title": "Valor do IOF a ser recolhido pelo Banco para nota de seguro",
            "type": "number",
            "multipleOf": 0.01,
            "maximum": 99999999999.99,
            "default": 0
          },
          "abatimento": {
            "title": "Valor do abatimento a ser concedido ou valor do segundo desconto",
            "type": "number",
            "multipleOf": 0.01,
            "maximum": 99999999999.99,
            "default": 0
          },
          "cod_inscricao": {
            "title": "Tipo de inscrição do sacado",
            "type": "string",
            "enum": ['01', '02'],
            "labels": ['CPF', 'CNPJ'],
            "maxLength": 2
          },
          "inscricao": {
            "title": "CGC ou CPF do sacado",
            "type": "integer",
            "default": 0,
            "maximum": 99999999999999
          },
          "nome": {
            "title": "Nome do sacado",
            "type": "string",
            "default": "",
            "maxLength": 40
          },
          "endereco": {
            "title": "Endereço do sacado",
            "type": "string",
            "default": "",
            "maxLength": 40
          },
          "bairro": {
            "title": "Bairro do sacado",
            "type": "string",
            "default": "",
            "maxLength": 12
          },
          "cep": {
            "title": "CEP do sacado",
            "type": "integer",
            "default": 0,
            "maximum": 99999999
          },
          "cidade": {
            "title": "Município do sacado",
            "type": "string",
            "default": "",
            "maxLength": 15
          },
          "estado": {
            "title": "UF Estado do sacado",
            "type": "string",
            "enum": uf,
            "minLength": 2,
            "maxLength": 2,
            "default": "SP"
          },
          "sacador": {
            "title": "Nome do sacador ou coobrigado",
            "type": "string",
            "default": "",
            "maxLength": 30
          },
          "brancos3": {
            "title": "Brancos",
            "type": "string",
            "default": "",
            "maxLength": 1
          },
          "indicador": {
            "title": "Identificador do Complemento",
            "type": "string",
            "const": "I"
          },
          "complemento": {
            "title": "Complemento",
            "type": "integer",
            "default": 0,
            "maximum": 99
          },
          "brancos4": {
            "title": "Brancos",
            "type": "string",
            "default": "",
            "maxLength": 6
          },
          "protesto": {
            "title": "Número de dias para protesto",
            "type": "integer",
            "default": 0,
            "maximum": 99
          },
          "brancos5": {
            "title": "Brancos",
            "type": "string",
            "default": "",
            "maxLength": 1
          },
          "indice": {
            "title": "Nº Sequencial do Registro",
            "type": "integer",
            "minimum": 1,
            "maximum": 999999,
            "const": 0
          }
        }
      }
    },
    "trailer": {
      "type": "object",
      "properties": {
        "tipo": {
          "title": "Código do registro",
          "type": "integer",
          "const": 9
        },
        "quantidade": {
          "title": "Quantidade total de linhas no arquivo",
          "type": "integer",
          "minimum": 1,
          "maximum": 999999,
          "const": dados => dados.registros.length + 2
        },
        "total": {
          "title": "Valor total dos títulos",
          "type": "number",
          "multipleOf": 0.01,
          "maximum": 99999999999.99,
          "const": dados => Math.round(dados.registros.reduce(
            (total, item) => total + item.valor * 100
          , 0)) / 100
        },
        "zeros": {
          "title": "Zeros",
          "type": "string",
          "const": "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        },
        "indice": {
          "title": "Número seqüencial do registro no arquivo",
          "type": "integer",
          "minimum": 1,
          "maximum": 999999,
          "const": dados => dados.registros.length + 2
        }
      }
    }
  }
}
