import { ENodeType } from './e-node-type';
import { IFlowNodeStorageModel } from './node/i-flow-node-storage-model';
import { IFlowConnectionStorageModel } from './connection/i-flow-connection-storage-model';

export interface IFlowStorage {

  nodes: IFlowNodeStorageModel[];

  connections: IFlowConnectionStorageModel[];
}

export const FLOW_STORAGE: IFlowStorage = {

  nodes: [],
  connections: [
    
  ]
};
