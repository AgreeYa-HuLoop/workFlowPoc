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

    this.flow.nodes.push({
      id: GuidExtensions.generate(),
      input: GuidExtensions.generate(),
      output: GuidExtensions.generate(),
      type: request.type,
      position: request.position,
      data: formData
    });
  }
}
