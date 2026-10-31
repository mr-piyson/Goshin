# Manganum Feature Inventory (reverse-engineered)

Source: `extension/_locales/en/messages.json` (791 keys) + manifest permissions.

## Entry points
- New tab override (`newtab.html`)
- Side panel (`panel.html`)
- Focus time page (`focus-time.html`)
- Offscreen document (audio/media)
- Content scripts (all URLs + frames for embedded apps)

## Feature groups
- **Widgets**: time & date, weather, motivation, life timer, banner ads
- **Launchpad**: app shortcuts grid, folders, search, context menus, controls
- **Calendar**: schedule, settings, header
- **Gmail**: tooltip, context menu, modal
- **Tasks**: items, settings
- **Drive**: sections, context menu
- **Notes**: placeholders, items, settings
- **History**: tabs, context menu, sections
- **Focus Time**: pomodoro/focus page
- **Translator**: (sms/manual + settings)
- **SMS**: manual entry + settings
- **Backgrounds**: galleries (nature, architecture, art, earth, color, AI) + custom upload + dislike
- **Icons**: google, chrome, popular
- **Onboarding**: setup flow
- **Plus/Premium**: popup, cards
- **Settings**: widget visibility, tabs
- **Sync**: account sign-in, sync status
- **Search**: top sites, search box
- **AI/GPT**: gpt references
- **Rewards**: rewards keys

## Chrome APIs used (from background.js)
chrome.action, alarms, bookmarks, commands, contextMenus, cookies, declarativeNetRequest, history, idle, management, offscreen, runtime, scripting, search, sessions, sidePanel, storage, tabGroups, tabs, topSites, windows

## Mini-games (modules/)
2048, dino, pacman, bird, node, frame (embedded web apps: Telegram, WhatsApp, etc.)

## Permissions (manifest)
storage, unlimitedStorage, topSites, history, alarms, scripting, cookies, contextMenus, favicon, tabGroups, bookmarks, declarativeNetRequestWithHostAccess, offscreen, sidePanel, tabs, sessions, idle, search; host_permissions all URLs.