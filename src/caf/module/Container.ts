export interface Container {
  register(provideType:Object,obj: object);
  resolve(provideType:Object);
}
