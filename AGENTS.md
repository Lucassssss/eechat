# AGENTS.md

## Setup Commands
- Install pnpm: `npm install -g pnpm`
- Install deps: `pnpm install`
- Start dev server: `pnpm dev`
- Build for macOS: `pnpm build:mac`
- Build for Windows: `pnpm build:win`
- Build package: `pnpm package`

## Code Style
- TypeScript with Vue 3 Composition API
- Uses vue-i18n for localization
- Tailwind CSS for styling
- Components use `<script setup lang="ts">` syntax

## Project Structure
- `src/` - Vue frontend source
- `src/locales/` - i18n translation files (en, zh)
- `src/components/` - Vue components
- `electron/` - Electron main process and backend server
- `packages/` - pnpm workspace packages (rag, agents, etc.)
