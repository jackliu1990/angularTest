import {GWebSocket} from '../net/WebSocket';
import {ConnectionObserver} from '../net/ConnectionObserver';
import {ES6WebSocket} from '../net/ES6WebSocket';

export class WebSocketClient implements GWebSocket,ConnectionObserver{
  private ws;
  private connected;

  constructor(){
    this.ws = new ES6WebSocket();
  }

  onConnected(){
    this.connected = this.ws.readyState;//0-尚未连接,1-已连接,2-正在关闭,3-已关闭；
  }

  onDisconnected(){
    this.connected = this.ws.readyState;//0-尚未连接,1-已连接,2-正在关闭,3-已关闭；
  }

  connect(url){
    this.ws.connect(url);
  }

  disconnect(){
    this.ws.disconnect();
  }

  send(json:Object){
    this.ws.send(json);
  }

  on(name:string,callback:Function){
    this.ws.on(name,callback);
  }

  un(name:string){
    this.ws.un(name);
  }

  reconnect(url:string){
    this.ws.reconnect(url);
  }

}
