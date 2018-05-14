class Guid {
  newGuid(): string {
    let g = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (g() + g() + '-' + g() + '-' + g() + '-' + g() + '-' + g() + g() + g());
  }
}


export let guid = new Guid();
