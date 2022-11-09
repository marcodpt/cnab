const hoje = () => new Date().toISOString().substr(0, 10)

const copiar = X => JSON.parse(JSON.stringify(X))

const ler = (arquivo, comprimento) => {
  const L = []
  while (L.length < comprimento && arquivo.length) {
    L.push(arquivo.shift())
  }
  return L.join('')
}

const escrever = (arquivo, dados) => {
  Array.from(dados).forEach(c => {
    arquivo.push(c)
  })
}

const leitor = arquivo => {
  const linha = 1
  const coluna = 1
}

const fixo = (dados, comprimento, numerico) => {
  const d = String(dados)
  var r = d.substr(0, comprimento)
  while (r.length < comprimento) {
    if (numerico) {
      r = '0'+r
    } else if (typeof dados == "string" && dados.length == 1) {
      r += d
    } else {
      r += ' '
    }
  }
  return r
}

const checar = arquivo => (dados, comprimento, numerico) => {
  const esperado = fixo(dados, comprimento, numerico)
  const entrada = ler(arquivo, esperado.length)
  if (entrada != esperado) {
    throw `DIFERENÇA\n${esperado}\n${entrada}`
  }
}

const texto = arquivo => {
  if (arquivo === false) {
    return (dados, comprimento) => fixo('*', comprimento)
  } else if (arquivo == null) {
    return (dados, comprimento) => fixo(dados, comprimento)
  } else {
    return (associar, comprimento) => {
      associar(ler(arquivo, comprimento).trimEnd())
    }
  }
}

const numero = arquivo => {
  if (arquivo === false) {
    return (dados, comprimento) => fixo('*', comprimento)
  } else if (arquivo == null) {
    return (dados, comprimento, precisao) =>
      fixo(Math.round(dados * 10 ** (precisao || 0)), comprimento, true)
  } else {
    return (associar, comprimento, precisao) => {
      const n = parseInt(ler(arquivo, comprimento))
      if (!isNaN(n)) {
        associar(n / 10 ** (precisao || 0))
      }
    }
  }
}

const data = arquivo => {
  if (arquivo === false) {
    return (dados, comprimento) => fixo('*', comprimento)
  } else if (arquivo == null) {
    return (dados, comprimento) => /^\d{4}-\d{2}-\d{2}$/.test(dados) ?
      comprimento == 6 ?
        `${dados.substr(8, 2)}${dados.substr(5, 2)}${dados.substr(2, 2)}` : 
      comprimento == 8 ?
        `${dados.substr(8, 2)}${dados.substr(5, 2)}${dados.substr(0, 4)}` :
      fixo('0', comprimento) : fixo('0', comprimento)
  } else {
    return (associar, comprimento) => {
      const d = ler(arquivo, comprimento)
      if (/^\d+$/.test(d) && d.length == comprimento) {
        if (comprimento == 6) {
          associar('20'+d.substr(4, 2)+'-'+d.substr(2, 2)+'-'+d.substr(0, 2))
        } else if (comprimento == 8) {
          associar(d.substr(4, 4)+'-'+d.substr(2, 2)+'-'+d.substr(0, 2))
        }
      }
    }
  }
}

const mapa = arquivo => {
  if (arquivo === false) {
    return (dados, mapa) => fixo('*', Object.keys(mapa)[0].length)
  } else if (arquivo == null) {
    return (dados, mapa) => {
      const K = Object.keys(mapa)
      const V = Object.values(mapa)
      var i = V.indexOf(dados)
      if (i < 0) {
        i = V.indexOf('*')
      }
      return fixo(K[i < 0 ? 0 : i], K[0].length, true)
    }
  } else {
    return (associar, mapa) => {
      const K = Object.keys(mapa)
      const k = ler(arquivo, K[0].length)
      if (mapa[k] != null) {
        associar(mapa[k])
      } else {
        const V = Object.values(mapa)
        const i = V.indexOf('*')
        if (i >= 0) {
          associar(K[i])
        }
      }
    }
  }
}

export {hoje, copiar, texto, numero, data, mapa, fixo, checar}
