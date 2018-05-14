export interface FileApi{
  upload(url:string, fileName:string, file);

  download(url:string, fileName:string);
}
