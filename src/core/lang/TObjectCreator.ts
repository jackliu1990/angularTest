import {ObjectCreator} from './ObjectCreator';
import {ClassFinder} from './ClassFinder';
import {TObject} from './tobject';
import {ClassTable} from './ClassTable';

export class TObjectCreator implements ObjectCreator, ClassFinder {

  create(json: string): TObject {
    let jObj = JSON.parse(json);
    let type = jObj['$type'];
    if (type) {
      let name = type.split(',')[0];
      if (this.exist(name)) {
        let instance = ClassTable.getInstance().find(name);
        Object.assign(instance,jObj);
        return instance;
      }
    }
    return null;
  }



  exist(typename: string): boolean {
    return ClassTable.getInstance().has(typename);
  }

}
