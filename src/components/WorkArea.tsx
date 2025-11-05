import { useDroppable } from '@dnd-kit/core';
import { CommandNode } from '../types';
import { CommandTile } from './CommandTile';
import { GroupContainer } from './GroupContainer';
import { getCommandById } from '../data/commands';

interface WorkAreaProps {
  workspace: CommandNode[];
  onRemoveNode: (nodeId: string) => void;
}

export function WorkArea({ workspace, onRemoveNode }: WorkAreaProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'workspace-root',
    data: {
      type: 'workspace-root',
      accepts: ['command', 'group'],
    },
  });

  return (
    <div className="flex-1 bg-gray-900 p-6 overflow-y-auto">
      <div
        ref={setNodeRef}
        className={`
          min-h-full border-2 border-dashed rounded-lg p-4
          transition-all
          ${isOver ? 'border-yellow-400 bg-gray-800/50' : 'border-gray-700 bg-gray-800/30'}
        `}
      >
        {workspace.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-[400px]">
            <div className="text-gray-500 text-center">
              <p className="text-xl font-semibold mb-2">Workspace Empty</p>
              <p className="text-sm">Drag commands and groups here to build your solution</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {workspace.map(node => (
              <div key={node.instanceId}>
                {node.type === 'command' ? (
                  <CommandTile
                    command={getCommandById(node.commandId)!}
                    instanceId={node.instanceId}
                    isInWorkspace
                    onRemove={() => onRemoveNode(node.instanceId)}
                  />
                ) : (
                  <GroupContainer
                    group={node}
                    onRemove={() => onRemoveNode(node.instanceId)}
                    onRemoveChild={onRemoveNode}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
