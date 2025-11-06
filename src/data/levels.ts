import type { Level } from '../types';

// Define levels/challenges here
// Easy to add more levels - just add to the array
export const LEVELS: Level[] = [
  {
    id: 1,
    title: 'Intake Algae',
    description: 'Position the mechanism to intake algae (move arm and elevator), then start spinning the intake wheels. No driving is needed for this command group.',
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
    id: 2,
    title: 'Score Algae',
    description: 'Drive to the net, then raise the arm and elevator (we don\'t want the arm and elevator up while we drive, or the robot might tip!). Eject the algae to score, then reset the arm and elevator back to stow position.',
    solution: [
      {
        type: 'group',
        groupType: 'sequential',
        children: [
          { type: 'command', commandId: 'drive-to-net' },
          {
            type: 'group',
            groupType: 'parallel',
            children: [
              { type: 'command', commandId: 'raise-arm' },
              { type: 'command', commandId: 'raise-elevator' },
            ],
          },
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
    id: 3,
    title: 'Score Coral',
    description: 'Imagine the robot is already holding a coral. You need it to raise the arm and elevator while driving to the reef, place the coral, then lower the arm and elevator to stow position.',
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
    id: 4,
    title: '3 Coral Auto',
    description: 'Starting with a coral preloaded, score it at the reef, reset the mechanism, reload from the Human Player Station (reset the mechanism and start the feeder while driving to save time!), and repeat the cycle two more times for a total of 3 corals scored.',
    solution: [
      {
        type: 'group',
        groupType: 'sequential',
        children: [
          // First coral (already loaded)
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
          // Second coral (reload and score)
          {
            type: 'group',
            groupType: 'parallel',
            children: [
              { type: 'command', commandId: 'lower-arm' },
              { type: 'command', commandId: 'lower-elevator' },
              { type: 'command', commandId: 'drive-to-hp' },
              { type: 'command', commandId: 'feed-coral'}
            ],
          },
          { type: 'group',
            groupType: 'parallel',
            children: [
              { type: 'command', commandId: 'raise-arm' },
              { type: 'command', commandId: 'raise-elevator' },
              { type: 'command', commandId: 'drive-to-reef' },
            ],
          },
          { type: 'command', commandId: 'slam-coral' },
          // Third coral (reload and score)
          {
            type: 'group',
            groupType: 'parallel',
            children: [
              { type: 'command', commandId: 'lower-arm' },
              { type: 'command', commandId: 'lower-elevator' },
              { type: 'command', commandId: 'drive-to-hp' },
              { type: 'command', commandId: 'feed-coral'}
            ],
          },
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
        ],
      },
    ],
  },
];

// Helper to get level by ID
export const getLevelById = (id: number): Level | undefined => {
  return LEVELS.find(level => level.id === id);
};
