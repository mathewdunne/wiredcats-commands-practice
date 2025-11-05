import type { Command } from '../types';

// Available commands that can be dragged from the palette
// Easy to add more commands here - just add to the array
export const AVAILABLE_COMMANDS: Command[] = [
  {
    id: 'drive-to-reef',
    name: 'Drive to Pose (Reef)',
    color: 'bg-blue-500',
  },
  {
    id: 'drive-to-net',
    name: 'Drive to Pose (Net)',
    color: 'bg-cyan-500',
  },
  {
    id: 'drive-to-hp',
    name: 'Drive to Pose (Human Player Station)',
    color: 'bg-teal-500',
  },
  {
    id: 'raise-arm',
    name: 'Raise Arm',
    color: 'bg-purple-500',
  },
  {
    id: 'raise-elevator',
    name: 'Raise Elevator',
    color: 'bg-violet-500',
  },
  {
    id: 'feed-coral',
    name: 'Feed Coral and Handoff',
    color: 'bg-orange-500',
  },
  {
    id: 'spin-intake',
    name: 'Spin Intake Wheels (Algae)',
    color: 'bg-green-500',
  },
  {
    id: 'eject-algae',
    name: 'Eject Algae',
    color: 'bg-lime-500',
  },
  {
    id: 'slam-coral',
    name: 'Place (Slam) Coral',
    color: 'bg-red-500',
  },
  {
    id: 'lower-arm',
    name: 'Lower Arm',
    color: 'bg-pink-500',
  },
  {
    id: 'lower-elevator',
    name: 'Lower Elevator',
    color: 'bg-fuchsia-500',
  },
];

// Helper to get command by ID
export const getCommandById = (id: string): Command | undefined => {
  return AVAILABLE_COMMANDS.find(cmd => cmd.id === id);
};
