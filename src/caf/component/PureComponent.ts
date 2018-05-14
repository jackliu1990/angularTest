import {Controller} from '../controller/Controller';
import {NgComponent} from './NgComponent';

export class PureComponent{
  private controller:Controller;
  private viewUrl:string;
  private ngComponent:NgComponent;

  constructor(controller,viewUrl){
    this.ngComponent = new NgComponent(controller,viewUrl);
    this.controller = controller;
  }

  getComponent(){
    return this.ngComponent;
  }

  getController(){
    return this.controller;
  }

  onDestroy(){}

  onInit(){}
}
