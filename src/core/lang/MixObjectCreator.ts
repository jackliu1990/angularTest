import {ObjectCreator} from './ObjectCreator';
import {G2ObjectCreator} from './G2ObjectCreator';

export class MixObjectCreator implements ObjectCreator {

  private _itemsCreator: any[];
  constructor() {
    this._itemsCreator = [];
  }

  create(json: string): object {
    let jObj = JSON.parse(json);
    let type = jObj['$type'];
    if (type) {
      let name = type.split(',')[0];
      for (let creator of this._itemsCreator) {
        if (creator.exist(name)) {
          let tobject = creator.create(json);
          return this.deepcreate(tobject,jObj);
        }
      }
    }
    return null;
  }

  add(objectCreator: ObjectCreator): void {
    this._itemsCreator.push(objectCreator);
  }

  private deepcreate(targe: any, source: any): object {
    for (let propertyKey in source) {
      if (!!source[propertyKey] && typeof source[propertyKey] === 'object') {
        if (source[propertyKey].$type) {
          let type = source[propertyKey]['$type'];
          let name = type.split(',')[0];
          for (let creator of this._itemsCreator) {
            if (creator.exist(name)) {
              targe[propertyKey] = creator.create(JSON.stringify(source[propertyKey]));
              if (creator instanceof  G2ObjectCreator){ break; }
              this.deepcreate(targe[propertyKey],source[propertyKey]);
            }
          }
        }
      }
      else if (Array.isArray(source[propertyKey])) {
        targe[propertyKey] = [];
        for (let value of source[propertyKey]){
          targe[propertyKey].push(value);
        }
        this.deepcreate(targe[propertyKey], source[propertyKey]);
      }
    }
    return targe;
  }


}
