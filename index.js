import {hoje} from './lib.js'

export default dados => {
  if (typeof dados == 'string') {
  } else if (dados && typeof dados == 'object') {
    const base = {
      banco: null,
      servico: null,
      empresa: '',
      agencia: 0,
      conta: 0,
      digito: 0,
      geracao: hoje(),
      sequencia: 1
    }
  } else {
    throw "Você deve passar um objeto para gerar um arquivo CNAB ou um string que representa um arquivo CNAB para transformá-lo em JSON"
  }
}
