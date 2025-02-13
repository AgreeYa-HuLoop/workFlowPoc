import { ENodeType } from '../e-node-type';
import { IPoint } from '@foblex/core';

export interface IFlowNodeStorageModel {

  nodeId: string;

  input?: string;

  output?: string;

  type: ENodeType;

  position: IPoint;

  data?: any;

}
