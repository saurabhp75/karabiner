import {
  FromKeyParam,
  hyperLayer,
  map,
  mapSimultaneous,
  rule,
  SideModifierAlias,
  to$,
  toApp,
  ToEvent,
  toKey,
  withMapper,
} from 'karabiner.ts'

// let links = require('./links.json') as Record<FromKeyParam, string>
let links = {
  g: 'https://www.google.co.in',
  h: 'https://github.com',
  n: 'https://notion.so',
  d: 'https://discord.com/channels/@me',
  c: 'https://claude.ai/new',
} as Record<FromKeyParam, string>

/** Back/Forward history in most apps. */
export function historyNavi() {
  return [
    map('h', '⌃').to('[', '⌘'), 
    map('l', '⌃').to(']', '⌘'),
  ]
}

/** Pre/Next tab in most apps. */
export function tabNavi() {
  return [
    map('h', '⌥').to('[', '⌘⇧'), 
    map('l', '⌥').to(']', '⌘⇧'),
  ]
}

/** Pre/Next switcher in most apps. */
export function switcher() {
  return [
    map('h', '⌘⌥⌃').to('⇥', '⌃⇧'), 
    map('l', '⌘⌥⌃').to('⇥', '⌃'),
  ]
}

/**
 * Map when tap a modifier key; keep as modifier when hold.
 *
 * - ‹⌘ Show/Hide UI (e.g. left sidebars, or all UI)
 * - ‹⌥ Run current task (re-run)
 * - ‹⌃ Run list
 *
 * - ›⌘ Show/Hide UI (e.g. right sidebars, or terminal)
 * - ›⌥ Command Palette (e.g. ⌘K, ⌘P)
 * - ›⌃ History (e.g. recent files)
 */
export function tapModifiers(
  v: Partial<Record<SideModifierAlias | 'fn', ToEvent>>
) {
  return Object.entries(v).map(([k, to]) => {
    let key = k as SideModifierAlias | 'fn'
    return map(key).to(key).toIfAlone(to)
  })
}

export function raycastExt(name: string) {
  return to$(`open raycast://extensions/${name}`)
}

export function raycastWin(name: string) {
  return to$(`open -g raycast://extensions/raycast/window-management/${name}`)
}

export function toResizeWindow(
  app: string,
  position = { x: 0, y: 220 }, // First window, below widgets
  size = { w: 1262, h: 1220 } // First 1/4 width, screen height - widgets height
) {
  return to$(`osascript -e '\
set windowPosition to {${position.x}, ${position.y}}
set windowSize to {${size.w}, ${size.h}}

tell application "System Events"
  tell process "${app}"
    set frontWindow to first window
    set position of frontWindow to windowPosition
    set size of frontWindow to windowSize
  end tell
end tell'`)
}

/** @see https://gist.github.com/lancethomps/a5ac103f334b171f70ce2ff983220b4f?permalink_comment_id=4698498#gistcomment-4698498 */
export let toClearNotifications = to$(`osascript -e '\
tell application "System Events"
  try
    repeat
      set _groups to groups of UI element 1 of scroll area 1 of group 1 of window "Notification Center" of application process "NotificationCenter"
      set numGroups to number of _groups
      if numGroups = 0 then
        exit repeat
      end if
      repeat with _group in _groups
        set _actions to actions of _group
        set actionPerformed to false
        repeat with _action in _actions
          if description of _action is in {"Clear All", "Close"} then
            perform _action
            set actionPerformed to true
            exit repeat
          end if
        end repeat
        if actionPerformed then
          exit repeat
        end if
      end repeat
    end repeat
  end try
end tell'`)

export function homeRowMod() {
  return rule('Home row mods - shift, ctrl, opt, cmd').manipulators([
    // Four - left hand
    mapSimultaneous(['a', 's', 'd', 'f']).toIfHeldDown('l⇧', ['l⌘⌥⌃']),
    // Three - left hand
    mapSimultaneous(['a', 's', 'd']).toIfHeldDown('l⇧', ['l⌥⌃']),
    mapSimultaneous(['a', 's', 'f']).toIfHeldDown('l⌃', ['l⌘⌥']),
    mapSimultaneous(['a', 'd', 'f']).toIfHeldDown('l⇧', ['l⌘⌥']),
    mapSimultaneous(['s', 'd', 'f']).toIfHeldDown('l⌃', ['l⌘⌥']),
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
    // Four - right hand
    mapSimultaneous(['j', 'k', 'l', ';']).toIfHeldDown('r⇧', ['r⌘⌥⌃']),
    // Three - right hand
    mapSimultaneous([';', 'l', 'k']).toIfHeldDown('r⇧', ['r⌥⌃']),
    mapSimultaneous([';', 'k', 'j']).toIfHeldDown('r⇧', ['r⌘⌥']),
    mapSimultaneous(['l', 'k', 'j']).toIfHeldDown('r⌃', ['r⌘⌥']),
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

export function systemLayer() {
  return hyperLayer('s', 'system').manipulators({
    l: toKey('q', '⌘⌃'), // Lock screens
  })
}

export function appLayer() {
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

export function linkLayer() {
  return hyperLayer('o', 'open-link').manipulators([
    withMapper(links)((k, v) => map(k).to$(`open "${v}"`)),
  ])
}

export function vimLayer() {
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
