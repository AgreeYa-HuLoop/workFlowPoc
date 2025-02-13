import {
  ChangeDetectionStrategy, Component,
} from '@angular/core';
import { FFlowModule } from '@foblex/flow';
import { ENodeType } from '../../domain/e-node-type';
import { NODE_CONFIGURATION } from '../../domain/configuration';
import { FlowService } from '../../domain/flow.service';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'visual-programming-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FFlowModule,
    CommonModule,
   HttpClientModule
  ],
  providers:[FlowService]
})
export class PaletteComponent {

  updatedFlow: any;
  constructor(private flowService: FlowService,
     private http: HttpClient
  )
  {}

  protected palette = Object.keys(NODE_CONFIGURATION).map((key) => {
    return {
      type: key,
      color: NODE_CONFIGURATION[key as ENodeType].color,
      text: NODE_CONFIGURATION[key as ENodeType].text,
      conf: NODE_CONFIGURATION[key as ENodeType].config,
    }
  });

  publish() {
    this.updatedFlow = this.flowService.getFlow();
    console.log(this.flowService.getFlow());

    let startNodeOutputId = '';
    let endNodeInputId = '';
    let catchError = '';

    // Throw error if start node or end node is missing
    let startNodeCheck = false;
    let endNodeCheck = false;
    this.updatedFlow.nodes.forEach((node: any) => {
      if (node.type == 'Start') {
        startNodeCheck = true;
        startNodeOutputId = node.output;
      }
      if (node.type == 'End') {
        endNodeCheck = true;
        endNodeInputId = node.input;
      }
    });

    if (!startNodeCheck) {
      alert("Please create a Start node");
      return;
    }

    if (!endNodeCheck) {
      alert("Can't publish without End node");
      return;
    }


    // Throw error if start node doen't haver or end node is missing
    let startNodeConnectionCheck = false;
    let endNodeConnectionCheck = false;
    
    this.updatedFlow.connections.forEach((node: any) => {
      if(node.from == startNodeOutputId)
      {
        startNodeConnectionCheck = true;
      }

      if(node.to == endNodeInputId)
      {
        endNodeConnectionCheck = true
      }
    });

    if (!startNodeConnectionCheck) {
      alert("Start node doesn't have any output");
      return;
    }

    if (!endNodeConnectionCheck) {
      alert("End node doesn't have any Input");
      return;
    }

    //Throw error if a node is not connected with the flow
    let inputConnectionCheck =  false;
    let outputConnectionCheck =  false;

    this.updatedFlow.nodes.forEach((node: any) => {
        if(node.type != 'Start' && node.type != 'End' )
        { 
          let input = node.input;
          let output = node.output;

          this.updatedFlow.connections.forEach((connection: any)=>
          {
            let validateInput = false;
            let validateOutput = false;

            if(startNodeOutputId != connection.from || endNodeInputId != connection.to)
            {
              if(connection.from == output)
              {
                validateInput = true;
              }
              if(connection.to == input)
              {
                validateOutput = true;
              }
            }

            if (validateInput) {
              inputConnectionCheck = true
            }

            if (validateOutput) {
              outputConnectionCheck = true
            }

          })


        }
    });

    if (!inputConnectionCheck) {
      alert("Every node should have a input connection");
      return;
    } 

    if (!outputConnectionCheck) {
      alert("Every node should have an output connection");
      return;
    }

    if (catchError.length != 0) {
      alert(catchError);
    }

    this.publishWf(this.flowService.getFlow()).subscribe(
      (data:any)=>{
        alert('workflow published')
      }
    )

  }

  execute(){
    var workFlowId:any;
    var nodeData = this.flowService.getFlow()
    workFlowId = nodeData.nodes[0]
    this.http.post('https://dev-v5.huloop.ai:8443/workflow/node/execute/'+workFlowId['workflowId'],'').subscribe(
      (data:any)=>{
        console.log('Execution Done');
      }
    )
  }

  // http://localhost:4300/
  publishWf(body:any) : Observable<any>{
    // return this.http.get('https://dev-v5.huloop.ai:8443/workflowFeatureFlag');
    return this.http.post('https://dev-v5.huloop.ai:8443/workflow/node/add',body)
  }
  
  getDataFromApi(): Observable<any> {
    const apiUrl = 'https://dev-v5.huloop.ai:8443/node/add'; // Replace with your API URL
    return this.http.get<any>(apiUrl);  // Send GET request to the API
  }

  //{{workflowurl}}/node/execute/6790cc55b50a560a90f92173
}
