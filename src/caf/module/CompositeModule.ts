import {ModuleBase} from './ModuleBase';

export class CompositeModule extends ModuleBase {
  private modules = [];

  constructor() {
    super();
  }

  add(mod) {
    this.modules.push(mod);
  }

  configure() {
    this.modules.forEach(mod => {
      mod.configure();
    });
  }

  createModRoute(router) {
    this.modules.forEach(mod => {
      mod.createModRoute(router);
    });
  }

  getModules(){
    return this.modules;
  }
}
