export default {
  "title": "Retorno Itaú Cobrança",
  "description": "Layout para retorno de cobrança Itaú CNAB 400",
  "type": "object",
  "properties": {
    "tipo": {

    },
    "servico": {},
    "banco": {},
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
    "digito": {
      "title": "Dígito",
      "description": "Dígito de auto conferência ag/conta empresa",
      "type": "integer",
      "minimum": 0,
      "maximum": 9,
      "default": 0,
      "pos": 38
    },
    "empresa": {
      "title": "Nome da empresa",
      "description": "Nome por extenso da \"empresa mãe\"",
      "type": "string",
      "minlength": 0,
      "maxlength": 30,
      "default": "",
      "pos": 47
    },
    "geracao": {},
    "sequencia": {},
    "credito": {},
    "indice": {},
    "registros": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "properties": {
          "registro": opcao(2, 2, ['CPF', 'CNPJ']),
          "inscricao": texto(4, 14),
          "agencia": numero(18, 4),
          "conta": numero(24, 5),
          "digito": numero(29, 1),
          "carteira": opcao(83, 3, carteiras),
          "titulo": texto(117, 10),
          "boleto": texto(63, 8),
          "ocorrencia": opcao(109, 2, ocorrencias),
          "data": data(111, 6),
          "vencimento": data(147, 6),
          "valor": numero(153, 13, 2),
          "banco": opcao(166, 3, bancos),
          "cobradora": texto(169, 4)+'-'+texto(173, 1),
          "especie": opcao(174, 2, especies),
          "tarifa": numero(176, 13, 2),
          "iof": numero(215, 13, 2),
          "abatimento": numero(228, 13, 2),
          "descontos": numero(241, 13, 2),
          "principal": numero(254, 13, 2),
          "juros": numero(267, 13, 2),
          "outros": numero(280, 13, 2),
          "credito": data(296, 6),
          "nome": texto(325, 30),
          "cancelada": numero(302, 4),
          "erros": texto(378, 8),
          "liquidacao": opcao(393, 2, liquidacoes),
          "indice": numero(396, 6)
        }
      }
    }
  }
}
