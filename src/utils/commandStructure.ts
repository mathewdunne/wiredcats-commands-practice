import { CommandNode, CommandGroupInstance, CommandInstance } from '../types';

// Generate unique IDs for instances
let instanceCounter = 0;
export function generateInstanceId(): string {
  return `instance-${instanceCounter++}`;
}

// Create a new command instance from a command ID
export function createCommandInstance(commandId: string): CommandInstance {
  return {
    type: 'command',
    instanceId: generateInstanceId(),
    commandId,
  };
}

// Create a new group instance
export function createGroupInstance(
  groupType: 'parallel' | 'sequential',
  children: CommandNode[] = []
): CommandGroupInstance {
  return {
    type: 'group',
    instanceId: generateInstanceId(),
    groupType,
    children,
  };
}

// Find a node by instance ID in a tree
export function findNodeById(
  nodes: CommandNode[],
  instanceId: string
): CommandNode | null {
  for (const node of nodes) {
    if (node.instanceId === instanceId) {
      return node;
    }
    if (node.type === 'group') {
      const found = findNodeById(node.children, instanceId);
      if (found) return found;
    }
  }
  return null;
}

// Find parent of a node by instance ID
export function findParentOfNode(
  nodes: CommandNode[],
  instanceId: string,
  parent: CommandGroupInstance | null = null
): CommandGroupInstance | null {
  for (const node of nodes) {
    if (node.instanceId === instanceId) {
      return parent;
    }
    if (node.type === 'group') {
      const found = findParentOfNode(node.children, instanceId, node);
      if (found !== null) return found;
    }
  }
  return null;
}

// Remove a node from the tree
export function removeNode(nodes: CommandNode[], instanceId: string): CommandNode[] {
  return nodes
    .filter(node => node.instanceId !== instanceId)
    .map(node => {
      if (node.type === 'group') {
        return {
          ...node,
          children: removeNode(node.children, instanceId),
        };
      }
      return node;
    });
}

// Insert a node at a specific position
export function insertNode(
  nodes: CommandNode[],
  newNode: CommandNode,
  index: number
): CommandNode[] {
  const result = [...nodes];
  result.splice(index, 0, newNode);
  return result;
}
