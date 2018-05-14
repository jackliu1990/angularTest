import {GetSetMethod, JsonMember, JsonTypeInfo} from '../core/lang/TypeDecorators';
import {TObject} from '../core/lang/TObject';


@JsonTypeInfo('PostgreStoreDescriptor')
export class PostGreStoreDescriptor extends TObject{

  @GetSetMethod
  private _host: string;

  @GetSetMethod
  private _port: number;

  @GetSetMethod
  private _dbname: string;

  // 类型
  $type = 'PostgreStoreDescriptor,http://www.Gs.com';
  constructor(host?: string, port?: number, dbname?: string) {
    super();
    this._host = host;
    this._port = port;
    this._dbname = dbname;
  }
}
