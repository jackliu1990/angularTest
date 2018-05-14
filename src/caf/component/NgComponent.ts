import {Component} from '@angular/core';

export class NgComponent{
  private controller;
  private viewUrl;
  constructor(controller,viewUrl){
    this.controller = controller;
    this.viewUrl = viewUrl;
    return Component(viewUrl)(this.controller);
  }
}
