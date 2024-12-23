// prettier-ignore
import fs from 'fs'
import {
  complexModifications,
} from 'karabiner.ts'
import { homeRowMod, systemLayer, appLayer, linkLayer, vimLayer } from './utils'


export const rules = () => [
  // rule('Playground').manipulators([
  //   map('⇪').toHyper().toIfAlone('⎋'),
  //   { escape: toKey('caps_lock') },
  // ]),

  homeRowMod(),
  systemLayer(),
  appLayer(),
  linkLayer(),
  vimLayer(),
]

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
  fs.writeFileSync('karabiner.json', code)
} catch (e) {
  if (e instanceof Error) {
    error = e?.message || 'Unknown error'
  } else {
    error = e as string
  }
  console.log(e)
}
