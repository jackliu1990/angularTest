import {TObject} from './tobject';
import {ClassInfo} from './ClassInfo';

export class ClassTable {
  private static _instance: ClassTable;

  private _classTable: any;

  static getInstance(): ClassTable {
    if (this._instance == null) {
      this._instance = new ClassTable();
    }
    return this._instance;
  }

  constructor() {
    this._classTable = new Map();
  }

  find(name: string): TObject {
    if (this.has(name)) {
      return this._classTable.get(name.toLowerCase()).newInstance();
    }
    return null;
  }

  has(name:string):boolean{
   return this._classTable.has(name.toLowerCase());
  }


  add(classinfo: ClassInfo): void {
    this._classTable.set(classinfo.name.toLowerCase(), classinfo);
  }

}
