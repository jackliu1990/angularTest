import {SimpleModule} from '../../caf/module/SimpleModule';
import {LinkComponent} from '../../caf/component/LinkComponent';
import {HeadController} from './controllers/HeadController';
import {LeftController} from './controllers/LeftController';
import {RightController} from './controllers/RightController';
import {MainController} from './controllers/MainController';
import {TestService} from '../../cws/TestService';
import {HttpService} from '../../cws/HttpService';
import {Routes} from '@angular/router';
import {CompositeModule} from '../../caf/module/CompositeModule';

export class TileModule extends SimpleModule {
  constructor() {
    super();
  }

  createCompRoute() {
    this.addRoute({path: '', redirectTo: 'main', pathMatch: 'full'});
    this.addRoute({path: 'main', component: this.getTComponent(MainController)});
  }

  createComponent() {
    this.addComponent(new LinkComponent(MainController, {selector: 'main-view', templateUrl: './views/MainView.html'}));
    this.addComponent(new LinkComponent(HeadController, {selector: 'head-view', templateUrl: './views/HeadView.html'}));
    this.addComponent(new LinkComponent(LeftController, {selector: 'left-view', templateUrl: './views/LeftView.html'}));
    this.addComponent(new LinkComponent(RightController, {selector: 'right-view', templateUrl: './views/RightView.html'}));
  }

  createService() {
    this.register(HttpService, new HttpService());
    this.register(TestService, new TestService(this.resolve(HttpService)));
  }

  createModRoute(router){
     this.configureRoute(router,'web');
  }
}
