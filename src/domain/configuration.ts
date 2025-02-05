import { ENodeType } from './e-node-type';

export const NODE_CONFIGURATION = {
  [ ENodeType.Input ]: {
    color: '#e0575b',
    text: 'Start',
    config: { type: 'text', name: 'name' }
  },
  [ ENodeType.Assign ]: {
    color: '#9f6a00',
    text: 'Assign',
    config: { type: 'text', name: 'name' }
  },
  [ ENodeType.Switch ]: {
    color: '#8e5cd9',
    text: 'Decision',
    config: { type: 'text', name: 'name' }
  },
  [ ENodeType.Cycle ]: {
    color: '#8e5cd9',
    text: 'Cycle',
    config: { type: 'text', name: 'name' }
  },
  [ ENodeType.Error ]: {
    color: '#ec8a82',
    text: 'Error',
    config: { type: 'text', name: 'name' }
  },
  [ ENodeType.Database ]: {
    color: '#30a46c',
    text: 'Database',
    config: { type: 'text', name: 'name' }
  },
  [ ENodeType.Hash ]: {
    color: '#8e5cd9',
    text: 'Function',
    config: { type: 'text', name: 'name' }
  },
  [ ENodeType.End ]: {
    color: '#8e5cd9',
    text: 'End',
    config: { type: 'text', name: 'name' }
  },
};
