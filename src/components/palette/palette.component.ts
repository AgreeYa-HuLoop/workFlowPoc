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
  styleUrls: [ './palette.component.scss' ],
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

  constructor(private flowService: FlowService,
     private http: HttpClient
  )
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
this.publishWf(this.flowService.getFlow()).subscribe(
  (data:any)=>{
    alert('workflow published')
  }
)
//     console.log(this.flowService.getFlow());
// this.getDataFromApi().subscribe(data => {
//       console.log('API Response:', data);
//     },
//     error=>{
//       console.log(error);
      
//     }
//   );
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
