import {ObjectCreator} from './ObjectCreator';
import {ClassFinder} from './ClassFinder';

export class G2ObjectCreator implements ObjectCreator, ClassFinder {

  //private  deserializer = new g2.core.Deserializer();
  constructor() {
   // g2.core.ClassTable.addClassCollection([g2.sfs, g2.ows]);
  }

  create(json: string): object {
    return null;
   // return this.deserializer.createJsInstance(json) ;
  }

  exist(typename: string): boolean {
    return null;
   // return !!g2.core.ClassTable[typename];
  }

}
