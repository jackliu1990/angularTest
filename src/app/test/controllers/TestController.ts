import {TObject} from '../../../core/lang/TObject';
import {ClassTable} from '../../../core/lang/ClassTable';
import {PostGreStoreDescriptor} from '../../../cws/PostgreStoreDescriptor';
import {MixObjectCreator} from '../../../core/lang/MixObjectCreator';
import {G2ObjectCreator} from '../../../core/lang/G2ObjectCreator';

export class TestController {
    constructor() {
      let a = new PostGreStoreDescriptor('1', 2, '3');
      let b = ClassTable.getInstance().find('PostGreStoreDescriptor'.toLowerCase());
      //console.log(JSON.stringify(a));
      //console.log(TObject.create(JSON.stringify(a)));
      let point = '{"$type":"Point,http://www.Gs.com","spatialReference":3857,"x":-8100867.1791,"y":1032114.0623,"z":0}';
      console.log(TObject.create(point));
    }
}
