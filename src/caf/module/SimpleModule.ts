import {ModuleBase} from './ModuleBase';
import {Container} from './Container';
import {NgModule} from '@angular/core';

export class SimpleModule extends ModuleBase{
  private tcomponents = new Map();
  constructor(){
    super();
  }

  addComponent(component){
    this.tcomponents.set(component.getController(),component.getComponent());//关联controller与ng组件
    super.addComponent(component.getComponent());
  }

  getTComponent(name){
    return this.tcomponents.get(name);
  }
}
