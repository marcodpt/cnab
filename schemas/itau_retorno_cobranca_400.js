import bancos from '../bancos.js'
import carteiras from '../itau/carteiras.js'
import especies from '../itau/especies.js'
import liquidacoes from '../itau/liquidacoes.js'
import {retorno as ocorrencias} from '../itau/ocorrencias.js'

export default {
  "title": "Retorno Itaú Cobrança",
  "description": "Layout para retorno de cobrança Itaú CNAB 400",
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
          "title": "Código de retorno",
          "description": "Identificação do arquivo retorno",
          "type": "integer",
          "const": 2
        },
        "uso": {
          "title": "Literal de retorno",
          "description": "Identificação por extenso do tipo de movimento",
          "type": "string",
          "const": "RETORNO"
        },
        "codigo_servico": {
          "title": "Código do serviço",
          "description": "Identificação do tipo de serviço",
          "type": "integer",
          "maximum": 99,
          "const": 1
        },
        "servico": {
          "title": "Literal de serviço",
          "description": "Identificação por extenso do tipo de serviço",
          "type": "string",
          "const": "COBRANCA",
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
        "zeros1": {
          "title": "Zeros",
          "description": "Complemento de registro",
          "type": "integer",
          "const": 0,
          "maximum": 99
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
        "brancos1": {
          "title": "Brancos",
          "description": "Complemento de registro",
          "type": "string",
          "const": "",
          "maxLength": 8
        },
        "empresa": {
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
          "default": ""
        },
        "densidade": {
          "title": "Densidade",
          "description": "Densidade de gravação do arquivo",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999,
          "default": 0
        },
        "unidade": {
          "title": "Unidade de densidade",
          "type": "string",
          "const": "BPI"
        },
        "sequencia": {
          "title": "Nº seq. arquivo ret",
          "description": "Número seqüencial do arquivo retorno",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999,
          "default": 0
        },
        "credito": {
          "title": "Data de crédito",
          "description": "Data de crédito dos lançamentos",
          "type": "string",
          "format": "date6",
          "default": ""
        },
        "brancos2": {
          "title": "Brancos",
          "description": "Complemento de registro",
          "type": "string",
          "const": "",
          "maxLength": 275
        },
        "indice": {
          "title": "Número seqüencial",
          "description": "Número seqüencial do registro no arquivo",
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
          "agencia": {
            "title": "Agência",
            "description": "Agência mantedora da conta",
            "type": "integer",
            "minimum": 0,
            "maximum": 9999
          },
          "zeros1": {
            "title": "Zeros",
            "description": "Complemento de registro",
            "type": "integer",
            "const": 0,
            "maximum": 99
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
          "brancos1": {
            "title": "Brancos",
            "description": "Complemento de registro",
            "type": "string",
            "const": "",
            "maxLength": 8 
          },
          "uso_empresa": {
            "title": "Uso da empresa",
            "description": "Identificação do título na empresa",
            "type": "string",
            "maxLength": 25,
            "default": ""
          },
          "id_banco": {
            "title": "Nosso número",
            "description": "Identificação do título no banco",
            "type": "integer",
            "minimum": 0,
            "maximum": 99999999,
            "default": 0
          },
          "brancos2": {
            "title": "Brancos",
            "description": "Complemento de registro",
            "type": "string",
            "const": "",
            "maxLength": 12
          },
          "carteira": {
            "title": "Carteira",
            "description": "Numero da carteira",
            "type": "string",
            "enum": Object.keys(carteiras),
            "labels": Object.values(carteiras),
            "maxLength": 3
          },
          "id_banco2": {
            "title": "Nosso número",
            "description": "Identificação do título no banco",
            "type": "integer",
            "minimum": 0,
            "maximum": 99999999,
            "default": 0,
            "const": (dados, linha) => linha.id_banco
          },
          "dac_banco": {
            "title": "DAC nosso número",
            "description": "DAC do nosso número",
            "type": "integer",
            "minimum": 0,
            "maximum": 99999999,
            "default": 0
          },
          "brancos3": {
            "title": "Brancos",
            "description": "Complemento de registro",
            "type": "string",
            "const": "",
            "maxLength": 6
          },
          "cod_carteira": {
            "title": "Carteira",
            "description": "Código da carteira",
            "type": "string",
            "enum": ['I', 'E'],
            "labels": ['Real', 'Dólar'],
            "maxLength": 1
          },
          "ocorrencia": {
            "title": "Código de ocorrência",
            "description": "Identificação da ocorrência",
            "type": "string",
            "enum": Object.keys(ocorrencias),
            "labels": Object.values(ocorrencias),
            "maxLength": 2
          },
          "data": {
            "title": "Data de ocorrência",
            "description": "Data de ocorrência no banco",
            "type": "string",
            "format": "date6",
            "default": ""
          },
          "titulo": {
            "title": "Nº do documento",
            "description": "Nº do documento de cobrança (dupl, np etc)",
            "type": "string",
            "default": "",
            "maxLength": 10
          },
          "id_banco3": {
            "title": "Nosso número",
            "description": "Confirmação do número do título no banco",
            "type": "integer",
            "minimum": 0,
            "maximum": 99999999,
            "default": 0,
            "const": (dados, linha) => linha.id_banco
          },
          "brancos4": {
            "title": "Brancos",
            "description": "Complemento de registro",
            "type": "string",
            "const": "",
            "maxLength": 12
          },
          "vencimento": {
            "title": "Vencimento",
            "description": "Data de vencimento do título",
            "type": "string",
            "format": "date6",
            "default": ""
          },
          "valor": {
            "title": "Valor do título",
            "description": "Valor nominal do título",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0.01,
            "maximum": 99999999999.99,
            "default": 0
          },
          "banco": {
            "title": "Código do banco",
            "description": "Número do banco na câmara de compensação",
            "type": "string",
            "enum": Object.keys(bancos),
            "labels": Object.values(bancos),
            "maxLength": 3
          },
          "cobradora": {
            "title": "Agência cobradora",
            "description": "Agência cobradora, de liquidação ou baixa",
            "type": "integer",
            "default": 0,
            "maximum": 9999
          },
          "dac_cobradora": {
            "title": "DAC agência cobradora",
            "description": "DAC da agência cobradora",
            "type": "integer",
            "default": 0,
            "maximum": 9
          },
          "especie": {
            "title": "Espécie",
            "description": "Espécie do título",
            "type": "string",
            "enum": Object.keys(especies),
            "labels": Object.values(especies),
            "maxLength": 2
          },
          "tarifa": {
            "title": "Tarifa de cobrança (R$)",
            "description": "Valor da despesa de cobrança",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "zeros2": {
            "title": "Zeros",
            "description": "Complemento de registro",
            "type": "integer",
            "const": 0,
            "maximum": 9999999999999
          },
          "zeros3": {
            "title": "Zeros",
            "description": "Complemento de registro",
            "type": "integer",
            "const": 0,
            "maximum": 9999999999999
          },
          "iof": {
            "title": "Valor do IOF (R$)",
            "description": "Valor do iof a ser recolhido (notas seguro)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "abatimento": {
            "title": "Valor abatimento (R$)",
            "description": "Valor do abatimento concedido",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "descontos": {
            "title": "Descontos (R$)",
            "description": "Valor do desconto concedido",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "principal": {
            "title": "Valor principal (R$)",
            "description": "Valor lançado em conta corrente",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "juros": {
            "title": "Juros de mora/multa (R$)",
            "description": "Valor de mora e multa pagos pelo sacado",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "outros": {
            "title": "Outros créditos (R$)",
            "description": "Valor de outros créditos",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "dda": {
            "title": "Boleto DDA",
            "description": "Indicador de boleto DDA",
            "type": "string",
            //"enum": ["0", "1"],
            "labels": [
              "Não é boleto dda (sacado não aderiu ao dda até o momento)",
              "Boleto dda (sacado aderiu ao dda em ao menos um banco de relacionamento)"
            ],
            "maxLength": 1
          },
          "brancos5": {
            "title": "Brancos",
            "description": "Complemento de registro",
            "type": "string",
            "const": "",
            "maxLength": 2
          },
          "credito": {
            "title": "Data crédito",
            "description": "Data de crédito desta liquidação",
            "type": "string",
            "format": "date6",
            "default": ""
          },
          "cancelada": {
            "title": "Instrução cancelada",
            "description": "Código da instrução cancelada",
            "type": "integer",
            "maximum": 9999,
            "default": 0
          },
          "zeros4": {
            "title": "Zeros",
            "description": "Complemento de registro",
            "type": "integer",
            "const": 0,
            "maximum": 999999
          },
          "zeros5": {
            "title": "Zeros",
            "description": "Complemento de registro",
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
            "description": "Complemento de registro",
            "type": "string",
            "const": "",
            "maxLength": 23
          },
          "erros": {
            "title": "Erros / mensagem informativa",
            "description": "Registros rejeitados ou alegação do sacado ou registro de mesagem informativa",
            "type": "string",
            "default": "",
            "maxLength": 8
          },
          "brancos7": {
            "title": "Brancos",
            "description": "Complemento de registro",
            "type": "string",
            "const": "",
            "maxLength": 7
          },
          "liquidacao": {
            "title": "Código de liquidação",
            "description": "Meio pelo qual o título foi liquidado",
            "type": "string",
            "enum": Object.keys(liquidacoes),
            "labels": Object.values(liquidacoes),
            "maxLength": 2
          },
          "indice": {
            "title": "Número seqüencial",
            "description": "Número seqüencial do registro no arquivo",
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
          "description": "Identificação do registro trailer",
          "type": "integer",
          "const": 9
        },
        "codigo_uso": {
          "title": "Código de retorno",
          "description": "Identificação de arquivo retorno",
          "type": "integer",
          "const": 2
        },
        "codigo_servico": {
          "title": "Código do serviço",
          "description": "Identificação do tipo de serviço",
          "type": "integer",
          "const": 1,
          "maximum": 99
        },
        "codigo_banco": {
          "title": "Código do banco",
          "description": "Identificação do banco na compensação",
          "type": "integer",
          "const": 341
        },
        "brancos1": {
          "title": "Brancos",
          "description": "Complemento de registro",
          "type": "string",
          "const": "",
          "maxLength": 10
        },
        "simples_qtde": {
          "title": "Quantidade simples",
          "description": "Quantidade de títulos em cobrança simples",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999999,
          "default": 0
        },
        "simples_total": {
          "title": "Total simples (R$)",
          "description": "Valor total dos títulos em cobrança simples",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 999999999999.99,
          "default": 0
        },
        "simples_aviso": {
          "title": "Aviso simples",
          "description": "Referência do aviso bancário dos títulos em cobrança simples",
          "type": "string",
          "maxLength": 8,
          "default": ""
        },
        "brancos2": {
          "title": "Brancos",
          "description": "Complemento de registro",
          "type": "string",
          "const": "",
          "maxLength": 10
        },
        "vinculada_qtde": {
          "title": "Quantidade vinculada",
          "description": "Quantidade de títulos em cobrança vinculada",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999999,
          "default": 0
        },
        "vinculada_total": {
          "title": "Total vinculada (R$)",
          "description": "Valor total dos títulos em cobrança vinculada",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 999999999999.99,
          "default": 0
        },
        "vinculada_aviso": {
          "title": "Aviso vinculada",
          "description": "Referência do aviso bancário dos títulos em cobrança vinculada",
          "type": "string",
          "maxLength": 8,
          "default": ""
        },
        "brancos3": {
          "title": "Brancos",
          "description": "Complemento de registro",
          "type": "string",
          "const": "",
          "maxLength": 50
        },
        "zeros1": {
          "title": "Zeros",
          "description": "Complemento de registro",
          "type": "integer",
          "const": 0,
          "maximum": 99999999999999
        },
        "zeros2": {
          "title": "Zeros",
          "description": "Complemento de registro",
          "type": "integer",
          "const": 0,
          "maximum": 99999999999999
        },
        "zeros3": {
          "title": "Zeros",
          "description": "Complemento de registro",
          "type": "integer",
          "const": 0,
          "maximum": 999999999999
        },
        "escritural_qtde": {
          "title": "Quantidade direta/escritural",
          "description": "Quantidade de títulos em cobrança direta/escritural",
          "type": "integer",
          "minimum": 0,
          "maximum": 99999999,
          "default": 0
        },
        "escritural_total": {
          "title": "Total direta/escritural (R$)",
          "description": "Valor total dos títulos em cobrança direta/escritural",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 999999999999.99,
          "default": 0
        },
        "escritural_aviso": {
          "title": "Aviso direta/escritural",
          "description": "Referência do aviso bancário dos títulos em cobrança direta/escritural",
          "type": "string",
          "maxLength": 8,
          "default": ""
        },
        "sequencia": {
          "title": "Controle do arquivo",
          "description": "Número seqüencial do arquivo retorno",
          "type": "integer",
          "minimum": 1,
          "maximum": 99999,
          "const": dados => dados.header.sequencia
        },
        "quantidade": {
          "title": "Quantidade de detalhes",
          "description": "Quantidade de registros de transação",
          "type": "integer",
          "minimum": 1,
          "maximum": 99999999,
          "const": dados => dados.registros.length
        },
        "total": {
          "title": "Total (R$)",
          "description": "Valor dos títulos informados no arquivo",
          "type": "number",
          "multipleOf": 0.01,
          "minimum": 0,
          "maximum": 999999999999.99,
          "const": dados => dados.registros.reduce(
            (total, linha) => total + linha.valor
          , 0).toFixed(2)
        },
        "brancos4": {
          "title": "Brancos",
          "description": "Complemento de registro",
          "type": "string",
          "const": "",
          "maxLength": 160
        },
        "indice": {
          "title": "Número seqüencial",
          "description": "Número seqüencial do registro no arquivo",
          "type": "integer",
          "minimum": 1,
          "maximum": 999999,
          "const": dados => dados.registros.length + 2
        }
      }
    }
  }
}
