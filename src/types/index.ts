// Base command that can be dragged from palette
export interface Command {
  id: string;
  name: string;
  color: string; // Tailwind color class
}

// Type of command group
export type GroupType = 'parallel' | 'sequential';

// A node in the command tree - can be a command or a group
export type CommandNode = CommandInstance | CommandGroupInstance;

// Instance of a command in the workspace (has unique instance ID)
export interface CommandInstance {
  type: 'command';
  instanceId: string; // Unique ID for this instance
  commandId: string; // Reference to the base command
}

// Instance of a command group
export interface CommandGroupInstance {
  type: 'group';
  instanceId: string;
  groupType: GroupType;
  children: CommandNode[];
}

// Level/Challenge definition
export interface Level {
  id: number;
  title: string;
  description: string;
  solution: SolutionNode[];
}

// Solution representation (simpler, no instance IDs)
export type SolutionNode = SolutionCommand | SolutionGroup;

export interface SolutionCommand {
  type: 'command';
  commandId: string;
}

export interface SolutionGroup {
  type: 'group';
  groupType: GroupType;
  children: SolutionNode[];
}

// Validation result
export interface ValidationResult {
  success: boolean;
  message: string;
}
