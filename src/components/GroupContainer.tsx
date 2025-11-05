import { useDroppable } from '@dnd-kit/core';
import { CommandGroupInstance } from '../types';
import { CommandTile } from './CommandTile';
import { getCommandById } from '../data/commands';
import { Layers, ArrowRight, X } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface GroupContainerProps {
  group: CommandGroupInstance;
  onRemove?: () => void;
  onRemoveChild: (childId: string) => void;
  depth?: number;
}

export function GroupContainer({ group, onRemove, onRemoveChild, depth = 0 }: GroupContainerProps) {
  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: group.instanceId,
    data: {
      type: 'group-container',
      groupInstanceId: group.instanceId,
      accepts: ['command', 'group'],
    },
  });

  const { attributes, listeners, setNodeRef: setDragRef, transform, isDragging } = useDraggable({
    id: group.instanceId,
    data: {
      type: 'group',
      instanceId: group.instanceId,
      groupType: group.groupType,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0 : 1,
  };

  const Icon = group.groupType === 'parallel' ? Layers : ArrowRight;
  const bgColor = group.groupType === 'parallel' ? 'bg-gray-700' : 'bg-gray-600';
  const label = group.groupType === 'parallel' ? 'Parallel' : 'Sequential';

  return (
    <div
      ref={setDragRef}
      style={style}
      className={`
        ${bgColor} rounded-lg p-3 border-2 transition-all
        ${isOver ? 'border-yellow-400 bg-opacity-80' : 'border-gray-500'}
        ${isDragging ? 'ring-2 ring-white' : ''}
      `}
    >
      {/* Group Header */}
      <div
        {...attributes}
        className="flex items-center justify-between mb-2"
      >
        <div
          {...listeners}
          className="flex items-center gap-2 text-white cursor-grab active:cursor-grabbing flex-1"
        >
          <Icon size={16} />
          <span className="font-semibold text-sm">{label} Group</span>
        </div>
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onRemove();
            }}
            className="hover:bg-white/20 rounded p-1 transition-colors text-white cursor-pointer z-10"
            aria-label="Remove group"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Drop Zone for Children */}
      <div
        ref={setDropRef}
        className={`
          min-h-[60px] rounded p-2
          ${isOver ? 'bg-yellow-400/20' : 'bg-black/20'}
          flex ${group.groupType === 'parallel' ? 'flex-row flex-wrap' : 'flex-col'} gap-2
        `}
      >
        {group.children.length === 0 ? (
          <div className="text-gray-400 text-xs italic text-center w-full py-2">
            Drop commands or groups here
          </div>
        ) : (
          group.children.map(child => (
            <div key={child.instanceId}>
              {child.type === 'command' ? (
                <CommandTile
                  command={getCommandById(child.commandId)!}
                  instanceId={child.instanceId}
                  isInWorkspace
                  onRemove={() => onRemoveChild(child.instanceId)}
                />
              ) : (
                <GroupContainer
                  group={child}
                  onRemove={() => onRemoveChild(child.instanceId)}
                  onRemoveChild={onRemoveChild}
                  depth={depth + 1}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
