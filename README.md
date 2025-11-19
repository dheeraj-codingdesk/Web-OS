# Web OS 📀

A Windows‑style desktop UI built with React, Vite, TypeScript, and Tailwind CSS. It includes draggable, resizable windows, a taskbar with a Start menu and clock, and several built‑in apps (File Explorer, Notepad, Calculator, Settings).

## Tech Stack

- React 18 + Vite 6
- TypeScript 5
- Tailwind CSS 3
- ESLint (flat config) + TypeScript ESLint
- Vite plugins: `@vitejs/plugin-react`, `vite-tsconfig-paths`, `vite-plugin-trae-solo-badge`

## Features

- Desktop icons launch apps via `Desktop` (`src/components/Desktop.tsx:8`)
- Window management with focus, minimize, maximize, drag, and resize (`src/components/WindowManager.tsx:49`, `src/components/DraggableWindow.tsx:32`)
- Taskbar with Start menu and system tray clock (`src/components/Taskbar.tsx:49`)
- Built‑in apps:
  - File Explorer (`src/components/apps/FileExplorer.tsx:25`)
  - Notepad (`src/components/apps/Notepad.tsx:8`)
  - Calculator (`src/components/apps/Calculator.tsx:8`)
  - Settings (`src/components/apps/Settings.tsx:8`)
- Dark mode support (`tailwind.config.js:4`)

## Quick Start

- Prerequisites: Node.js 18+
- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Open in browser: `http://localhost:5173` (default Vite port)

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — type‑check and build production bundle
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint across the project
- `npm run check` — TypeScript project references build‑mode typecheck

## Project Structure

- `src/` — application source
  - `components/` — core UI (Desktop, Taskbar, WindowManager, DraggableWindow)
  - `components/apps/` — built‑in apps (FileExplorer, Notepad, Calculator, Settings)
  - `App.tsx` — app orchestration and window state (`src/App.tsx:34`)
  - `main.tsx` — React root
  - `index.css` — global styles (Tailwind)
- `index.html` — app entry
- `vite.config.ts` — Vite configuration (`vite.config.ts:7`)
- `tailwind.config.js` — Tailwind configuration
- `postcss.config.js` — PostCSS plugins

## Notes

- Production builds hide sourcemaps (`vite.config.ts:8`)
- Path aliases are resolved from `tsconfig` (`vite-tsconfig-paths`)
- Trae Solo badge is injected on production builds only (`vite.config.ts:19`)
