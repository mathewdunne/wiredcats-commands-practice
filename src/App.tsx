import { useState, useEffect, useRef } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import type { CommandNode, ValidationResult } from './types';
import { LEVELS } from './data/levels';
import { getCommandById } from './data/commands';
import { validateSolution } from './utils/validation';
import {
  createCommandInstance,
  createGroupInstance,
  removeNode,
} from './utils/commandStructure';
import { loadWorkspace, saveWorkspace, clearWorkspace, markLevelComplete, isLevelComplete, areAllLevelsComplete } from './utils/persistence';
import { CommandPalette } from './components/CommandPalette';
import { WorkArea } from './components/WorkArea';
import { LevelHeader } from './components/LevelHeader';
import { ValidationButton } from './components/ValidationButton';
import { CommandTile } from './components/CommandTile';
import { CongratulationsModal } from './components/CongratulationsModal';
import { Layers, ArrowRight } from 'lucide-react';

function App() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [workspace, setWorkspace] = useState<CommandNode[]>([]);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const isLoadingRef = useRef(false);

  const currentLevel = LEVELS[currentLevelIndex];

  // Load workspace from localStorage on mount and when level changes
  useEffect(() => {
    isLoadingRef.current = true;
    const savedWorkspace = loadWorkspace(currentLevel.id);
    setWorkspace(savedWorkspace);

    // Check if loaded workspace is correct and show validation result
    if (savedWorkspace.length > 0) {
      const result = validateSolution(savedWorkspace, currentLevel.solution);
      if (result.success) {
        setValidationResult(result);
      } else {
        setValidationResult(null);
      }
    } else {
      setValidationResult(null);
    }

    // Allow saving after loading is complete
    setTimeout(() => {
      isLoadingRef.current = false;
    }, 0);
  }, [currentLevel.id, currentLevel.solution]);

  // Save workspace to localStorage whenever it changes (but not during loading)
  useEffect(() => {
    if (!isLoadingRef.current) {
      saveWorkspace(currentLevel.id, workspace);
    }
  }, [workspace, currentLevel.id]);

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    const activeData = active.data.current;
    const overData = over?.data.current;

    // Dragging from palette
    if (activeData?.fromPalette) {
      // Only add if there's a valid drop target
      if (!over) return;

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
    // Moving within workspace - items can only be moved, never deleted by dragging
    else if (activeData?.instanceId) {
      const instanceId = activeData.instanceId;

      // If no valid drop target OR dropped on invalid location, keep item in place (do nothing)
      if (!over || (!overData?.type || (overData.type !== 'workspace-root' && overData.type !== 'group-container'))) {
        return; // Item stays in original position
      }

      // Don't allow dropping on itself
      if (over.id === instanceId) {
        return;
      }

      // Don't allow dropping a group into itself
      if (overData.type === 'group-container' && overData.groupInstanceId === instanceId) {
        return;
      }

      // Remove from current position
      const removed = findAndRemoveNode(workspace, instanceId);
      if (!removed) return;

      const { node, newWorkspace } = removed;

      if (overData.type === 'workspace-root') {
        // Move to root workspace
        setWorkspace([...newWorkspace, node]);
      } else if (overData.type === 'group-container') {
        // Move to group
        setWorkspace(addToGroup(newWorkspace, overData.groupInstanceId, node));
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
    console.log(workspace)
    const result = validateSolution(workspace, currentLevel.solution);
    setValidationResult(result);

    // If successful and not previously completed, mark as complete
    if (result.success && !isLevelComplete(currentLevel.id)) {
      markLevelComplete(currentLevel.id);

      // Check if all levels are now complete
      if (areAllLevelsComplete(LEVELS.length)) {
          // Show congratulations modal after a short delay
          setTimeout(() => {
              setShowCongratulations(true);
          }, 500);
      }
    }
  };

  // Handle reset
  const handleReset = () => {
    setWorkspace([]);
    setValidationResult(null);
    clearWorkspace(currentLevel.id);
  };

  // Handle level navigation
  const handlePrevLevel = () => {
    if (currentLevelIndex > 0) {
      setCurrentLevelIndex(prev => prev - 1);
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < LEVELS.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
    }
  };

  // Get active drag item for overlay
  const getActiveDragItem = () => {
    if (!activeId) return null;

    // Handle group dragging from palette
    if (activeId === 'palette-group-sequential' || activeId === 'palette-group-parallel') {
      const groupType = activeId === 'palette-group-sequential' ? 'sequential' : 'parallel';
      const Icon = groupType === 'parallel' ? Layers : ArrowRight;
      const label = groupType === 'parallel' ? 'Parallel' : 'Sequential';

      return (
        <div className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md border-2 border-gray-600 flex items-center gap-2 opacity-90">
          <Icon size={16} />
          <span className="font-medium text-sm">{label}</span>
        </div>
      );
    }

    // Handle command dragging from palette
    if (activeId.startsWith('palette-')) {
      const commandId = activeId.replace('palette-', '');
      const command = getCommandById(commandId);
      if (command) {
        return <CommandTile command={command} />;
      }
    }

    // Handle dragging items already in workspace
    const node = findNodeInWorkspace(workspace, activeId as string);
    if (node) {
      if (node.type === 'command') {
        const command = getCommandById(node.commandId);
        if (command) {
          return <CommandTile command={command} />;
        }
      } else {
        const Icon = node.groupType === 'parallel' ? Layers : ArrowRight;
        const label = node.groupType === 'parallel' ? 'Parallel' : 'Sequential';

        return (
          <div className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md border-2 border-gray-600 flex items-center gap-2 opacity-90">
            <Icon size={16} />
            <span className="font-medium text-sm">{label} Group</span>
          </div>
        );
      }
    }

    return null;
  };

  // Helper to find node in workspace by ID
  const findNodeInWorkspace = (nodes: CommandNode[], id: string): CommandNode | null => {
    for (const node of nodes) {
      if (node.instanceId === id) return node;
      if (node.type === 'group') {
        const found = findNodeInWorkspace(node.children, id);
        if (found) return found;
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
          isComplete={validationResult?.success || false}
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
      <CongratulationsModal
        isOpen={showCongratulations}
        onClose={() => setShowCongratulations(false)}
      />
    </DndContext>
  );
}

export default App;
