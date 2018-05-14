import {TestController} from './controllers/TestController';
import { Routes} from '@angular/router';
import {LinkComponent} from '../../caf/component/LinkComponent';
import {SimpleModule} from '../../caf/module/SimpleModule';
import {ClassTable} from '../../core/lang/ClassTable';
import {MixObjectCreator} from '../../core/lang/MixObjectCreator';
import {TObjectCreator} from '../../core/lang/TObjectCreator';
import {TObject} from '../../core/lang/TObject';
import {MainController} from '../tile/controllers/MainController';

export class TestModule extends SimpleModule {
  constructor() {
    super();
  }

  createCompRoute() {
    this.addRoute({path: 'one', component: this.getTComponent(TestController)});
  }

  createComponent() {
    this.addComponent(new LinkComponent(TestController, {templateUrl: './views/TestView.html'}));
  }

  createModRoute(router){
    this.configureRoute(router,'test','main');
  }
}
