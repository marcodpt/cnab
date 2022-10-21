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
        "brancos1": {
          "title": "Brancos",
          "description": "Complemento de registro",
          "type": "string",
          "maxLength": 8,
          "const": ""
        },
        "nome": {
          "title": "Nome da empresa",
          "description": "Nome por extenso da \"empresa mãe\"",
          "type": "string",
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
          "maxLength": 15,
          "const": "BANCO ITAU SA"
        },
        "geracao": {
          "title": "Data de geração",
          "description": "Data de geração do arquivo",
          "type": "string",
          "format": "date6",
          "default": hoje()
        },
        "brancos2": {
          "title": "Brancos",
          "description": "Complemento de registro",
          "type": "string",
          "maxLength": 294,
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
          "title": "Tipo de registro",
          "description": "Identificação do registro header",
          "type": "integer",
          "const": 9
        },
        "brancos": {
          "title": "Brancos",
          "description": "Complemento de registro",
          "type": "string",
          "maxLength": 393,
          "const": ""
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
