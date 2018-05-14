export interface Dialog {
  close();
  show(message: string, caption: string, type: number);
}
