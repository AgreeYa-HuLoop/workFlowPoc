import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef, OnInit,
  ViewChild,
} from '@angular/core';
import {
  FCreateNodeEvent, EFMarkerType,
  FCanvasComponent, FFlowModule, FZoomDirective,
  FReassignConnectionEvent, FCreateConnectionEvent,
  EFConnectableSide
} from '@foblex/flow';
import { GuidExtensions, IPoint, Point } from '@foblex/core';
import { ENodeType } from '../../domain/e-node-type';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { PaletteComponent } from '../palette/palette.component';
import { NodeComponent } from '../node/node.component';
import { FlowService } from '../../domain/flow.service';
import { IFlowViewModel } from '../../domain/i-flow-view-model';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'visual-programming-flow',
  templateUrl: './flow.component.html',
  styleUrls: [ './flow.component.scss' ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    FlowService
  ],
  imports: [
    FFlowModule,
    ToolbarComponent,
    PaletteComponent,
    NodeComponent,
    FormsModule,
    CommonModule
  ]
})
export class FlowComponent implements OnInit {

  @ViewChild("openForm") openForm: ElementRef | undefined;
  selectedNode: any;
   generateWf:any;
  protected viewModel: IFlowViewModel = {
    nodes: [],
    connections: []
  };
  public outputSide: EFConnectableSide = EFConnectableSide.RIGHT;
  public inputSide: EFConnectableSide = EFConnectableSide.TOP;
  @ViewChild(FCanvasComponent, { static: true })
  public fCanvasComponent!: FCanvasComponent;

  @ViewChild(FZoomDirective, { static: true })
  public fZoomDirective!: FZoomDirective;

  protected readonly eMarkerType = EFMarkerType;

  constructor(
    private apiService: FlowService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.generateWf = GuidExtensions.generate(),
    this.getData();
  }

  public onInitialized(): void {
    this.fCanvasComponent.fitToScreen(new Point(40, 40), false);
  }

  private getData(): void {
    this.viewModel = this.apiService.getFlow();
    this.changeDetectorRef.markForCheck();
  }

  public onNodeAdded(event: FCreateNodeEvent): void {
    this.apiService.addNode(event.data as ENodeType, event.rect,this.generateWf);
    this.getData();
  }

  public onReassignConnection(event: FReassignConnectionEvent): void {
    this.apiService.reassignConnection(event.fOutputId, event.oldFInputId, event.newFInputId);
    this.getData();
  }

  public onConnectionAdded(event: FCreateConnectionEvent): void {
    if (!event.fInputId) {
      alert("Start node won't accept input");
      return;
    }
    this.apiService.addConnection(event.fOutputId, event.fInputId ,this.viewModel);
    this.getData();
  }

  public onNodePositionChanged(point: IPoint, node: any): void {
    node.position = point;
    this.apiService.moveNode(node.nodeId, point);
    console.log(this.viewModel);
    
  }
  currentNode(value:any){
    console.log(value);
    this.selectedNode = value;
    if(this.selectedNode?.data?.length > 0)
    {
      this.openForm?.nativeElement.click();
    }

  }

  lineDrawMethod(connection:any){
    console.log(connection);
    if(connection.text=='Decision'){
      return 'segment'
    }
    else{
      return 'straight'
    }
   
    
  }
}
