import carteiras from '../caixa/carteiras.js'
import {remessa as ocorrencias} from '../caixa/ocorrencias.js'
import especies from '../caixa/especies.js'
import aceites from '../caixa/aceites.js'
import instrucoes from '../caixa/instrucoes.js'
import servicos from '../caixa/servicos.js'
import uf from '../uf.js'
import {hoje} from '../lib.js'

export default {
  "title": "Remessa Caixa Cobrança",
  "description": "Layout para envio de cobrança Caixa CNAB 400",
  "type": "object",
  "properties": {
    "header": {
      "type": "object",
      "properties": {
        "tipo": {
          "title": "Código do Registro",
          "description": "Código Identificador do tipo de Registro no Arquivo",
          "type": "integer",
          "const": 0
        },
        "codigo_uso": {
          "title": "Código da Remessa",
          "description": "Código Identificador da Remessa para a CAIXA",
          "type": "integer",
          "const": 1
        },
        "uso": {
          "title": "Literal da Remessa",
          "description": "Literal Correspondente ao Código da Remessa",
          "type": "string",
          "const": "REMESSA"
        },
        "codigo_servico": {
          "title": "Código do Serviço",
          "description": "Código Identificador do Tipo de Serviço",
          "type": "string",
          "const": "01"
        },
        "servico": {
          "title": "Literal de Serviço",
          "description": "Literal Correspondente ao Código de Serviço",
          "type": "string",
          "const": "COBRANCA",
          "maxLength": 15
        },
        "agencia": {
          "title": "Código da Agência",
          "description": "Código da Agência de vinculação do Beneficiário",
          "type": "integer",
          "minimum": 0,
          "maximum": 9999,
          "default": 0
        },
        "codigo_empresa": {
          "title": "Código do Beneficiário",
          "description": "Código Identificador da Empresa na CAIXA",
          "type": "integer",
          "minimum": 0,
          "maximum": 9999999,
          "default": 0
        },
        "brancos1": {
          "title": "Uso Exclusivo",
          "description": "Uso Exclusivo CAIXA",
          "type": "string",
          "maxLength": 9,
          "const": ""
        },
        "nome": {
          "title": "Nome da Empresa",
          "description": "Nome por extenso da Empresa",
          "type": "string",
          "maxLength": 30,
          "default": ""
        },
        "codigo_banco": {
          "title": "Código do Banco",
          "description": "Código do Banco na Compensação",
          "type": "integer",
          "const": 104
        },
        "banco": {
          "title": "Nome do banco",
          "type": "string",
          "maxLength": 15,
          "const": "CAIXA"
        },
        "geracao": {
          "title": "Data de geração",
          "description": "Data de geração do arquivo",
          "type": "string",
          "format": "date6",
          "default": hoje()
        },
        "versao": {
          "title": "Data de geração",
          "description": "Data de geração do arquivo",
          "type": "integer",
          "default": 0,
          "maximum": 999
        },
        "brancos2": {
          "title": "Uso Exclusivo",
          "description": "Uso Exclusivo CAIXA",
          "type": "string",
          "maxLength": 286,
          "const": ""
        },
        "sequencia": {
          "title": "Nº Sequencial - A",
          "description": "Número Sequencial do Arquivo Remessa",
          "type": "integer",
          "minimum": 1,
          "maximum": 99999,
          "default": 1
        },
        "indice": {
          "title": "Nº Sequencial - B",
          "description": "Número Sequencial do Registro no Arquivo",
          "type": "integer",
          "const": 1,
          "maximum": 999999
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
            "type": "integer",
            "default": 0,
            "maximum": 99999999999999
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
          "brancos1": {
            "title": "Brancos",
            "description": "Complemento de registro",
            "type": "string",
            "maxLength": 4,
            "const": ""
          },
          "alegacao": {
            "title": "Alegação",
            "description": "Código instrução/alegação a ser cancelada",
            "type": "string",
            "default": "",
            "maxLength": 4
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
          "cambio": {
            "title": "Câmbio",
            "description": "Quantidade de moeda variável",
            "type": "number",
            "multipleOf": 0.00001,
            "minimum": 0,
            "maximum": 99999999.99999,
            "default": 0
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
          "uso_banco": {
            "title": "Uso do banco",
            "description": "Identificação da operação no banco",
            "type": "string",
            "maxLength": 21,
            "const": ""
          },
          "cod_carteira": {
            "title": "Carteira",
            "description": "Código da carteira",
            "type": "string",
            "enum": ['I', 'E', 'R'],
            "maxLength": 1
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
          "vencimento": {
            "title": "Data de Vencimento",
            "type": "string",
            "format": "date6",
            "default": hoje()
          },
          "valor": {
            "title": "Valor Nominal (R$)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "codigo_banco": {
            "title": "Código do banco",
            "description": "Identificação do banco na compensação",
            "type": "integer",
            "const": 341
          },
          "cobradora": {
            "title": "Agência cobradora",
            "description": "Agência onde o título será cobrado",
            "type": "integer",
            "minimum": 0,
            "maximum": 99999,
            "default": 0
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
          "emissao": {
            "title": "Data de Emissão",
            "type": "string",
            "format": "date6",
            "default": hoje()
          }, 
          "instrucao1": {
            "title": "Instrução 1",
            "description": "1ª instrução de cobrança",
            "type": "string",
            "enum": Object.keys(instrucoes),
            "labels": Object.values(instrucoes),
            "default": "02",
            "minLength": 2,
            "maxLength": 2
          }, 
          "instrucao2": {
            "title": "Instrução 2",
            "description": "2ª instrução de cobrança",
            "type": "string",
            "enum": Object.keys(instrucoes),
            "labels": Object.values(instrucoes),
            "default": "00",
            "minLength": 2,
            "maxLength": 2
          },
          "juros": {
            "title": "Juros de 1 dia (%)",
            "description": "Valor de mora por dia de atraso",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "limite": {
            "title": "Desconto até",
            "description": "Data limite para concessão de desconto",
            "type": "string",
            "maxLength": 6
          },
          "desconto": {
            "title": "Valor do desconto (R$)",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "iof": {
            "title": "Valor do IOF (R$)",
            "description": "Valor do IOF recolhido p/ notas seguro",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "abatimento": {
            "title": "Valor do abatimento (R$)",
            "description": "",
            "type": "number",
            "multipleOf": 0.01,
            "minimum": 0,
            "maximum": 99999999999.99,
            "default": 0
          },
          "cod_sacado": {
            "title": "Código de inscrição sacado",
            "description": "Identificação do tipo de inscrição/sacado",
            "type": "string",
            "enum": ['01', '02'],
            "labels": ['CPF', 'CNPJ'],
            "maxLength": 2
          },
          "nro_sacado": {
            "title": "Número de inscrição sacado",
            "description": "Nº de inscrição do sacado (CPF/CNPJ)",
            "type": "integer",
            "default": 0,
            "maximum": 99999999999999
          },
          "nome": {
            "title": "Nome do sacado",
            "type": "string",
            "maxLength": 40,
            "default": ""
          },
          "logradouro": {
            "title": "Logradouro",
            "description": "Rua, número e complemento do sacado",
            "type": "string",
            "maxLength": 40,
            "default": ""
          },
          "bairro": {
            "title": "Bairro",
            "description": "Bairro do sacado",
            "type": "string",
            "maxLength": 12,
            "default": ""
          },
          "cep": {
            "title": "CEP",
            "description": "CEP do sacado",
            "type": "string",
            "pattern": "^(|\d{8})$",
            "maxLength": 8,
            "default": ""
          },
          "cidade": {
            "title": "Cidade",
            "description": "Cidade do sacado",
            "type": "string",
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
            "maxLength": 30,
            "default": ""
          },
          "brancos2": {
            "title": "Brancos",
            "description": "Complemento de registro",
            "type": "string",
            "maxLength": 4,
            "const": ""
          },
          "mora": {
            "title": "Data mora",
            "type": "string",
            "format": "date6",
            "default": ""
          },
          "prazo": {
            "title": "Prazo",
            "description": "Quantidade de dias",
            "type": "integer",
            "default": 0,
            "maximum": 99
          },
          "brancos3": {
            "title": "Brancos",
            "description": "Complemento de registro",
            "type": "string",
            "maxLength": 1,
            "const": ""
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
          "title": "",
          "description": "",
          "type": "integer",
          "const": 9
        },
        "brancos": {
          "title": "",
          "description": "",
          "type": "string",
          "maxLength": 393,
          "const": ""
        },
        "indice": {
          "title": "",
          "description": "",
          "type": "integer",
          "minimum": 1,
          "maximum": 999999,
          "const": dados => dados.registros.length + 2
        }
      }
    }
  }
}
