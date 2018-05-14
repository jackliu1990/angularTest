export class Logger {
  static info(message: string): void{
      console.info(message);
  }

  static warn(message: string): void{
     console.warn(message);
  }

  static error(message: string): void{
     console.error(message);
  }

  static debug(message: string): void{
     console.debug(message);
  }

  static log(message: string): void{
     console.log(message);
  }
}

