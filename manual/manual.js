import remessa_cobranca from '../remessa_cobranca/schema.js'

const livro = {remessa_cobranca}

const texto = t => t.split('\n').join('\n\n')
const valor = x => typeof x == "string" ? '"'+x+'"' : String(x)

const info = (T, k, S) =>  {
  T.push(`### ${k}: \`${S.type}\``)
  T.push('#### '+S.title)
  T.push(texto(S.description))

  const Info = []
  if (S.minLength != null) {
    Info.push(' - Comprimento mínimo: `'+S.minLength+'`')
  }
  if (S.maxLength != null) {
    Info.push(' - Comprimento máximo: `'+S.maxLength+'`')
  }
  if (S.pattern != null) {
    Info.push(' - Expressão Regular: `'+S.pattern+'`')
  }
  if (S.multipleOf != null) {
    Info.push(' - Precisão: `'+S.multipleOf+'`')
  }
  if (S.minimum != null) {
    Info.push(' - Valor mínimo: `'+S.minimum+'`')
  }
  if (S.maximum != null) {
    Info.push(' - Valor máximo: `'+S.maximum+'`')
  }
  if (S.default != null) {
    if (S.format == 'date' && S.default.length) {
      Info.push(' - Valor padrão: `Dia atual`')
    } else {
      Info.push(' - Valor padrão: `'+valor(S.default)+'`')
    }
  }
  if (S.const != null) {
    Info.push(' - Fixo: `'+S.const+'`')
  }
  if (S.enum != null && S.enum.length) {
    Info.push(' - Opções: \n   - `'+S.enum.map(valor).join('`\n   - `')+'`')
  }
  if (Info.length) {
    T.push(Info.join('\n'))
  }
}

const item = async (nome, S) => {
  const T = []
  T.push(`# ${S.title}`)
  T.push(texto(S.description))

  const P = S.properties
  T.push(`## Propriedades`)
  Object.keys(P).forEach(k => {
    if (k != 'registros') {
      info(T, k, P[k])
    }
  })

  T.push(`## Registros`)
  const Q = P.registros.items.properties
  Object.keys(Q).forEach(k => {
    info(T, k, Q[k])
  })

  await Deno.writeTextFile(`./livro/${nome}.md`, T.join('\n\n'))
}

const I = []
I.push('# Indice')
I.push('')
I.push(' - [Início](./index.md)')
Object.keys(livro).forEach(nome => {
  const B = livro[nome]
  I.push(` - [${B.title}](./${nome}.md)`)
  item(nome, B)
})
await Deno.writeTextFile(`./livro/SUMMARY.md`, I.join('\n'))
