import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
    <div style="background-color: gray;height:200px;">
      <demo-modal-service-static></demo-modal-service-static>
      <gisForm></gisForm>
      <router-outlet></router-outlet>
    </div>
  `
})
export class MainComponent {

}

