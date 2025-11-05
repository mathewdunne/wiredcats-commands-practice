import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { CommandNode, ValidationResult } from './types';
import { LEVELS } from './data/levels';
import { AVAILABLE_COMMANDS, getCommandById } from './data/commands';
import { validateSolution } from './utils/validation';
import {
  createCommandInstance,
  createGroupInstance,
  removeNode,
} from './utils/commandStructure';
import { CommandPalette } from './components/CommandPalette';
import { WorkArea } from './components/WorkArea';
import { LevelHeader } from './components/LevelHeader';
import { ValidationButton } from './components/ValidationButton';
import { CommandTile } from './components/CommandTile';

function App() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [workspace, setWorkspace] = useState<CommandNode[]>([]);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const currentLevel = LEVELS[currentLevelIndex];

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    // Dragging from palette
    if (activeData?.fromPalette) {
      if (activeData.type === 'command') {
        const newCommand = createCommandInstance(activeData.commandId);

        if (overData?.type === 'workspace-root') {
          // Add to root workspace
          setWorkspace(prev => [...prev, newCommand]);
        } else if (overData?.type === 'group-container') {
          // Add to group
          setWorkspace(prev => addToGroup(prev, overData.groupInstanceId, newCommand));
        }
      } else if (activeData.type === 'group') {
        const newGroup = createGroupInstance(activeData.groupType);

        if (overData?.type === 'workspace-root') {
          // Add to root workspace
          setWorkspace(prev => [...prev, newGroup]);
        } else if (overData?.type === 'group-container') {
          // Add to another group
          setWorkspace(prev => addToGroup(prev, overData.groupInstanceId, newGroup));
        }
      }
    }
    // Moving within workspace
    else if (activeData?.instanceId) {
      const instanceId = activeData.instanceId;

      // Remove from current position
      const removed = findAndRemoveNode(workspace, instanceId);
      if (!removed) return;

      const { node, newWorkspace } = removed;

      if (overData?.type === 'workspace-root') {
        // Move to root workspace
        setWorkspace([...newWorkspace, node]);
      } else if (overData?.type === 'group-container') {
        // Move to group
        setWorkspace(addToGroup(newWorkspace, overData.groupInstanceId, node));
      } else {
        // Invalid drop, restore original workspace
        setWorkspace(workspace);
      }
    }

    // Clear validation on workspace change
    setValidationResult(null);
  };

  // Helper to add node to a group
  const addToGroup = (
    nodes: CommandNode[],
    groupId: string,
    newNode: CommandNode
  ): CommandNode[] => {
    return nodes.map(node => {
      if (node.instanceId === groupId && node.type === 'group') {
        return {
          ...node,
          children: [...node.children, newNode],
        };
      }
      if (node.type === 'group') {
        return {
          ...node,
          children: addToGroup(node.children, groupId, newNode),
        };
      }
      return node;
    });
  };

  // Helper to find and remove a node
  const findAndRemoveNode = (
    nodes: CommandNode[],
    instanceId: string
  ): { node: CommandNode; newWorkspace: CommandNode[] } | null => {
    // Check if it's in the root
    const rootNode = nodes.find(n => n.instanceId === instanceId);
    if (rootNode) {
      return {
        node: rootNode,
        newWorkspace: nodes.filter(n => n.instanceId !== instanceId),
      };
    }

    // Search in groups
    for (const node of nodes) {
      if (node.type === 'group') {
        const found = findNodeInGroup(node, instanceId);
        if (found) {
          return {
            node: found,
            newWorkspace: removeNode(nodes, instanceId),
          };
        }
      }
    }

    return null;
  };

  // Helper to find node in group
  const findNodeInGroup = (group: CommandNode, instanceId: string): CommandNode | null => {
    if (group.type === 'group') {
      const child = group.children.find(c => c.instanceId === instanceId);
      if (child) return child;

      for (const child of group.children) {
        const found = findNodeInGroup(child, instanceId);
        if (found) return found;
      }
    }
    return null;
  };

  // Handle node removal
  const handleRemoveNode = (instanceId: string) => {
    setWorkspace(prev => removeNode(prev, instanceId));
    setValidationResult(null);
  };

  // Handle validation
  const handleCheck = () => {
    const result = validateSolution(workspace, currentLevel.solution);
    setValidationResult(result);
  };

  // Handle reset
  const handleReset = () => {
    setWorkspace([]);
    setValidationResult(null);
  };

  // Handle level navigation
  const handlePrevLevel = () => {
    if (currentLevelIndex > 0) {
      setCurrentLevelIndex(prev => prev - 1);
      handleReset();
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < LEVELS.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
      handleReset();
    }
  };

  // Get active drag item for overlay
  const getActiveDragItem = () => {
    if (!activeId) return null;

    if (activeId.startsWith('palette-')) {
      const commandId = activeId.replace('palette-', '').replace('group-', '');
      if (commandId === 'sequential' || commandId === 'parallel') {
        return null; // We'll handle groups differently
      }
      const command = getCommandById(commandId);
      if (command) {
        return <CommandTile command={command} />;
      }
    }

    return null;
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col">
        <LevelHeader
          level={currentLevel}
          currentLevelIndex={currentLevelIndex}
          totalLevels={LEVELS.length}
          onPrevLevel={handlePrevLevel}
          onNextLevel={handleNextLevel}
        />

        <div className="flex-1 flex overflow-hidden">
          <CommandPalette />
          <WorkArea workspace={workspace} onRemoveNode={handleRemoveNode} />
        </div>

        <ValidationButton
          onCheck={handleCheck}
          onReset={handleReset}
          validationResult={validationResult}
        />
      </div>

      <DragOverlay>{getActiveDragItem()}</DragOverlay>
    </DndContext>
  );
}

export default App;
