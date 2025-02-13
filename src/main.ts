import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FlowComponent } from './components/flow/flow.component';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<visual-programming-flow></visual-programming-flow>`,
  imports: [
    FlowComponent
  ]
  
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App,{providers: [provideHttpClient()]});
