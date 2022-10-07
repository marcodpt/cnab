import itau_cobranca_400 from './itau_cobranca_400.js'

const retorno = {itau_cobranca_400}

export default dados => {
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

  const {tipos, assinatura, base, item} = retorno[formato]
  const Assinatura = []
  const Resultado = base()

  Linhas.forEach((linha, seq) => {
    const texto = (inicio, comprimento) =>
      linha.substr(inicio - 1, comprimento).trim()

    const data = (inicio, comprimento) => {
      const d = texto(inicio, comprimento)
      if (/^\d+$/.test(d) && !/^0+$/.test(d)) {
        if (comprimento == 6) {
          return '20'+d.substr(4, 2)+'-'+d.substr(2, 2)+'-'+d.substr(0, 2)
        }
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

    const opcao = (inicio, comprimento, opcoes) => {
      if (opcoes instanceof Array) {
        const n = numero(inicio, comprimento)
        return n && !isNaN(n) ? opcoes[n - 1] : null
      } else {
        return opcoes[texto(inicio, comprimento)]
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

    try {
      item(
        Resultado,
        tipo,
        (tipos[tipo].dados || (() => ({})))({texto, data, numero, opcao}),
        seq
      )
    } catch (err) {
      throw `[${formato} ${tipo}] (${seq+1}): ${err}`
    }

    Assinatura.push(tipo)
  })

  const a = Assinatura.join('\n')
  if (!assinatura.test(a)) {
    console.log(a)
    throw `[${formato}]: assinatura incorreta do arquivo!`
  }

  return Resultado
}
