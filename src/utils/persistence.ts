import type { CommandNode } from '../types';

const STORAGE_KEY = 'wiredcats-workspace-state';
const COMPLETION_KEY = 'wiredcats-level-completions';

interface WorkspaceState {
  [levelId: string]: CommandNode[];
}

interface CompletionState {
  [levelId: string]: boolean;
}

/**
 * Load workspace state for a specific level from localStorage
 */
export const loadWorkspace = (levelId: number): CommandNode[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const state: WorkspaceState = JSON.parse(stored);
    return state[levelId] || [];
  } catch (error) {
    console.error('Failed to load workspace from localStorage:', error);
    return [];
  }
};

/**
 * Save workspace state for a specific level to localStorage
 */
export const saveWorkspace = (levelId: number, workspace: CommandNode[]): void => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const state: WorkspaceState = stored ? JSON.parse(stored) : {};

    state[levelId] = workspace;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save workspace to localStorage:', error);
  }
};

/**
 * Clear workspace state for a specific level
 */
export const clearWorkspace = (levelId: number): void => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const state: WorkspaceState = JSON.parse(stored);
    delete state[levelId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to clear workspace from localStorage:', error);
  }
};

/**
 * Clear all workspace state
 */
export const clearAllWorkspaces = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear all workspaces from localStorage:', error);
  }
};

/**
 * Mark a level as completed
 */
export const markLevelComplete = (levelId: number): void => {
  try {
    const stored = localStorage.getItem(COMPLETION_KEY);
    const completions: CompletionState = stored ? JSON.parse(stored) : {};

    completions[levelId] = true;
    localStorage.setItem(COMPLETION_KEY, JSON.stringify(completions));
  } catch (error) {
    console.error('Failed to mark level as complete:', error);
  }
};

/**
 * Check if a level has been completed
 */
export const isLevelComplete = (levelId: number): boolean => {
  try {
    const stored = localStorage.getItem(COMPLETION_KEY);
    if (!stored) return false;

    const completions: CompletionState = JSON.parse(stored);
    return completions[levelId] || false;
  } catch (error) {
    console.error('Failed to check level completion:', error);
    return false;
  }
};

/**
 * Check if all levels have been completed
 */
export const areAllLevelsComplete = (totalLevels: number): boolean => {
  try {
    const stored = localStorage.getItem(COMPLETION_KEY);
    if (!stored) return false;

    const completions: CompletionState = JSON.parse(stored);

    // Check if all level IDs from 1 to totalLevels are marked as complete
    for (let i = 1; i <= totalLevels; i++) {
      if (!completions[i]) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Failed to check all levels completion:', error);
    return false;
  }
};

/**
 * Get list of completed level IDs
 */
export const getCompletedLevels = (): number[] => {
  try {
    const stored = localStorage.getItem(COMPLETION_KEY);
    if (!stored) return [];

    const completions: CompletionState = JSON.parse(stored);
    return Object.keys(completions)
      .filter(key => completions[key])
      .map(key => parseInt(key));
  } catch (error) {
    console.error('Failed to get completed levels:', error);
    return [];
  }
};
