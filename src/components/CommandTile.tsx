import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Command } from '../types';
import { X } from 'lucide-react';

interface CommandTileProps {
  command: Command;
  instanceId?: string;
  isInWorkspace?: boolean;
  onRemove?: () => void;
}

export function CommandTile({ command, instanceId, isInWorkspace = false, onRemove }: CommandTileProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: instanceId || `palette-${command.id}`,
    data: {
      type: 'command',
      commandId: command.id,
      instanceId,
      fromPalette: !isInWorkspace,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`
        ${command.color} text-white px-4 py-2 rounded-lg shadow-md
        flex items-center justify-between gap-2
        transition-all hover:shadow-lg
        ${isDragging ? 'ring-2 ring-white' : ''}
      `}
    >
      <span
        {...listeners}
        className="font-medium text-sm cursor-grab active:cursor-grabbing flex-1"
      >
        {command.name}
      </span>
      {isInWorkspace && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onRemove();
          }}
          className="hover:bg-white/20 rounded p-0.5 transition-colors cursor-pointer z-10"
          aria-label="Remove command"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
