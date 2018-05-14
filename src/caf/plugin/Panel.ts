export interface Panel {
  clean();
  notify(message: string, timeout: number);
  remove(message: string);
}
