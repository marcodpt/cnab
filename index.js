import retorno from './retorno/index.js'

export default dados => {
  if (typeof dados == 'string') {
    const Linhas = dados.trim().split('\n').map(l => l.trim())
    if (Linhas.length < 1) {
      throw "Arquivo vazio!"
    }

    const formato = Object.keys(retorno).reduce((formato, k) => {
      if (formato == '' && retorno[k].teste.test(Linhas[0])) {
        formato = k 
      }
      return formato 
    }, '')

    if (formato == '') {
      throw 'Formato do arquivo não suportado!'
    }

    const {tipos, assinatura} = retorno[formato]
    const Assinatura = []
    const Resultado = []

    Linhas.forEach((linha, seq) => {
      const texto = (inicio, comprimento) =>
        linha.substr(inicio - 1, comprimento).trim()

      const data = (inicio, comprimento) => {
        const d = texto(inicio, comprimento)
        if (comprimento == 6) {
          return '20'+d.substr(4, 2)+'-'+d.substr(2, 2)+'-'+d.substr(0, 2)
        }
      }

      const numero = (inicio, comprimento, decimais) => {
        var n = texto(inicio, comprimento)
        n = parseInt(n)
        if (n && !isNaN(n) && decimais) {
          return n / 10 ** decimais
        } else {
          return n
        }
      }

      const tipo = Object.keys(tipos).reduce((tipo, t) => {
        if (tipo == '' && tipos[t].teste.test(linha)) {
          tipo = t
        }
        return tipo
      }, '')

      if (tipo == '') {
        console.log(linha)
        throw `[${formato}] (${seq+1}): tipo da linha desconhecido!`
      }
      Resultado.push({
        tipo: tipo,
        ...(tipos[tipo].dados || (() => ({})))({texto, data, numero})
      })

      Assinatura.push(tipo)
    })

    const a = Assinatura.join('\n')
    if (!assinatura.test(a)) {
      console.log(a)
      throw `[${formato}]: assinatura incorreta do arquivo!`
    }

    console.log(JSON.stringify(Resultado, undefined, 2))
  } else if (dados && typeof dados == 'object') {

  } else {
    throw "Você deve passar um objeto para gerar um arquivo CNAB ou um string que representa um arquivo CNAB para transformá-lo em JSON"
  }
}
