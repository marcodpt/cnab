import bancos from '../bancos.js'
import carteiras from '../bradesco/carteiras.js'
import especies from '../bradesco/especies.js'
import liquidacoes from '../bradesco/liquidacoes.js'
import {retorno as ocorrencias} from '../bradesco/ocorrencias.js'
import servicos from '../bradesco/servicos.js'

export default {
  "title": "Retorno Bradesco Cobrança",
  "description": "Layout para retorno de cobrança Bradesco CNAB 400",
  "type": "object",
  "properties": {
    "header": {
      "type": "object",
      "properties": {
        "tipo": {
          "title": "Tipo de registro",
          "type": "integer",
          "const": 0
        },
        "codigo_uso": {
          "title": "Código de retorno",
          "type": "integer",
          "const": 2
        },
        "uso": {
          "title": "Literal de retorno",
          "type": "string",
          "const": "RETORNO"
        },
        "codigo_servico": {
          "title": "Código do serviço",
          "type": "string",
          "enum": Object.keys(servicos),
          "maxLength": 2
        },
        "servico": {
          "title": "Literal de serviço",
          "type": "string",
          "enum": Object.values(servicos),
          "maxLength": 15
        },
        "agencia": {
          "title": "Agência",
          "type": "integer",
          "minimum": 0,
          "maximum": 9999,
          "default": 0
        },
        "zeros1": {
          "title": "Zeros",
          "type": "integer",
          "const": 0,
          "maximum": 99
        },
        "conta": {
          "title": "Conta",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999,
          "default": 0
        },
        "dac": {
          "title": "Dígito",
          "type": "integer",
          "minimum": 0,
          "maximum": 9,
          "default": 0
        },
        "brancos1": {
          "title": "Brancos",
          "type": "string",
          "const": "",
          "maxLength": 8
        },
        "empresa": {
          "title": "Nome da empresa",
          "type": "string",
          "minLength": 0,
          "maxLength": 30,
          "default": ""
        },
        "codigo_banco": {
          "title": "Código do banco",
          "type": "integer",
          "const": 341
        },
        "banco": {
          "title": "Nome do banco",
          "type": "string",
          "const": "BANCO ITAU S.A."
        },
        "geracao": {
          "title": "Data de geração",
          "type": "string",
          "format": "date6",
          "default": ""
        },
        "densidade": {
          "title": "Densidade",
          "type": "string",
          "maxLength": 5,
          "default": ""
        },
        "unidade": {
          "title": "Unidade de densidade",
          "type": "string",
          "enum": ["BPI", ""],
          "maxLength": 3
        },
        "sequencia": {
          "title": "Nº seq. arquivo ret",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999,
          "default": 0
        },
        "credito": {
          "title": "Data de crédito",
          "type": "string",
          "format": "date6",
          "default": ""
        },
        "brancos2": {
          "title": "Brancos",
          "type": "string",
          "const": "",
          "maxLength": 275
        },
        "indice": {
          "title": "Número seqüencial",
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
            "title": "Tipo de registro",
            "type": "integer",
            "const": 1
          },
          "cod_inscricao": {
            "title": "Código de inscrição",
            "type": "string",
            "enum": ['01', '02'],
            "labels": ['CPF', 'CNPJ'],
            "maxLength": 2
          },
          "inscricao": {
            "title": "Número de inscrição",
            "type": "string",
            "pattern": "^\d{14}$",
            "default": "00000000000000",
            "minLength": 14,
            "maxLength": 14
          },
          "agencia": {
            "title": "Agência",
            "type": "integer",
            "minimum": 0,
            "maximum": 9999,
            "default": 0
          },
          "zeros1": {
            "title": "Zeros",
            "type": "integer",
            "const": 0,
            "maximum": 99
          },
          "conta": {
            "title": "Conta",
            "type": "integer",
            "minimum": 0,
            "maximum": 99999,
            "default": 0
          },
          "dac": {
            "title": "Dígito",
            "type": "integer",
            "minimum": 0,
            "maximum": 9,
            "default": 0
          },
          "brancos1": {
            "title": "Brancos",
            "type": "string",
            "default": "",
            "maxLength": 8 
          },
          "uso_empresa": {
            "title": "Uso da empresa",
            "type": "string",
            "maxLength": 25,
            "default": ""
          },
          "id_banco": {
            "title": "Nosso número",
            "type": "integer",
            "minimum": 0,
            "maximum": 99999999,
            "default": 0
          },
          "brancos2": {
            "title": "Brancos",
            "type": "string",
            "const": "",
            "maxLength": 12
          },
          "carteira": {
            "title": "Carteira",
            "type": "string",
            "enum": Object.keys(carteiras),
            "labels": Object.values(carteiras),
            "maxLength": 3
          },
          "id_banco2": {
            "title": "Nosso número",
            "type": "integer",
            "minimum": 0,
            "maximum": 99999999,
            "default": 0,
            "const": (dados, linha) => linha.id_banco
          },
          "dac_banco": {
            "title": "DAC nosso número",
            "type": "integer",
            "minimum": 0,
            "maximum": 9,
            "default": 0
          },
          "brancos3": {
            "title": "Brancos",
            "type": "string",
            "const": "",
            "maxLength": 13
          },
          "cod_carteira": {
            "title": "Carteira",
            "type": "string",
            "enum": ['I', 'E', 'R'],
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
            "title": "Data de ocorrência",
            "type": "string",
            "format": "date6",
            "default": ""
          },
          "titulo": {
            "title": "Nº do documento",
            "type": "string",
            "default": "",
            "maxLength": 10
          },
          "id_banco3": {
            "title": "Nosso número",
            "type": "integer",
            "minimum": 0,
            "maximum": 99999999,
            "default": 0,
            "const": (dados, linha) => linha.id_banco
          },
          "brancos4": {
            "title": "Brancos",
            "type": "string",
            "const": "",
            "maxLength": 12
          },
          "vencimento": {
            "title": "Vencimento",
            "type": "string",
            "format": "date6",
            "default": ""
          },
          "valor": {
            "title": "Valor do título",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0.01,
            "maximum": 99999999999.99,
            "default": 0
          },
          "banco": {
            "title": "Código do banco",
            "type": "string",
            "enum": Object.keys(bancos),
            "labels": Object.values(bancos),
            "maxLength": 3
          },
          "cobradora": {
            "title": "Agência cobradora",
            "type": "integer",
            "default": 0,
            "maximum": 9999
          },
          "dac_cobradora": {
            "title": "DAC agência cobradora",
            "type": "integer",
            "default": 0,
            "maximum": 9
          },
          "especie": {
            "title": "Espécie",
            "type": "string",
            "enum": Object.keys(especies),
            "labels": Object.values(especies),
            "maxLength": 2
          },
          "tarifa": {
            "title": "Tarifa de cobrança (R$)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "zeros2": {
            "title": "Zeros",
            "type": "integer",
            "const": 0,
            "maximum": 9999999999999
          },
          "zeros3": {
            "title": "Zeros",
            "type": "integer",
            "const": 0,
            "maximum": 9999999999999
          },
          "iof": {
            "title": "Valor do IOF (R$)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "abatimento": {
            "title": "Valor abatimento (R$)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "descontos": {
            "title": "Descontos (R$)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "principal": {
            "title": "Valor principal (R$)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "juros": {
            "title": "Juros de mora/multa (R$)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "outros": {
            "title": "Outros créditos (R$)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "dda": {
            "title": "Boleto DDA",
            "type": "string",
            "enum": ["", "1"],
            "labels": [
              "Não é boleto dda (sacado não aderiu ao dda até o momento)",
              "Boleto dda (sacado aderiu ao dda em ao menos um banco de relacionamento)"
            ],
            "maxLength": 1
          },
          "brancos5": {
            "title": "Brancos",
            "type": "string",
            "const": "",
            "maxLength": 2
          },
          "credito": {
            "title": "Data crédito",
            "type": "string",
            "format": "date6",
            "default": ""
          },
          "cancelada": {
            "title": "Instrução cancelada",
            "type": "integer",
            "maximum": 9999,
            "default": 0
          },
          "zeros4": {
            "title": "Zeros",
            "type": "integer",
            "const": 0,
            "maximum": 999999
          },
          "zeros5": {
            "title": "Zeros",
            "type": "integer",
            "const": 0,
            "maximum": 9999999999999
          },
          "nome": {
            "title": "Nome do sacado",
            "type": "string",
            "default": "",
            "maxLength": 30
          },
          "brancos6": {
            "title": "Brancos",
            "type": "string",
            "const": "",
            "maxLength": 23
          },
          "erros": {
            "title": "Erros / mensagem informativa",
            "type": "string",
            "default": "",
            "maxLength": 8
          },
          "brancos7": {
            "title": "Brancos",
            "type": "string",
            "const": "",
            "maxLength": 7
          },
          "liquidacao": {
            "title": "Código de liquidação",
            "type": "string",
            "enum": Object.keys(liquidacoes),
            "labels": Object.values(liquidacoes),
            "maxLength": 2
          },
          "indice": {
            "title": "Número seqüencial",
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
          "title": "Tipo de registro",
          "type": "integer",
          "const": 9
        },
        "codigo_uso": {
          "title": "Código de retorno",
          "type": "integer",
          "const": 2
        },
        "codigo_servico": {
          "title": "Código do serviço",
          "type": "string",
          "enum": Object.keys(servicos),
          "maxLength": 2
        },
        "codigo_banco": {
          "title": "Código do banco",
          "type": "integer",
          "const": 341
        },
        "brancos1": {
          "title": "Brancos",
          "type": "string",
          "const": "",
          "maxLength": 10
        },
        "simples_qtde": {
          "title": "Quantidade simples",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999999,
          "default": 0
        },
        "simples_total": {
          "title": "Total simples (R$)",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 999999999999.99,
          "default": 0
        },
        "simples_aviso": {
          "title": "Aviso simples",
          "type": "string",
          "maxLength": 8,
          "default": ""
        },
        "brancos2": {
          "title": "Brancos",
          "type": "string",
          "const": "",
          "maxLength": 10
        },
        "vinculada_qtde": {
          "title": "Quantidade vinculada",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999999,
          "default": 0
        },
        "vinculada_total": {
          "title": "Total vinculada (R$)",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 999999999999.99,
          "default": 0
        },
        "vinculada_aviso": {
          "title": "Aviso vinculada",
          "type": "string",
          "maxLength": 8,
          "default": ""
        },
        "brancos3": {
          "title": "Brancos",
          "type": "string",
          "const": "",
          "maxLength": 50
        },
        "zeros1": {
          "title": "Zeros",
          "type": "integer",
          "const": 0,
          "maximum": 999999999999999
        },
        "zeros2": {
          "title": "Zeros",
          "type": "integer",
          "const": 0,
          "maximum": 999999999999999
        },
        "brancos4": {
          "title": "Brancos",
          "type": "string",
          "const": "",
          "maxLength": 10
        },
        "escritural_qtde": {
          "title": "Quantidade direta/escritural",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999999,
          "default": 0
        },
        "escritural_total": {
          "title": "Total direta/escritural (R$)",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 999999999999.99,
          "default": 0
        },
        "escritural_aviso": {
          "title": "Aviso direta/escritural",
          "type": "string",
          "maxLength": 8,
          "default": ""
        },
        "sequencia": {
          "title": "Controle do arquivo",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999,
          "const": dados => dados.header.codigo_servico != '04' ?
            dados.header.sequencia : 0
        },
        "quantidade": {
          "title": "Quantidade de detalhes",
          "type": "integer",
          "minimum": 1,
          "maximum": 99999999,
          "const": dados => dados.registros.length
        },
        "total": {
          "title": "Total (R$)",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 999999999999.99,
          "const": dados => dados.registros.reduce(
            (total, linha) => total + linha.valor
          , 0).toFixed(2)
        },
        "brancos5": {
          "title": "Brancos",
          "type": "string",
          "const": "",
          "maxLength": 160
        },
        "indice": {
          "title": "Número seqüencial",
          "type": "integer",
          "minimum": 1,
          "maximum": 999999,
          "const": dados => dados.registros.length + 2
        }
      }
    }
  }
}
