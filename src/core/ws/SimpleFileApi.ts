import {FileApi} from './FileApi';

export class SimpleFileApi implements FileApi{
  upload(url, fileName, file) {
    let token = '';
    const formData = new FormData();
    formData.append('path', '');
    formData.append('fileName', fileName);
    formData.append('file', file);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Authorization', token);
    xhr.onload = function(evt) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('Upload Success');
      } else {
        console.error('Upload Fail');
      }
    };
    xhr.onerror = function (err) {
      console.error(err);
    };
    xhr.send(formData);
  }

  download(url, fileName) {
    let token = '';
    let xhr = new XMLHttpRequest();
    const requestUrl = url + '?remoteFile=' + fileName;
    xhr.responseType = 'blob';
    xhr.open('get', requestUrl);
    xhr.setRequestHeader('Authorization', token);
    xhr.onload = function (evt) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('Download Success');
      } else {
        console.error('Download Fail');
      }
    };
    xhr.onerror = function (err) {
      console.error(err);
    };
    xhr.send();
  }
}
