// prettier-ignore
import fs from 'fs'
import {
  rule,
  hyperLayer,
  map,
  mapSimultaneous,
  toKey,
  toApp,
  withMapper,
  FromKeyParam,
  complexModifications,
} from 'karabiner.ts'

// let links = require('./links.json') as Record<FromKeyParam, string>
let links = {
  g: 'https://www.google.co.in',
  h: 'https://github.com',
  n: 'https://notion.so',
  d: 'https://discord.com/channels/@me',
  c: 'https://claude.ai/new',
} as Record<FromKeyParam, string>

function homeRowMod() {
  return rule('Home row mods - shift, ctrl, opt, cmd').manipulators([
    //
    // Four - left hand
    mapSimultaneous(['a', 's', 'd', 'f']).toIfHeldDown('l⇧', ['l⌘⌥⌃']),
    //
    // Three - left hand
    mapSimultaneous(['a', 's', 'd']).toIfHeldDown('l⇧', ['l⌥⌃']),
    mapSimultaneous(['a', 's', 'f']).toIfHeldDown('l⌃', ['l⌘⌥']),
    mapSimultaneous(['a', 'd', 'f']).toIfHeldDown('l⇧', ['l⌘⌥']),
    mapSimultaneous(['s', 'd', 'f']).toIfHeldDown('l⌃', ['l⌘⌥']),
    //
    // Two - left hand
    mapSimultaneous(['a', 's'], { key_down_order: 'strict' })
      .toIfAlone('a')
      .toIfAlone('s')
      .toIfHeldDown('l⇧', 'l⌃'),
    mapSimultaneous(['s', 'a'], { key_down_order: 'strict' })
      .toIfAlone('s')
      .toIfAlone('a')
      .toIfHeldDown('l⇧', 'l⌃'),
    mapSimultaneous(['a', 'd'], { key_down_order: 'strict' })
      .toIfAlone('a')
      .toIfAlone('d')
      .toIfHeldDown('l⇧', 'l⌥'),
    mapSimultaneous(['d', 'a'], { key_down_order: 'strict' })
      .toIfAlone('d')
      .toIfAlone('a')
      .toIfHeldDown('l⇧', 'l⌥'),
    mapSimultaneous(['a', 'f'], { key_down_order: 'strict' })
      .toIfAlone('a')
      .toIfAlone('f')
      .toIfHeldDown('l⇧', 'l⌘'),
    mapSimultaneous(['f', 'a'], { key_down_order: 'strict' })
      .toIfAlone('f')
      .toIfAlone('a')
      .toIfHeldDown('l⇧', 'l⌘'),
    mapSimultaneous(['s', 'd'], { key_down_order: 'strict' })
      .toIfAlone('s')
      .toIfAlone('d')
      .toIfHeldDown('l⌃', 'l⌥'),
    mapSimultaneous(['d', 's'], { key_down_order: 'strict' })
      .toIfAlone('d')
      .toIfAlone('s')
      .toIfHeldDown('l⌃', 'l⌥'),
    mapSimultaneous(['s', 'f'], { key_down_order: 'strict' })
      .toIfAlone('s')
      .toIfAlone('f')
      .toIfHeldDown('l⌃', 'l⌘'),
    mapSimultaneous(['f', 's'], { key_down_order: 'strict' })
      .toIfAlone('f')
      .toIfAlone('s')
      .toIfHeldDown('l⌃', 'l⌘'),
    mapSimultaneous(['d', 'f'], { key_down_order: 'strict' })
      .toIfAlone('d')
      .toIfAlone('f')
      .toIfHeldDown('l⌥', 'l⌘'),
    mapSimultaneous(['f', 'd'], { key_down_order: 'strict' })
      .toIfAlone('f')
      .toIfAlone('d')
      .toIfHeldDown('l⌥', 'l⌘'),
    //
    // One - left hand
    map('a')
      .toIfAlone('a', {}, { halt: true })
      .toDelayedAction(toKey('vk_none'), toKey('a'))
      .toIfHeldDown('l⇧', {}, { halt: true }),
    map('s')
      .toIfAlone('s', {}, { halt: true })
      .toDelayedAction(toKey('vk_none'), toKey('s'))
      .toIfHeldDown('l⌃', {}, { halt: true }),
    map('d')
      .toIfAlone('d', {}, { halt: true })
      .toDelayedAction(toKey('vk_none'), toKey('d'))
      .toIfHeldDown('l⌥', {}, { halt: true }),
    map('f')
      .toIfAlone('f', {}, { halt: true })
      .toDelayedAction(toKey('vk_none'), toKey('f', {}, { halt: true }))
      .toIfHeldDown('l⌘', {}, { halt: true }),
    //
    //
    // Four - right hand
    mapSimultaneous(['j', 'k', 'l', ';']).toIfHeldDown('r⇧', ['r⌘⌥⌃']),
    //
    // Three - right hand
    mapSimultaneous([';', 'l', 'k']).toIfHeldDown('r⇧', ['r⌥⌃']),
    mapSimultaneous([';', 'k', 'j']).toIfHeldDown('r⇧', ['r⌘⌥']),
    mapSimultaneous(['l', 'k', 'j']).toIfHeldDown('r⌃', ['r⌘⌥']),
    //
    // Two - right hand
    mapSimultaneous([';', 'l'], { key_down_order: 'strict' })
      .toIfAlone(';')
      .toIfAlone('l')
      .toIfHeldDown('r⇧', 'r⌃'),
    mapSimultaneous(['l', ';'], { key_down_order: 'strict' })
      .toIfAlone('l')
      .toIfAlone(';')
      .toIfHeldDown('r⇧', 'r⌃'),
    mapSimultaneous([';', 'k'], { key_down_order: 'strict' })
      .toIfAlone(';')
      .toIfAlone('k')
      .toIfHeldDown('r⇧', 'r⌥'),
    mapSimultaneous(['k', ';'], { key_down_order: 'strict' })
      .toIfAlone('k')
      .toIfAlone(';')
      .toIfHeldDown('r⇧', 'r⌥'),
    mapSimultaneous([';', 'j'], { key_down_order: 'strict' })
      .toIfAlone(';')
      .toIfAlone('j')
      .toIfHeldDown('r⇧', 'r⌘'),
    mapSimultaneous(['j', ';'], { key_down_order: 'strict' })
      .toIfAlone('j')
      .toIfAlone(';')
      .toIfHeldDown('r⇧', 'r⌘'),
    mapSimultaneous(['l', 'k'], { key_down_order: 'strict' })
      .toIfAlone('l')
      .toIfAlone('k')
      .toIfHeldDown('r⌃', 'r⌥'),
    mapSimultaneous(['k', 'l'], { key_down_order: 'strict' })
      .toIfAlone('k')
      .toIfAlone('l')
      .toIfHeldDown('r⌃', 'r⌥'),
    mapSimultaneous(['l', 'j'], { key_down_order: 'strict' })
      .toIfAlone('l')
      .toIfAlone('j')
      .toIfHeldDown('r⌃', 'r⌘'),
    mapSimultaneous(['j', 'l'], { key_down_order: 'strict' })
      .toIfAlone('j')
      .toIfAlone('l')
      .toIfHeldDown('r⌃', 'r⌘'),
    mapSimultaneous(['k', 'j'], { key_down_order: 'strict' })
      .toIfAlone('k')
      .toIfAlone('j')
      .toIfHeldDown('r⌥', 'r⌘'),
    mapSimultaneous(['j', 'k'], { key_down_order: 'strict' })
      .toIfAlone('j')
      .toIfAlone('k')
      .toIfHeldDown('r⌥', 'r⌘'),
    //
    // One - right hand
    map(';')
      .toIfAlone(';', {}, { halt: true })
      .toDelayedAction(toKey('vk_none'), toKey(';'))
      .toIfHeldDown('r⇧', {}, { halt: true }),
    map('l')
      .toIfAlone('l', {}, { halt: true })
      .toDelayedAction(toKey('vk_none'), toKey('l'))
      .toIfHeldDown('r⌃', {}, { halt: true }),
    map('k')
      .toIfAlone('k', {}, { halt: true })
      .toDelayedAction(toKey('vk_none'), toKey('k'))
      .toIfHeldDown('r⌥', {}, { halt: true }),
    map('j')
      .toIfAlone('j', {}, { halt: true })
      .toDelayedAction(toKey('vk_none'), toKey('j'))
      .toIfHeldDown('r⌘', {}, { halt: true }),
  ])
}

function systemLayer() {
  return hyperLayer('s', 'system').manipulators({
    l: toKey('q', '⌘⌃'), // Lock screens
  })
}

function appLayer() {
  return hyperLayer('l', 'launch-app').manipulators({
    // a: toApp('ChatGPT'), // AI
    b: toApp('Safari'), // Browser
    c: toApp('Calendar'),
    // d: toApp('Eudb_en'), // Dictionary
    // e: toApp('Zed'), // Editor
    f: toApp('Finder'),
    g: toApp('Google Chrome'),
    // i: toApp('WeChat'), // IM
    // m: toApp('Spark Desktop'), // Mail
    // r: to$(`open ~/Applications/Rider.app`),
    // s: toApp('Slack'),
    // t: toApp('Warp'), // Terminal
    u: toApp('Spotify'), // mUsic
    v: toApp('Visual Studio Code'),
    // w: to$(`open ~/Applications/WebStorm.app`),
    // y: to$(String.raw`open ~/Applications/PyCharm\ Professional\ Edition.app`),
    // z: toApp('zoom.us'),
    ',': toApp('System Settings'),
  })
}

function linkLayer() {
  return hyperLayer('o', 'open-link').manipulators([
    withMapper(links)((k, v) => map(k).to$(`open "${v}"`)),
  ])
}

function vimLayer() {
  return hyperLayer('v', 'vim').manipulators([
    {
      h: toKey('←'),
      j: toKey('↓'),
      k: toKey('↑'),
      l: toKey('→'),
    },
    //   ';': toKey('›⇧'),
    //   d: toKey('‹⌘'),
    //   s: toKey('‹⌃'),
    //   a: toKey('‹⌥'),
    // },
    // { "'": toKey('⌫'), '\\': toKey('⌦') },
  ])
}

export const rules = () => [
  // rule('Playground').manipulators([
  //   map('⇪').toHyper().toIfAlone('⎋'),
  //   { escape: toKey('caps_lock') },
  // ]),

  // rule('doubleTap caps → escape').manipulators([
  //   mapDoubleTap('⇪').to('⎋').singleTap(toKey('q', '⌘')),
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
