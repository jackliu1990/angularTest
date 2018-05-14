import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
    <div style="background-color: gray;height:200px;">
      <router-outlet></router-outlet>
    </div>
  `
})
export class MainComponent {

}

