import 'reflect-metadata';
import {ClassTable} from './ClassTable';
import {ClassInfo} from './ClassInfo';

export function JsonMember(target: any, propertyKey: string) {
  let metadataFieldKey: string = '_propertyTypes_';

  let propertyTypes: any = target[metadataFieldKey] || (target[metadataFieldKey] = {});

  propertyTypes[propertyKey] = Reflect.getMetadata('design:type', target, propertyKey);
}

export function GetSetMethod(target: any, propertyKey: string) {
  let property: string = propertyKey.substring(1);

  let ownProperty = target.constructor.prototype.hasOwnProperty(property);

  if (!ownProperty) {
    Object.defineProperty(target, property, {
      get: function () {
        return this[propertyKey];
      },
      set: function (value) {
        this[propertyKey] = value;
      }
    });
  }
}

export function JsonTypeInfo(name: string) {
  return function (target: Function) {
    if (!ClassTable.getInstance().has(name)) {
      let classinfo = new ClassInfo(name,target);
      ClassTable.getInstance().add(classinfo);
    }
  };
}
