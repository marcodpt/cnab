const hoje = () => new Date().toISOString().substr(0, 10)

const print = obj => console.log(JSON.stringify(obj, undefined, 2))

const ler = (arquivo, comprimento) => {
  const L = []
  while (L.length < comprimento && arquivo.length) {
    L.push(arquivo.shift())
  }
  return L.join('')
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

const texto = arquivo => {
  if (arquivo === false) {
    return (dados, comprimento) => fixo('*', comprimento)
  } else if (arquivo == null) {
    return (dados, comprimento) => fixo(dados, comprimento)
  } else {
    return (associar, comprimento) => {
      associar(ler(arquivo, comprimento))
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
    return (dados, comprimento) => /^[1-9]\d+$/.test(dados) ?
      comprimento == 6 ?
        `${dados.substr(8, 2)}${dados.substr(5, 2)}${dados.substr(2, 2)}` : 
      comprimento == 8 ?
        `${dados.substr(8, 2)}${dados.substr(5, 2)}${dados.substr(0, 4)}` :
      fixo('0', comprimento) : fixo('0', comprimento)
  } else {
    return (associar, comprimento) => {
      const d = ler(arquivo, comprimento)
      if (/^[1-9]\d+$/.test(d) && d.length == comprimento) {
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

export {hoje, print, texto, numero, data, mapa, fixo}
