import { GuidExtensions, IHandler } from '@foblex/core';
import { AddNewNodeToFlowRequest } from './add-new-node-to-flow.request';
import { IFlowStorage } from '../../flow.storage';
import { FORM_CONFIGURATION } from '../../form.mapping';

export class AddNewNodeToFlowHandler implements IHandler<AddNewNodeToFlowRequest> {

  constructor(
    private flow: IFlowStorage
  ) {
  }

  public handle(request: AddNewNodeToFlowRequest): void {

    let formData = FORM_CONFIGURATION[request.type] ? FORM_CONFIGURATION[request.type] : [];


    let nodeObj: any = {
      nodeId: GuidExtensions.generate(),
      workflowId:'gou4515-5386-4ashu-8f77-214efbbe54b2',
      // input: GuidExtensions.generate(),
      // output: GuidExtensions.generate(),
      type: request.type,
      position: request.position,
      data: formData
    }

    if(request.type != 'Start')
    {
      nodeObj.input = GuidExtensions.generate()
    }

    if (request.type != 'End') {
      nodeObj.output = GuidExtensions.generate()
    }

    this.flow.nodes.push(nodeObj);
  }
}
