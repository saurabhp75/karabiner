import './style.css'

import { complexModifications } from 'karabiner.ts'

import { rules } from './rules.ts'

let code = ''
let error = ''

try {
  const config = complexModifications(rules()).rules.reduce(
    (r, v) => ({
      description: r.description
        ? `${r.description}; ${v.description}`
        : v.description,
      manipulators: r.manipulators.concat(v.manipulators),
    }),
    { description: '', manipulators: [] }
  )
  code = JSON.stringify(config, null, 2)
} catch (e) {
  if (e instanceof Error) {
    error = e?.message || 'Unknown error'
  } else {
    error = e as string
  }
}

document.querySelector('#app')!.innerHTML = `\
<div>
  <button id="copy" data-clipboard-target="#output">Copy</button>
  
  <a href="https://karabiner-elements.pqrs.org/docs/manual/configuration/configure-complex-modifications/#create-your-own-rules" target="_blank">
    ? Import to Karabiner-Elements
  </a>
  
  <pre id="output" ${error ? ' class="error"' : ''}>${error || code}</pre>
</div>`
