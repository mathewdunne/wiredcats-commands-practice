import { CommandNode, SolutionNode, ValidationResult } from '../types';

// Convert a CommandNode tree to a SolutionNode tree for comparison
function commandNodeToSolutionNode(node: CommandNode): SolutionNode {
  if (node.type === 'command') {
    return {
      type: 'command',
      commandId: node.commandId,
    };
  } else {
    return {
      type: 'group',
      groupType: node.groupType,
      children: node.children.map(commandNodeToSolutionNode),
    };
  }
}

// Deep comparison of two solution trees
function compareSolutionNodes(actual: SolutionNode, expected: SolutionNode): boolean {
  // Check type match
  if (actual.type !== expected.type) {
    return false;
  }

  if (actual.type === 'command' && expected.type === 'command') {
    return actual.commandId === expected.commandId;
  }

  if (actual.type === 'group' && expected.type === 'group') {
    // Check group type
    if (actual.groupType !== expected.groupType) {
      return false;
    }

    // Check children count
    if (actual.children.length !== expected.children.length) {
      return false;
    }

    // Check each child
    for (let i = 0; i < actual.children.length; i++) {
      if (!compareSolutionNodes(actual.children[i], expected.children[i])) {
        return false;
      }
    }

    return true;
  }

  return false;
}

// Validate workspace against solution
export function validateSolution(
  workspace: CommandNode[],
  solution: SolutionNode[]
): ValidationResult {
  // Check if workspace is empty
  if (workspace.length === 0 && solution.length > 0) {
    return {
      success: false,
      message: 'Workspace is empty! Drag commands and groups to build your solution.',
    };
  }

  // Check workspace length matches solution length
  if (workspace.length !== solution.length) {
    return {
      success: false,
      message: `Expected ${solution.length} top-level item(s), but found ${workspace.length}.`,
    };
  }

  // Convert workspace to solution format
  const workspaceSolution = workspace.map(commandNodeToSolutionNode);

  // Compare each top-level node
  for (let i = 0; i < workspaceSolution.length; i++) {
    if (!compareSolutionNodes(workspaceSolution[i], solution[i])) {
      return {
        success: false,
        message: 'Not quite right! Check the order and grouping of your commands.',
      };
    }
  }

  return {
    success: true,
    message: '🎉 Correct! Great job understanding command groups!',
  };
}
