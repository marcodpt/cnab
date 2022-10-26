import bancos from '../bancos.js'
import especies from '../bradesco/especies.js'
import origens from '../bradesco/origens.js'
import {retorno as ocorrencias} from '../bradesco/ocorrencias.js'
import {hoje} from '../lib.js'

export default {
  "title": "Retorno Bradesco Cobrança",
  "description": "Layout para retorno de cobrança Bradesco CNAB 400",
  "type": "object",
  "properties": {
    "header": {
      "type": "object",
      "properties": {
        "tipo": {
          "title": "Identificação do Registro",
          "type": "integer",
          "const": 0
        },
        "codigo_uso": {
          "title": "Identificação do Arquivo-Retorno",
          "type": "integer",
          "const": 2
        },
        "uso": {
          "title": "Literal Retorno",
          "type": "string",
          "const": "RETORNO"
        },
        "codigo_servico": {
          "title": "Código do Serviço",
          "type": "integer",
          "const": 1,
          "maximum": 99
        },
        "servico": {
          "title": "Literal Serviço",
          "type": "string",
          "enum": "COBRANCA",
          "maxLength": 15
        },
        "codigo_empresa": {
          "title": "Código da Empresa",
          "type": "string",
          "default": "",
          "maxLength": 20
        },
        "nome": {
          "title": "Nome da Empresa por Extenso",
          "description": "Razão Social",
          "type": "string",
          "maxLength": 30,
          "default": ""
        },
        "codigo_banco": {
          "title": "Nº do Bradesco na Câmara Compensação",
          "type": "integer",
          "const": 237
        },
        "banco": {
          "title": "Nome do Banco por Extenso",
          "type": "string",
          "const": "BRADESCO",
          "maxLength": 15
        },
        "geracao": {
          "title": "Data da Gravação do Arquivo",
          "type": "string",
          "format": "date6",
          "default": ""
        },
        "densidade": {
          "title": "Densidade de Gravação",
          "type": "string",
          "maxLength": 8,
          "const": "01600000"
        },
        "sequencia": {
          "title": "Nº Aviso Bancário",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999,
          "default": 0
        },
        "brancos1": {
          "title": "Brancos",
          "type": "string",
          "const": "",
          "maxLength": 266
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
          "maxLength": 9
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
            "title": "Identificação do Registro",
            "type": "integer",
            "const": 1
          },
          "cod_inscricao": {
            "title": "Tipo de Inscrição Empresa",
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
          "zeros1": {
            "title": "Zeros",
            "type": "integer",
            "const": 0,
            "maximum": 999
          },
          "id_empresa": {
            "title": "Identificação da Empresa Beneficiária no Banco",
            "type": "string",
            "default": "",
            "maxLength": 17
          },
          "uso_empresa": {
            "title": "Nº Controle do Participante",
            "type": "string",
            "default": "",
            "maxLength": 25
          },
          "zeros2": {
            "title": "Zeros",
            "type": "integer",
            "const": 0,
            "maximum": 99999999
          },
          "id_banco": {
            "title": "Identificação do Título no Banco",
            "type": "string",
            "default": "",
            "maxLength": 12
          },
          "zeros3": {
            "title": "Uso do Banco",
            "type": "integer",
            "const": 0,
            "maximum": 9999999999
          },
          "zeros4": {
            "title": "Uso do Banco",
            "type": "integer",
            "const": 0,
            "maximum": 999999999999
          },
          "rateio": {
            "title": "Indicador de Rateio Crédito",
            "type": "string",
            "enum": ["0", "R", ""],
            "labels": ["Sem rateio", "Com rateio", ""],
            "default": " ",
            "maxLength": 1
          },
          "parcial": {
            "title": "Pagamento Parcial",
            "type": "string",
            "default": "00",
            "maxLength": 2
          },
          "carteira": {
            "title": "Carteira",
            "type": "integer",
            "default": 0,
            "maximum": 9
          },
          "ocorrencia": {
            "title": "Identificação de Ocorrência",
            "type": "string",
            "default": "01",
            "maxLength": 2,
            "enum": Object.keys(ocorrencias),
            "labels": Object.values(ocorrencias)
          },
          "data": {
            "title": "Data Ocorrência no Banco",
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
          "codigo_empresa": {
            "title": "Código da Empresa",
            "type": "string",
            "default": "",
            "maxLength": 20
          },
          "vencimento": {
            "title": "Data Vencimento do Título",
            "type": "string",
            "format": "date6",
            "default": hoje()
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
            "title": "Despesas de cobrança para os Códigos de Ocorrência: 02 - Entradas Confirmadas, 28 - Débitos de TarifasTarifa de cobrança (R$)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "protesto": {
            "title": "Outras Despesas Custas de Protesto",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "juros": {
            "title": "Juros Operação em Atraso",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "iof": {
            "title": "IOF Devido",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "abatimento": {
            "title": "Abatimento Concedido sobre o Título",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "descontos": {
            "title": "Desconto Concedido",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "principal": {
            "title": "Valor Pago",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "mora": {
            "title": "Juros de Mora",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "outros": {
            "title": "Outros Créditos",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "brancos1": {
            "title": "Brancos",
            "type": "string",
            "const": "",
            "maxLength": 2
          },
          "motivo": {
            "title": "Motivo do Código de Ocorrência",
            "type": "string",
            "enum": ["A", "D", ""],
            "labels": [
              "Aceito",
              "Desprezado",
              ""
            ],
            "maxLength": 1
          },
          "credito": {
            "title": "Data do Crédito",
            "type": "string",
            "format": "date6",
            "default": ""
          },
          "origem": {
            "title": "Origem Pagamento",
            "type": "string",
            "enum": Object.keys(origens),
            "labels": Object.values(origens),
            "maxLength": 3,
            "default": ""
          },
          "brancos2": {
            "title": "Brancos",
            "type": "string",
            "const": "",
            "maxLength": 10
          },
          "cod_banco": {
            "title": "Código do banco",
            "type": "string",
            "default": "",
            "maxLength": 4
          },
          "cancelada": {
            "title": "Motivos das Rejeições para os Códigos de Ocorrência das Posições 109 a 110",
            "type": "string",
            "default": "", 
            "maxLength": 10
          },
          "brancos3": {
            "title": "Brancos",
            "type": "string",
            "const": "",
            "maxLength": 40
          },
          "cartorio": {
            "title": "Número do Cartório",
            "type": "string",
            "default": "",
            "maxLength": 2
          },
          "protocolo": {
            "title": "Número do Protocolo",
            "type": "string",
            "default": "", 
            "maxLength": 10
          },
          "brancos4": {
            "title": "Brancos",
            "type": "string",
            "const": "",
            "maxLength": 14
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
          "title": "Identificação do Registro",
          "type": "integer",
          "const": 9
        },
        "codigo_uso": {
          "title": "Identificação do Retorno",
          "type": "integer",
          "const": 2
        },
        "codigo_servico": {
          "title": "Identificação Tipo de Registro",
          "type": "string",
          "const": "01"
        },
        "codigo_banco": {
          "title": "Código do Banco",
          "type": "integer",
          "const": 237
        },
        "brancos1": {
          "title": "Brancos",
          "type": "string",
          "const": "",
          "maxLength": 10
        },
        "cobranca_qtde": {
          "title": "Quantidade de Títulos em Cobrança",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999999,
          "default": 0
        },
        "cobranca_total": {
          "title": "Valor Total em Cobrança",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 999999999999.99,
          "default": 0
        },
        "cobranca_aviso": {
          "title": "Nº do Aviso Bancário",
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
        "entradas_qtde": {
          "title": "Quantidade de Registros- Ocorrência 02 - Confirmação de Entradas",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999,
          "default": 0
        },
        "entradas_total": {
          "title": "Valor dos Registros - Ocorrência 02 - Confirmação de Entradas",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 9999999999.99,
          "default": 0
        },
        "liquidacao_total": {
          "title": "Valor dos Registros-Ocorrência 06 - Liquidação",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 9999999999.99,
          "default": 0
        },
        "liquidacao_qtde": {
          "title": "Quantidade dos Registros - Ocorrência 06 - Liquidação",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999,
          "default": 0
        },
        "liquidacao_principal": {
          "title": "Valor dos Registros - Ocorrência 06",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 9999999999.99,
          "default": 0
        },
        "baixado_qtde": {
          "title": "Quantidade dos Registros - Ocorrência 09 e 10-Títulos baixados",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999,
          "default": 0
        },
        "baixado_total": {
          "title": "Valor dos Registros - Ocorrência 09 e 10 - Títulos Baixados",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 9999999999.99,
          "default": 0
        },
        "cancelado_qtde": {
          "title": "Quantidade de Registros - Ocorrência 13 - Abatimento Cancelado",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999,
          "default": 0
        },
        "cancelado_total": {
          "title": "Valor dos Registros - Ocorrência 13 - Abatimento Cancelado",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 9999999999.99,
          "default": 0
        },
        "vencimento_qtde": {
          "title": "Quantidade dos Registros - Ocorrência 14 - Vencimento Alterado",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999,
          "default": 0
        },
        "vencimento_total": {
          "title": "Valor dos Registros - Ocorrência 14 - Vencimento Alterado",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 9999999999.99,
          "default": 0
        },
        "abatimento_qtde": {
          "title": "Quantidade dos Registros- Ocorrência 12 - Abatimento Concedido",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999,
          "default": 0
        },
        "abatimento_total": {
          "title": "Valor dos Registros - Ocorrência 12 - Abatimento Concedido",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 9999999999.99,
          "default": 0
        },
        "protesto_qtde": {
          "title": "Quantidade dos Registros-Ocorrência 19-Confirmação da Instrução Protesto",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999,
          "default": 0
        },
        "protesto_total": {
          "title": "Valor dos Registros - Ocorrência 19 - Confirmação da Instrução de Protesto",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 9999999999.99,
          "default": 0
        },
        "brancos3": {
          "title": "Brancos",
          "type": "string",
          "const": "",
          "maxLength": 174
        },
        "rateio_total": {
          "title": "Valor Total dos Rateios Efetuados",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 9999999999999.99,
          "default": 0
        },
        "rateio_qtde": {
          "title": "Quantidade Total dos Rateios Efetuados",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999999,
          "default": 0
        },
        "brancos4": {
          "title": "Brancos",
          "type": "string",
          "const": "",
          "maxLength": 9
        },
        "indice": {
          "title": "Número seqüencial do Registro",
          "type": "integer",
          "minimum": 1,
          "maximum": 999999,
          "const": dados => dados.registros.length + 2
        }
      }
    }
  }
}
