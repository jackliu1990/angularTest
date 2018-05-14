import {GWebSocket} from './WebSocket';
import {MixObjectCreator} from '../lang/MixObjectCreator';
//import {clearTimeout} from 'timers';

export class ES6WebSocket implements GWebSocket{
  private ws;
  private events = {};
  private lockReconnect = false;

  constructor(){}

  connect(url:string){
    try{
      this.ws = new WebSocket(url);
      this.ws.onopen = ()=>{this.heartCheck.reset().start()};
      this.ws.onerror = ()=>{this.reconnect(url)};
      this.ws.onclose = ()=>{this.reconnect(url)};
    }catch (e){
      this.reconnect(url);
    }
  }

  disconnect(){
    this.ws.close();
  }

  send(obj:Object){
    if(this.ws.readyState == WebSocket.OPEN){
      this.ws.send(JSON.stringify(obj));
    }
  }

  on(name:string,callback:Function){
    //将获取的json字符串反序列化为object对外公布
    this.ws.onmessage = (event) => {
      this.heartCheck.reset().start();
      let obj = new MixObjectCreator().create(event.data);
      if (name in this.events) {
        let events = this.events[name];
        callback.call(this, obj);
        events.push(callback);
      }
    };
  }

  un(name:string){
    //取消监听主题
    if (name in this.events) {
      this.events[name] = [];
    }
  }

  reconnect(url:string){
    if(this.lockReconnect) return;
    this.lockReconnect = true;
    let that = this;
    //没连接上则每2秒再连接一次，也可设计为10秒后连接不上则关闭连接，将lockReconnect = true
    setTimeout(function(){
      that.connect(url);
      that.lockReconnect = false;
    },2000);
  }

  //心跳检查：每timeout时间段内检查一次，当服务端触发onopen、onmessage时清空timeout重新计时
  //当连接断开时，重新连接
  private heartCheck = {
    timeout: 60000,
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function(){
      clearTimeout(this.timeoutObj);
      clearTimeout(this.serverTimeoutObj);
      return this;
    },
    start: function(){
      let self = this;
      this.timeoutObj = setTimeout(function(){
        this.ws.send('HeartBeat');//此处this可能有问题
        self.serverTimeoutObj = setTimeout(function(){
          self.ws.close();
        },self.timeout);
      },this.timeout)
    }
  };

}
