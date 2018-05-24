import {Component, OnInit} from '@angular/core';
import {UserModel} from "./user.model";
/**
 * Created by liufeng on 2018/5/24.
 */

@Component({
  selector: 'gisForm',
  templateUrl: './gis.compontent.html',
})
export class GisComponent {
  private user = new UserModel();

  constructor() {

  }

  isUnique(name: string) {
    if(name==="liufeng"){
      return true;
    }
  }

  doSubmit(value) {
    console.log(value);
  }
}
