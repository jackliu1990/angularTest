import {TObject} from './tobject';

export class ClassInfo {
  private _name: string;

  private _constructor: any;

  constructor(name?: string, _constructor?: any) {
    this._name = name;
    this._constructor = _constructor;
  }

  newInstance(): TObject {
    return new this._constructor();
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get constructorFun() {
    return this._constructor;
  }

  set constructorFun(constructorFun) {
    this._constructor = constructorFun;
  }

}
