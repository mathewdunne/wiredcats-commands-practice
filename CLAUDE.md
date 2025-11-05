# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React game application for practicing command group creation, built with:
- **React 19.1.1** with TypeScript
- **Vite** (using rolldown-vite 7.1.14 as the bundler)
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

- **src/main.tsx** - Application entry point, renders `<App />` in React StrictMode
- **src/App.tsx** - Main application component
- **src/index.css** - Global styles
- **src/App.css** - Component-specific styles
- **public/** - Static assets served at root

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

### ESLint
- Uses ESLint 9 **flat config** format (eslint.config.js)
- TypeScript ESLint with recommended rules
- React Hooks plugin with recommended-latest config
- React Refresh plugin for Vite
- Ignores `dist/` directory
