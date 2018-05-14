import {MixObjectCreator} from './MixObjectCreator';
import {TObjectCreator} from './TObjectCreator';
import {G2ObjectCreator} from './G2ObjectCreator';
import '../util/string';

export class TObject {

  private static objectCreator;

  static create(json: string): object {
    if (this.objectCreator == null) {
      this.objectCreator = new MixObjectCreator();
      this.objectCreator.add(new TObjectCreator());
      this.objectCreator.add(new G2ObjectCreator());
    }
    return this.objectCreator.create(json);
  }

  copy(): TObject {
    let object = new TObject();
    return Object.assign(object, this);
  }

  equals(tobject: TObject): boolean {
    return Object.is(this, tobject);
  }

  toString(): string {
    return JSON.stringify(this);
  }

}
