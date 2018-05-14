
export interface GWebSocket{
    connect(url:string);

    disconnect();

    send(json:Object);

    on(name:string,callback:Function);

    un(name:string);

    reconnect(url:string);
}
