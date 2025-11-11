# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **WiredCats Programming Training** web application built for FRC Team 5885. It's a multi-game educational platform currently featuring:
1. **Command Group Practice** - An interactive game for learning to organize commands into sequential and parallel groups
2. **Java Class Match Predictor** - External link to a Java programming exercise

Built with:
- **React 19.1.1** with TypeScript
- **React Router DOM** for client-side routing
- **Vite** (using rolldown-vite 7.1.14 as the bundler)
- **@dnd-kit** for drag-and-drop functionality
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **ESLint 9** with TypeScript ESLint and React plugins

## Development Commands

### Running the Development Server
```bash
npm run dev
```
Starts the Vite development server with Hot Module Replacement (HMR).

### Building for Production
```bash
npm run build
```
Runs TypeScript compiler in build mode (`tsc -b`) followed by Vite build. Output goes to `dist/`.

### Linting
```bash
npm run lint
```
Runs ESLint on all TypeScript/TSX files using the flat config format (eslint.config.js).

### Preview Production Build
```bash
npm run preview
```
Locally preview the production build.

## Project Structure

### Entry Points
- **src/main.tsx** - Application entry point, renders `<App />` in React StrictMode
- **src/App.tsx** - Main router configuration with React Router

### Pages
- **src/pages/HomePage.tsx** - Landing page with game selection cards
- **src/pages/CommandGroupPractice.tsx** - Main Command Group Practice game component

### Components
- **src/components/LevelHeader.tsx** - Header with level info and navigation (includes Home button)
- **src/components/CommandPalette.tsx** - Draggable command palette
- **src/components/WorkArea.tsx** - Drop zone for building command structures
- **src/components/CommandTile.tsx** - Individual command display
- **src/components/GroupContainer.tsx** - Container for sequential/parallel groups
- **src/components/ValidationButton.tsx** - Check/Reset functionality
- **src/components/CongratulationsModal.tsx** - Success modal on completion

### Data & Utils
- **src/data/commands.ts** - Command definitions
- **src/data/levels.ts** - Level configurations
- **src/types/index.ts** - TypeScript type definitions
- **src/utils/commandStructure.ts** - Command tree manipulation
- **src/utils/validation.ts** - Solution validation logic
- **src/utils/persistence.ts** - LocalStorage management

### Styles
- **src/index.css** - Global styles (includes Tailwind directives)
- **src/App.css** - Component-specific styles

### Assets
- **public/** - Static assets served at root
- **src/assets/** - Images and logos (e.g., WiredcatsVectorLogo.png)

## Application Architecture

### Routing
The app uses **React Router v6** with the following routes:
- `/` - HomePage (game selection screen)
- `/command-group-practice` - Command Group Practice game
- External link to Java exercise via `window.open()`

### Key Features
- **Drag-and-Drop**: Uses @dnd-kit/core for intuitive command organization
- **Level Progression**: Multiple levels with increasing difficulty
- **Persistent State**: LocalStorage saves progress per level
- **Validation System**: Checks user solutions against expected structures
- **Responsive UI**: Tailwind CSS with hover effects and transitions

## Build Configuration

### TypeScript
- Uses **project references** with split configs:
  - `tsconfig.json` - Root config with references
  - `tsconfig.app.json` - Application code config (src/)
  - `tsconfig.node.json` - Build tooling config
- Strict mode enabled with additional linting options (noUnusedLocals, noUnusedParameters)
- Target: ES2022
- Module resolution: bundler mode
- JSX: react-jsx (automatic runtime)

### Vite
- Using rolldown-vite (Rolldown bundler) instead of standard Vite
- Standard React plugin configuration
- Note: `vite` package is overridden to `npm:rolldown-vite@7.1.14` in package.json

### Tailwind CSS
- Configured with PostCSS
- Custom color scheme based on gray/blue/green palette
- Responsive design utilities

### ESLint
- Uses ESLint 9 **flat config** format (eslint.config.js)
- TypeScript ESLint with recommended rules
- React Hooks plugin with recommended-latest config
- React Refresh plugin for Vite
- Ignores `dist/` directory

## Adding New Games

To add a new game to the platform:
1. Create a new page component in `src/pages/`
2. Add a route in `src/App.tsx`
3. Add a game card button in `src/pages/HomePage.tsx`
4. Use consistent styling (refer to existing game cards)
