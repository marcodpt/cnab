import {remessa as ocorrencias} from '../bradesco/ocorrencias.js'
import especies from '../bradesco/especies.js'
import {hoje} from '../lib.js'

export default {
  "title": "Remessa Bradesco Cobrança",
  "description": "Layout para envio de cobrança Bradesco CNAB 400",
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
          "title": "Identificação do Arquivo-Remessa",
          "type": "integer",
          "const": 1
        },
        "uso": {
          "title": "Literal Remessa",
          "type": "string",
          "const": "REMESSA"
        },
        "codigo_servico": {
          "title": "Código de Serviço",
          "type": "string",
          "const": "01",
          "maxLength": 2
        },
        "servico": {
          "title": "Literal Serviço",
          "type": "string",
          "const": "COBRANCA",
          "maxLength": 15
        },
        "codigo_empresa": {
          "title": "Código da Empresa",
          "type": "string",
          "default": "",
          "maxLength": 20
        },
        "nome": {
          "title": "Nome da Empresa",
          "description": "Razão Social",
          "type": "string",
          "maxLength": 30,
          "default": ""
        },
        "codigo_banco": {
          "title": "Número do Bradesco na Câmara de Compensação",
          "type": "integer",
          "const": 237
        },
        "banco": {
          "title": "Nome do Banco por Extenso",
          "type": "string",
          "maxLength": 15,
          "const": "BRADESCO"
        },
        "geracao": {
          "title": "Data da Gravação do Arquivo",
          "type": "string",
          "format": "date6",
          "default": hoje()
        },
        "brancos1": {
          "title": "Branco",
          "type": "string",
          "maxLength": 8,
          "const": ""
        },
        "sistema": {
          "title": "Identificação do Sistema",
          "type": "string",
          "maxLength": 2,
          "const": "MX"
        },
        "sequencia": {
          "title": "Nº Sequencial de Remessa",
          "type": "integer",
          "minimum": 1,
          "maximum": 9999999,
          "default": 1
        },
        "brancos2": {
          "title": "Branco",
          "type": "string",
          "maxLength": 277,
          "const": ""
        },
        "indice": {
          "title": "Nº Sequencial do Registro de Um em Um",
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
          "agencia": {
            "title": "Agência de Débito (opcional)",
            "type": "integer",
            "default": 0,
            "maximum": 99999
          },
          "dac_agencia": {
            "title": "Dígito da Agência de Débito (opcional)",
            "type": "string",
            "default": "",
            "maxLength": 1
          },
          "razao": {
            "title": "Razão da Conta-Corrente (opcional)",
            "type": "integer",
            "default": 0,
            "maximum": 99999
          },
          "conta": {
            "title": "Conta-Corrente (opcional)",
            "type": "integer",
            "default": 0,
            "maximum": 9999999
          },
          "dac_conta": {
            "title": "Dígito da Conta-Corrente (opcional)",
            "type": "string",
            "default": "",
            "maxLength": 1
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
          "codigo_banco": {
            "title": "Código do Banco a ser debitado na Câmara de Compensação",
            "type": "integer",
            "const": 0,
            "maximum": 999
          },
          "codigo_multa": {
            "title": "Campo de Multa",
            "type": "string",
            "enum": ['0', '2'],
            "labels": ['Sem multa', 'Considerar percentual de multa'],
            "default": "",
            "maxLength": 1
          },
          "multa": {
            "title": "Percentual de Multa",
            "type": "number",
            "default": 0,
            "multipleOf": 0.01,
            "maximum": 99.99
          },
          "id_banco": {
            "title": "Identificação do Título no Banco",
            "type": "string",
            "default": "",
            "maxLength": 12
          },
          "bonificacao": {
            "title": "Desconto Bonificação por dia",
            "type": "number",
            "default": 0,
            "multipleOf": 0.01,
            "maximum": 99999999.99
          },
          "papeleta": {
            "title": "Condição para Emissão da Papeleta de Cobrança",
            "type": "string",
            "enum": ["1", "2"],
            "labels": ["Banco", "Cliente"],
            "default": "1",
            "maxLength": 1
          },
          "automatico": {
            "title": "Ident. se emite Boleto para Débito Automático",
            "type": "string",
            "enum": ["N", "S", ""],
            "labels": ["Não", "Sim", ""],
            "default": "N",
            "maxLength": 1
          },
          "brancos": {
            "title": "Identificação da Operação do Banco",
            "type": "string",
            "default": "",
            "maxLength": 10
          },
          "rateio": {
            "title": "Indicador Rateio Crédito (opcional)",
            "type": "string",
            "enum": ["", "R"],
            "labels": ["Sem rateio", "Com rateio"],
            "default": " ",
            "maxLength": 1
          },
          "aviso": {
            "title": "Endereçamento para Aviso do Débito Automático em Conta-Corrente (opcional)",
            "type": "string",
            "enum": ['1', '2', ''],
            "labels": ["Emite", "Não emite", ""],
            "maxLength": 1
          },
          "parcelas": {
            "title": "Quantidade de Pagamentos",
            "type": "string",
            "default": "",
            "maxLength": 2
          },
          "ocorrencia": {
            "title": "Identificação da Ocorrência",
            "type": "string",
            "default": "01",
            "maxLength": 2,
            "enum": Object.keys(ocorrencias),
            "labels": Object.values(ocorrencias)
          },
          "documento": {
            "title": "Nº do Documento",
            "type": "string",
            "default": "",
            "maxLength": 10
          },
          "vencimento": {
            "title": "Data do Vencimento do Título",
            "type": "string",
            "format": "date6",
            "default": hoje()
          },
          "valor": {
            "title": "Valor do Título",
            "type": "number",
            "multipleOf": 0.01,
            "maximum": 99999999999.99,
            "default": 0
          },
          "zeros1": {
            "title": "Banco Encarregado da Cobrança",
            "type": "string",
            "const": "000"
          },
          "zeros2": {
            "title": "Agência Depositária",
            "type": "string",
            "const": "00000"
          },
          "especie": {
            "title": "Espécie de Título",
            "type": "string",
            "default": "01",
            "maxLength": 2,
            "enum": Object.keys(especies),
            "labels": Object.values(especies)
          },
          "identificacao": {
            "title": "Identificação",
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
            "title": "1ª Instrução",
            "type": "string",
            "default": "00",
            "maxLength": 2
          },
          "instrucao2": {
            "title": "2ª Instrução",
            "type": "string",
            "default": "00",
            "maxLength": 2
          },
          "atraso": {
            "title": "Valor a ser Cobrado por Dia de Atraso",
            "type": "number",
            "multipleOf": 0.01,
            "maximum": 99999999999.99,
            "default": 0
          },
          "limite": {
            "title": "Data Limite P/Concessão de Desconto",
            "type": "string",
            "maxLength": 6
          },
          "desconto": {
            "title": "Valor do Desconto",
            "type": "number",
            "multipleOf": 0.01,
            "maximum": 99999999999.99,
            "default": 0
          },
          "iof": {
            "title": "Valor do IOF",
            "type": "number",
            "multipleOf": 0.01,
            "maximum": 99999999999.99,
            "default": 0
          },
          "abatimento": {
            "title": "Valor do Abatimento a ser Concedido ou Cancelado",
            "type": "number",
            "multipleOf": 0.01,
            "maximum": 99999999999.99,
            "default": 0
          },
          "cod_inscricao": {
            "title": "Identificação do Tipo de Inscrição do Pagador",
            "type": "string",
            "enum": ['01', '02'],
            "labels": ['CPF', 'CNPJ'],
            "maxLength": 2
          },
          "inscricao": {
            "title": "Nº Inscrição do Pagador",
            "type": "integer",
            "default": 0,
            "maximum": 99999999999999
          },
          "nome": {
            "title": "Nome do Pagador",
            "type": "string",
            "default": "",
            "maxLength": 40
          },
          "endereco": {
            "title": "Endereço Completo",
            "type": "string",
            "default": "",
            "maxLength": 40
          },
          "mensagem1": {
            "title": "1ª Mensagem",
            "type": "string",
            "default": "",
            "maxLength": 12
          },
          "cep": {
            "title": "CEP",
            "type": "string",
            "default": "",
            "maxLength": 8
          },
          "mensagem2": {
            "title": "Beneficiário Final ou 2ª Mensagem",
            "type": "string",
            "default": "",
            "maxLength": 60
          },
          "indice": {
            "title": "Nº Sequencial do Registro",
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
          "title": "",
          "type": "integer",
          "const": 9
        },
        "brancos": {
          "title": "",
          "type": "string",
          "maxLength": 393,
          "const": ""
        },
        "indice": {
          "title": "",
          "type": "integer",
          "minimum": 1,
          "maximum": 999999,
          "const": dados => dados.registros.length + 2
        }
      }
    }
  }
}
