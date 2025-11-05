import { AVAILABLE_COMMANDS } from '../data/commands';
import { CommandTile } from './CommandTile';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Layers, ArrowRight } from 'lucide-react';

function GroupTile({ groupType, label, icon: Icon }: { groupType: 'parallel' | 'sequential', label: string, icon: React.ElementType }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette-group-${groupType}`,
    data: {
      type: 'group',
      groupType,
      fromPalette: true,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md
        cursor-grab active:cursor-grabbing
        flex items-center gap-2
        transition-all hover:shadow-lg border-2 border-gray-600
        ${isDragging ? 'ring-2 ring-white' : ''}
      `}
    >
      <Icon size={16} />
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
}

export function CommandPalette() {
  return (
    <div className="w-64 bg-gray-800 p-4 flex flex-col gap-4 overflow-y-auto">
      <div>
        <h2 className="text-white font-bold mb-3 text-lg">Commands</h2>
        <div className="flex flex-col gap-2">
          {AVAILABLE_COMMANDS.map(command => (
            <CommandTile key={command.id} command={command} />
          ))}
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4">
        <h2 className="text-white font-bold mb-3 text-lg">Groups</h2>
        <div className="flex flex-col gap-2">
          <GroupTile groupType="sequential" label="Sequential" icon={ArrowRight} />
          <GroupTile groupType="parallel" label="Parallel" icon={Layers} />
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4 text-gray-400 text-xs">
        <p className="mb-2">💡 <strong>Sequential:</strong> Commands run one after another</p>
        <p><strong>Parallel:</strong> Commands run at the same time</p>
      </div>
    </div>
  );
}
