# Manganum Clone — Chrome + Firefox Extension

Built with **WXT** (Vite) + **React** + **TypeScript** + **Redux Toolkit** + **Tailwind CSS**.
Targets Chrome MV3 and Firefox MV3 from a single codebase.

## Commands

```bash
npm install          # installs deps + runs wxt prepare
npm run dev          # Chrome dev with HMR
npm run dev:firefox  # Firefox dev
npm run build        # Chrome production build -> .output/chrome-mv3
npm run build:firefox # Firefox production build -> .output/firefox-mv3
npm run zip          # package for Chrome Web Store
npm run zip:firefox  # package for AMO
npm run typecheck    # tsc --noEmit
```

## Loading unpacked
- Chrome: chrome://extensions -> Developer mode -> Load unpacked -> `.output/chrome-mv3`
- Firefox: about:debugging -> This Firefox -> Load Temporary Add-on -> `.output/firefox-mv3/manifest.json`

## Architecture
- `entrypoints/background.ts` — service worker (alarms, messages, side panel)
- `entrypoints/newtab/` — single-page new tab shell (wallpaper, clock, search, launchpad, widgets) with background / settings / more panels layered on the same page
- `entrypoints/sidepanel/` — side panel (React)
- `entrypoints/content.ts` — content script
- `store/` — Redux Toolkit slices

## Roadmap
See parent repo notes. Phases: core new-tab + widgets → launchpad → side panel embeds → notes/tasks → cross-browser polish.