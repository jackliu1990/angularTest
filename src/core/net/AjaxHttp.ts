import {GHttp} from './Http';
import {MixObjectCreator} from '../lang/MixObjectCreator';

export class AjaxHttp implements GHttp {

  private xmlhttp;
  constructor(){
    this.xmlhttp = new XMLHttpRequest();
  };

  send(type:string,url:string,data?:any){
    this.xmlhttp.open(type,url,true);
    if(!!data){
      this.xmlhttp.send(JSON.stringify(data));
    }
    else{
      this.xmlhttp.send(null);
    }
    return new MixObjectCreator().create(this.xmlhttp.responseText);
  }
}
