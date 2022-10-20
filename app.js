import schemas from './schemas/index.js'
import {reader, writer} from './index.js'

(() => {
  const changeTab = () => {
    const dflt = document.getElementById('default')
    dflt.classList.remove('d-none')

    document.body.querySelectorAll('a.nav-link[href^="#"]').forEach(a => {
      const href = a.getAttribute('href')
      const id = href.substr(1)
      if (window.location.hash == href) {
        a.classList.add('active')
        document.getElementById(id).classList.remove('d-none')
        dflt.classList.add('d-none')
      } else {
        a.classList.remove('active')
        document.getElementById(id).classList.add('d-none')
      }
    })
  }

  const loadSchema = schema => {
    const P = schema.properties
    return Object.keys(P).reduce((Dflt, key) => {
      if (P[key].const == null || typeof P[key].const == 'function') {
        Dflt[key] = P[key].default
      }
      if (P[key].enum instanceof Array) {
        var i = P[key].enum.indexOf(Dflt[key])
        if (i < 0) {
          i = 0
        }
        if (P[key].labels instanceof Array) {
          Dflt[key] = P[key].labels[i]
        } else {
          Dflt[key] = P[key].enum[i]
        }
      }
      return Dflt
    }, {})
  }

  const loadJson = () => {
    const select = document.getElementById('schemas')
    const schema = schemas[select.value]

    const P = schema.properties
    const Data = Object.keys(P).reduce((Dflt, key) => {
      if (P[key].type == "array") {
        Dflt[key] = [loadSchema(P[key].items)]
      } else {
        Dflt[key] = loadSchema(P[key])
      }
      return Dflt
    }, {})

    const textarea = document.getElementById('json')
    textarea.value = JSON.stringify(Data, undefined, 2)
    return textarea
  }

  window.addEventListener('load', changeTab)
  window.addEventListener('hashchange', changeTab)
  window.addEventListener('load', () => {
    const select = document.getElementById('schemas')
    document.body.querySelectorAll('select').forEach(select => {
      select.innerHTML += Object.keys(schemas)
        .map(key => `<option value="${key}">${key.replace(/_/g, ' ')}</option>`)
        .join('\n')
    })
    const textarea = loadJson()
    select.addEventListener('change', loadJson)

    const form = document.getElementById('gerar').querySelector('form')
    form.addEventListener('submit', ev => {
      ev.preventDefault()
      ev.stopPropagation()
      const link = document.createElement("a")
      link.setAttribute('href', 'data:text/plain;charset=utf-8,'+
        encodeURIComponent(writer(
          JSON.parse(textarea.value),
          schemas[select.value]
        ))
      ) 
      link.setAttribute('download', select.value+'.txt')

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })

    const file = document.getElementById('importar')
      .querySelector('input[type=file]')

    const feedback = document.getElementById('feedback')
    const card = document.getElementById('card')
      .content.firstElementChild.outerHTML

    const setCard = (name, data) => {
      feedback.innerHTML += card
        .replace('{{name}}', name)
        .replace('{{data}}', data)
    }

    file.addEventListener('change', ev => {
      feedback.innerHTML = ''
      file.setAttribute('disabled', '')

      Promise.all(Array.from(ev.target.files)
        .map(file => new Promise((resolve, reject) => {
            var reader = new FileReader()
            reader.onloadend = function () {
              if (reader.error) {
                reject(reader.error)
              } else {
                resolve(reader.result)
              }
            }
            reader.readAsText(file, 'UTF-8')
          })
          .then(data => JSON.stringify(reader(data,
            schemas[ev.target.closest('form').querySelector('select').value]
          ), undefined, 2))
          .then(json => setCard(file.name, json))
          .catch(err => setCard(`${file.name}: ERRO!`, err))
        )
      ).then(data => {
        file.removeAttribute('disabled')
      }).catch(err => {
        file.removeAttribute('disabled')
        throw err
      })
    })
  })
})()
