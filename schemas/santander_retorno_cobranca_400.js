import bancos from '../bancos.js'
import especies from '../santander/especies.js'
import carteiras from '../santander/carteiras.js'
import {retorno as ocorrencias} from '../santander/ocorrencias.js'
import {hoje} from '../lib.js'

export default {
  "title": "Retorno Santander Cobrança",
  "description": "Layout para retorno de cobrança Santander CNAB 400",
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
          "const": 2
        },
        "uso": {
          "title": "Literal de transmissão",
          "type": "string",
          "const": "RETORNO"
        },
        "codigo_servico": {
          "title": "Código do serviço",
          "type": "integer",
          "const": 1,
          "maximum": 99
        },
        "servico": {
          "title": "Literal de serviço",
          "type": "string",
          "enum": "COBRANCA",
          "maxLength": 15
        },
        "agencia": {
          "title": "Código da agência cedente",
          "type": "integer",
          "default": 0,
          "maximum": 9999
        },
        "conta_corrente": {
          "title": "Conta movimento cedente",
          "type": "integer",
          "default": 0,
          "maximum": 99999999
        },
        "conta_cobranca": {
          "title": "Conta cobrança cedente",
          "type": "integer",
          "default": 0,
          "maximum": 99999999
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
          "const": "SANTANDER",
          "maxLength": 15
        },
        "movimento": {
          "title": "Data do movimento",
          "type": "string",
          "format": "date6",
          "default": ""
        },
        "zeros": {
          "title": "Zeros",
          "type": "string",
          "const": "0000000000"
        },
        "id_empresa": {
          "title": "Código do cedente",
          "type": "string",
          "default": "",
          "maxLength": 7
        },
        "brancos": {
          "title": "Brancos",
          "type": "string",
          "const": "",
          "maxLength": 274
        },
        "versao": {
          "title": "Número da versão",
          "type": "integer",
          "default": 0,
          "maximum": 999
        },
        "indice": {
          "title": "Número seqüencial do registro no arquivo",
          "type": "integer",
          "minimum": 1,
          "maximum": 999999,
          "const": 1
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
          "cod_inscricao": {
            "title": "Tipo de inscrição do cedente",
            "type": "string",
            "enum": ['01', '02'],
            "labels": ['CPF', 'CNPJ'],
            "maxLength": 2
          },
          "inscricao": {
            "title": "CGC ou CPF do cedente",
            "type": "string",
            "pattern": "^\d{14}$",
            "default": "00000000000000",
            "minLength": 14,
            "maxLength": 14
          },
          "agencia": {
            "title": "Código da agência cedente",
            "type": "integer",
            "default": 0,
            "maximum": 9999
          },
          "conta_corrente": {
            "title": "Conta movimento cedente",
            "type": "integer",
            "default": 0,
            "maximum": 99999999
          },
          "conta_cobranca": {
            "title": "Conta cobrança cedente",
            "type": "integer",
            "default": 0,
            "maximum": 99999999
          },
          "uso_empresa": {
            "title": "Número de controle do participante, para controle por parte do cedente",
            "type": "string",
            "default": "",
            "maxLength": 25
          },
          "id_banco": {
            "title": "Nosso número",
            "type": "integer",
            "default": 0,
            "maximum": 99999999
          },
          "brancos1": {
            "title": "Brancos",
            "type": "string",
            "default": "",
            "maxLength": 37
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
          "data": {
            "title": "Data da ocorrência",
            "type": "string",
            "format": "date6",
            "default": hoje()
          },
          "documento": {
            "title": "Número do Documento",
            "type": "string",
            "default": "",
            "maxLength": 10
          },
          "id_banco2": {
            "title": "Nosso número",
            "type": "integer",
            "const": (dados, linha) => linha.id_banco,
            "maximum": 99999999
          },
          "erro": {
            "title": "Código Original da Remessa",
            "type": "integer",
            "default": 0,
            "maximum": 99
          },
          "erro1": {
            "title": "Código do Erro (1ª ocorrência)",
            "type": "string",
            "default": "",
            "maxLength": 3
          },
          "erro2": {
            "title": "Código do Erro (2ª ocorrência)",
            "type": "string",
            "default": "",
            "maxLength": 3
          },
          "erro3": {
            "title": "Código do Erro (3ª ocorrência)",
            "type": "string",
            "default": "",
            "maxLength": 3
          },
          "brancos2": {
            "title": "Brancos",
            "type": "string",
            "default": "",
            "maxLength": 1
          },
          "vencimento": {
            "title": "Data de vencimento do título",
            "type": "string",
            "format": "date6",
            "default": hoje()
          },
          "valor": {
            "title": "Valor do título em moeda corrente",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0.01,
            "maximum": 99999999999.99,
            "default": 0
          },
          "banco": {
            "title": "Número do Banco cobrador",
            "type": "string",
            "enum": Object.keys(bancos),
            "labels": Object.values(bancos),
            "maxLength": 3
          },
          "cobradora": {
            "title": "Código da agência recebedora do título",
            "type": "integer",
            "default": 0,
            "maximum": 99999
          },
          "especie": {
            "title": "Espécie",
            "type": "string",
            "enum": Object.keys(especies),
            "labels": Object.values(especies),
            "maxLength": 2
          },
          "tarifa": {
            "title": "Valor da tarifa cobrada",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "protesto": {
            "title": "Valor de outras despesas",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "juros": {
            "title": "Valor dos juros de atraso",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "iof": {
            "title": "Valor do IOF devido",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "abatimento": {
            "title": "Valor do abatimento concedido",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "descontos": {
            "title": "Valor do desconto concedido",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "principal": {
            "title": "Valor total recebido",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "mora": {
            "title": "Valor dos juros de mora",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "outros": {
            "title": "Valor de outros créditos",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "brancos3": {
            "title": "Brancos",
            "type": "string",
            "const": "",
            "maxLength": 1
          },
          "aceite": {
            "title": "Código de aceite",
            "type": "string",
            "const": "N"
          },
          "brancos4": {
            "title": "Brancos",
            "type": "string",
            "const": "",
            "maxLength": 1
          },
          "credito": {
            "title": "Data do Crédito",
            "type": "string",
            "format": "date6",
            "default": ""
          },
          "nome": {
            "title": "Nome do sacado",
            "type": "string",
            "default": "", 
            "maxLength": 36
          },
          "complemento": {
            "title": "Identificador do Complemento",
            "type": "string",
            "const": "",
            "maxLength": 1
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
            "maximum": 99999999.99999,
            "default": 0
          },
          "ioc": {
            "title": "Valor do IOC em outra unidade de valor",
            "type": "number",
            "multipleOf": 0.00001,
            "minimum": 0,
            "maximum": 99999999.99999,
            "default": 0
          },
          "saldo": {
            "title": "Valor do débito ou crédito",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "indicador": {
            "title": "Indicador de saldo",
            "type": "string",
            "enum": ['D', 'C'],
            "labels": ['DÉBITO', 'CRÉDITO'],
            "maxLength": 1
          },
          "brancos5": {
            "title": "Brancos",
            "type": "string",
            "const": "",
            "maxLength": 11
          },
          "versao": {
            "title": "Número da versão",
            "type": "integer",
            "const": dados => dados.header.versao,
            "maximum": 999
          },
          "indice": {
            "title": "Número sequencial do registro no arquivo",
            "type": "integer",
            "minimum": 1,
            "maximum": 999999,
            "const": (dados, linha) =>
              dados.registros.reduce((n, l, i) => l == linha ? i + 2 : n, 1)
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
        "codigo_uso": {
          "title": "Código da remessa",
          "type": "integer",
          "const": 2
        },
        "codigo_servico": {
          "title": "Código do serviço",
          "type": "integer",
          "const": 1,
          "maximum": 99
        },
        "codigo_banco": {
          "title": "Código do Banco",
          "type": "integer",
          "const": 33,
          "maximum": 999
        },
        "brancos1": {
          "title": "Brancos",
          "type": "string",
          "const": "",
          "maxLength": 10
        },
        "simples_qtde": {
          "title": "Quantidade de registros em cobrança simples referente ao cedente",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999999,
          "default": 0
        },
        "simples_total": {
          "title": "Valor dos títulos em cobrança simples referente ao cedente",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 999999999999.99,
          "default": 0
        },
        "simples_aviso": {
          "title": "Número do aviso da cobrança simples",
          "type": "string",
          "maxLength": 8,
          "default": ""
        },
        "brancos2": {
          "title": "Brancos",
          "type": "string",
          "const": "",
          "maxLength": 50
        },
        "caucinonada_qtde": {
          "title": "Quantidade de registros em cobrança caucionada referente ao cedente",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999999,
          "default": 0
        },
        "caucionada_total": {
          "title": "Valor dos títulos em cobrança caucionada referente ao cedente",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 999999999999.99,
          "default": 0
        },
        "caucionada_aviso": {
          "title": "Número do aviso da cobrança caucionada",
          "type": "string",
          "maxLength": 8,
          "default": ""
        },
        "brancos3": {
          "title": "Brancos",
          "type": "string",
          "const": "",
          "maxLength": 10
        },
        "descontada_qtde": {
          "title": "Quantidade de registros em cobrança descontada referente ao cedente",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999999,
          "default": 0
        },
        "descontada_total": {
          "title": "Valor dos títulos em cobrança descontada referente ao cedente",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 999999999999.99,
          "default": 0
        },
        "descontada_aviso": {
          "title": "Número do aviso da cobrança descontada",
          "type": "string",
          "maxLength": 8,
          "default": ""
        },
        "brancos4": {
          "title": "Brancos",
          "type": "string",
          "const": "",
          "maxLength": 224
        },
        "versao": {
          "title": "Número da versão",
          "type": "integer",
          "const": dados => dados.header.versao,
          "maximum": 999
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
