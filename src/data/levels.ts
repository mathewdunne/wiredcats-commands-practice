import type { Level } from '../types';

// Define levels/challenges here
// Easy to add more levels - just add to the array
export const LEVELS: Level[] = [
  {
    id: 1,
    title: 'Score Coral',
    description: 'You are already holding a coral. Raise the arm and elevator while driving to the reef, place the coral, then lower the arm and elevator to stow position.',
    solution: [
      {
        type: 'group',
        groupType: 'sequential',
        children: [
          {
            type: 'group',
            groupType: 'parallel',
            children: [
              { type: 'command', commandId: 'raise-arm' },
              { type: 'command', commandId: 'raise-elevator' },
              { type: 'command', commandId: 'drive-to-reef' },
            ],
          },
          { type: 'command', commandId: 'slam-coral' },
          {
            type: 'group',
            groupType: 'parallel',
            children: [
              { type: 'command', commandId: 'lower-arm' },
              { type: 'command', commandId: 'lower-elevator' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Intake Algae',
    description: 'Position the mechanism to intake algae. Raise the arm and elevator into position, then start spinning the intake wheels.',
    solution: [
      {
        type: 'group',
        groupType: 'sequential',
        children: [
          {
            type: 'group',
            groupType: 'parallel',
            children: [
              { type: 'command', commandId: 'raise-arm' },
              { type: 'command', commandId: 'raise-elevator' },
            ],
          },
          { type: 'command', commandId: 'spin-intake' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Score Algae',
    description: 'Drive to the net, eject the algae to score, then reset the arm and elevator back to stow position.',
    solution: [
      {
        type: 'group',
        groupType: 'sequential',
        children: [
          { type: 'command', commandId: 'drive-to-net' },
          { type: 'command', commandId: 'eject-algae' },
          {
            type: 'group',
            groupType: 'parallel',
            children: [
              { type: 'command', commandId: 'lower-arm' },
              { type: 'command', commandId: 'lower-elevator' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: '3 Coral Auto',
    description: 'Starting with a coral preloaded, score it at the reef, reset the mechanism, reload from the Human Player Station, and repeat the cycle two more times for a total of 3 corals scored.',
    solution: [
      {
        type: 'group',
        groupType: 'sequential',
        children: [
          // First coral (already loaded)
          { type: 'command', commandId: 'drive-to-reef' },
          { type: 'command', commandId: 'slam-coral' },
          {
            type: 'group',
            groupType: 'parallel',
            children: [
              { type: 'command', commandId: 'lower-arm' },
              { type: 'command', commandId: 'lower-elevator' },
            ],
          },
          // Second coral
          { type: 'command', commandId: 'drive-to-hp' },
          { type: 'command', commandId: 'feed-coral' },
          { type: 'command', commandId: 'drive-to-reef' },
          { type: 'command', commandId: 'slam-coral' },
          {
            type: 'group',
            groupType: 'parallel',
            children: [
              { type: 'command', commandId: 'lower-arm' },
              { type: 'command', commandId: 'lower-elevator' },
            ],
          },
          // Third coral
          { type: 'command', commandId: 'drive-to-hp' },
          { type: 'command', commandId: 'feed-coral' },
          { type: 'command', commandId: 'drive-to-reef' },
          { type: 'command', commandId: 'slam-coral' },
          {
            type: 'group',
            groupType: 'parallel',
            children: [
              { type: 'command', commandId: 'lower-arm' },
              { type: 'command', commandId: 'lower-elevator' },
            ],
          },
        ],
      },
    ],
  },
];

// Helper to get level by ID
export const getLevelById = (id: number): Level | undefined => {
  return LEVELS.find(level => level.id === id);
};
