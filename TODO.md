# FRC Command Groups Teaching App - Implementation Plan

## Overview
Build a drag-and-drop React app for teaching students about command groups (parallel/sequential) in FRC programming.

## Core Requirements
- Draggable command tiles (Spin Shooter, Drive to Pose, Raise Elevator, Shoot)
- Parallel and Sequential group containers
- Nested grouping support
- Validation against known solutions
- Easy extensibility for adding new commands and levels

## Libraries to Install
- `@dnd-kit/core` - Modern drag-and-drop library for React
- `@dnd-kit/sortable` - Sortable/nestable functionality
- `@dnd-kit/utilities` - Helper utilities
- `tailwindcss` - Quick styling with utility classes
- `lucide-react` - Icons for visual feedback

## Files to Create/Modify

### 1. Configuration & Setup Files
- [ ] `tailwind.config.js` - Tailwind CSS configuration
- [ ] `postcss.config.js` - PostCSS configuration for Tailwind
- [ ] Update `package.json` - Add dependencies

### 2. Type Definitions
- [ ] `src/types/index.ts` - TypeScript types for:
  - Command
  - CommandGroup (Parallel/Sequential)
  - Level
  - Solution validation

### 3. Data/Configuration
- [ ] `src/data/commands.ts` - Define available commands
- [ ] `src/data/levels.ts` - Define levels with goals and solutions

### 4. Components
- [ ] `src/components/CommandTile.tsx` - Individual command tile (draggable)
- [ ] `src/components/CommandPalette.tsx` - Left sidebar with available commands
- [ ] `src/components/GroupContainer.tsx` - Parallel/Sequential group container (droppable + sortable)
- [ ] `src/components/WorkArea.tsx` - Main workspace for building command groups
- [ ] `src/components/LevelHeader.tsx` - Top bar showing current level/goal
- [ ] `src/components/ValidationButton.tsx` - Check button with feedback

### 5. Utilities
- [ ] `src/utils/validation.ts` - Solution validation logic
- [ ] `src/utils/commandStructure.ts` - Helper functions for command tree manipulation

### 6. Main Application
- [ ] Update `src/App.tsx` - Main app component with state management
- [ ] Update `src/index.css` - Add Tailwind directives and custom styles
- [ ] Update `src/App.css` - Remove/clean up default styles

## Implementation Steps

### Phase 1: Setup & Dependencies
1. Install all required npm packages
2. Configure Tailwind CSS
3. Set up TypeScript types

### Phase 2: Data Layer
4. Create command definitions
5. Create level definitions with solutions
6. Implement validation logic

### Phase 3: UI Components
7. Build CommandTile component
8. Build CommandPalette (left sidebar)
9. Build GroupContainer with drag-and-drop
10. Build WorkArea for nesting groups
11. Build LevelHeader
12. Build ValidationButton with feedback

### Phase 4: Integration
13. Wire up drag-and-drop functionality
14. Implement state management in App.tsx
15. Connect validation logic
16. Add animations and visual feedback

### Phase 5: Polish
17. Test drag-and-drop edge cases
18. Add visual indicators (highlighting, snapping)
19. Ensure responsive design
20. Add success/error feedback

## Key Technical Decisions

### State Structure
```typescript
{
  currentLevel: number,
  workspace: CommandNode[], // Tree structure of commands/groups
  availableCommands: Command[],
  validationResult: null | { success: boolean, message: string }
}
```

### Drag-and-Drop Strategy
- Use @dnd-kit for modern, accessible drag-and-drop
- Support both copying from palette and moving within workspace
- Enable nested droppable containers for groups

### Validation Strategy
- Recursively compare workspace structure with solution
- Check both command order and grouping type (parallel/sequential)
- Provide helpful feedback on what's incorrect
