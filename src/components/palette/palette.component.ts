import {
  ChangeDetectionStrategy, Component,
} from '@angular/core';
import { FFlowModule } from '@foblex/flow';
import { ENodeType } from '../../domain/e-node-type';
import { NODE_CONFIGURATION } from '../../domain/configuration';
import { FlowService } from '../../domain/flow.service';

@Component({
  selector: 'visual-programming-palette',
  templateUrl: './palette.component.html',
  styleUrls: [ './palette.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FFlowModule,
  ]
})
export class PaletteComponent {

  constructor(private flowService: FlowService)
  {}

  protected palette = Object.keys(NODE_CONFIGURATION).map((key) => {
    return {
      type: key,
      color: NODE_CONFIGURATION[ key as ENodeType ].color,
      text: NODE_CONFIGURATION[ key as ENodeType ].text,
      conf:NODE_CONFIGURATION[ key as ENodeType ].config,
    }
  });

  publish(){
    console.log(this.flowService.getFlow());
  }

  Execute(){
    
  }
}
