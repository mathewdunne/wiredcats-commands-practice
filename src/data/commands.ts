import { Command } from '../types';

// Available commands that can be dragged from the palette
// Easy to add more commands here - just add to the array
export const AVAILABLE_COMMANDS: Command[] = [
  {
    id: 'spin-shooter',
    name: 'Spin Shooter',
    color: 'bg-blue-500',
  },
  {
    id: 'drive-to-pose',
    name: 'Drive to Pose',
    color: 'bg-green-500',
  },
  {
    id: 'raise-elevator',
    name: 'Raise Elevator',
    color: 'bg-purple-500',
  },
  {
    id: 'shoot',
    name: 'Shoot',
    color: 'bg-red-500',
  },
];

// Helper to get command by ID
export const getCommandById = (id: string): Command | undefined => {
  return AVAILABLE_COMMANDS.find(cmd => cmd.id === id);
};
