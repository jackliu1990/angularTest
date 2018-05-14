import {RestService} from './RestService';
import {GHttp} from '../net/Http';
import {AjaxHttp} from '../net/AjaxHttp';

export class SimpleRestService implements RestService{

  private baseUrl:string;
  private http:GHttp;

  constructor() {
    this.http = new AjaxHttp();
  }

  delete(url: string, options?: any): Promise<any> {
    return this.http.send('delete',this.baseUrl + url).toPromise();
  }

  get(url: string, options?: any): Promise<any> {
    return this.http.send('get',this.baseUrl + url).toPromise();
  }

  post(url: string, body: any, options?: any): Promise<any> {
    return this.http.send('post',this.baseUrl + url, body).toPromise();
  }

  put(url: string, body: any, options?: any): Promise<any> {
    return this.http.send('put',this.baseUrl + url, body).toPromise();
  }
}
