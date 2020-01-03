function dg(x){return document.getElementById(x);}
function out(x){
  x = x.split("::");
  dg("box").innerHTML += x[0] +
    ":</br>   <div class=message> " + x[1] +
    "</div></br></br>";
}

let name = prompt("请输入您的名字","xxx") || "???";

//建立连接
let webSocket = new WebSocket("ws://localhost:3002/");
//webSocket.onopen = ()=>{out("已连接ws");};
//webSocket.onclose = ()=>{out("已断开ws");};
webSocket.onmessage = (e)=>{out(e.data);};

//发送信息
dg("sendBtn").onclick = ()=>{
  webSocket.send(name + "::" + dg("sendTxt").value);
  dg("sendTxt").value = "";
};