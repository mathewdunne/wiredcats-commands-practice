import { Level } from '../types';

// Define levels/challenges here
// Easy to add more levels - just add to the array
export const LEVELS: Level[] = [
  {
    id: 1,
    title: 'Aim at Speaker',
    description: 'Create a command group that aims at the speaker and shoots. You need to spin up the shooter while driving to the correct position, then raise the elevator, and finally shoot.',
    solution: [
      {
        type: 'group',
        groupType: 'sequential',
        children: [
          {
            type: 'group',
            groupType: 'parallel',
            children: [
              { type: 'command', commandId: 'spin-shooter' },
              { type: 'command', commandId: 'drive-to-pose' },
            ],
          },
          { type: 'command', commandId: 'raise-elevator' },
          { type: 'command', commandId: 'shoot' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Quick Shot',
    description: 'Shoot as quickly as possible. Spin the shooter, raise the elevator, and shoot - all in sequence.',
    solution: [
      {
        type: 'group',
        groupType: 'sequential',
        children: [
          { type: 'command', commandId: 'spin-shooter' },
          { type: 'command', commandId: 'raise-elevator' },
          { type: 'command', commandId: 'shoot' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Parallel Preparation',
    description: 'Prepare for a shot by spinning the shooter and raising the elevator at the same time.',
    solution: [
      {
        type: 'group',
        groupType: 'parallel',
        children: [
          { type: 'command', commandId: 'spin-shooter' },
          { type: 'command', commandId: 'raise-elevator' },
        ],
      },
    ],
  },
];

// Helper to get level by ID
export const getLevelById = (id: number): Level | undefined => {
  return LEVELS.find(level => level.id === id);
};
