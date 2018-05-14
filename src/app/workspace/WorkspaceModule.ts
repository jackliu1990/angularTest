import {LinkComponent} from '../../caf/component/LinkComponent';
import {SimpleModule} from '../../caf/module/SimpleModule';
import {WorkspaceComponent} from './controllers/WorkSpaceController';

export class WorkspaceModule extends SimpleModule {
  constructor() {
    super();
  }

  createCompRoute() {
    this.addRoute({path: '', component: this.getTComponent(WorkspaceComponent)});
  }

  createComponent() {
    this.addComponent(new LinkComponent(WorkspaceComponent, {templateUrl: '../../app/workspace/views/workspaceview.html'}));
  }

  createModRoute(router){
    this.configureRoute(router,'workspace','main');
  }
}
