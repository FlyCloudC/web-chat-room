let ws = require("nodejs-websocket");
let list = [];

function sendToAll(x){
  for(let i=0;i<list.length;i++)
    if(list[i]) list[i].sendText(x);
}

let server = ws.createServer((conn)=>{
  var id = list.length;
  list[id] = conn;
  console.log("客户端连接 id=" + id);
  
  //获取连接信息
  conn.on("text", (str)=>{
    console.log("收到 "+str);
    sendToAll(str);
  });
  
  //断开连接的回调
  conn.on("close", (code, reason)=>{
    console.log("客户端断开 id=" + id);
    list[id] = null;
  });
  
  //处理错误事件信息
  conn.on("error", (err)=>{
    console.log("throw : err");
    list[id] = null;
    console.log(err);
  });
});

exports.listen = (port)=>{
  server.listen(port);
  console.log("服务端开启");
}
 
console.log("server模块已加载");
