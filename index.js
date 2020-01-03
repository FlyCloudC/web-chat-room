let http = require("http");
let fs = require("fs");
let myws = require("./server/server.js");

function load(res,type){
  //console.log("向客户端发送" + type);
  res.writeHead(200,{"Content-Type":"text/" + type});
  fs.readFile("./client/client." + type,"utf-8",
    (err,data)=>{
      if(err) console.log(err);
      else res.end(data);
    }
  );
}

http.createServer((req,res)=>{
	 console.log("vg");
  let url = req.url;
  let type = url.substr(url.lastIndexOf(".")+1,url.length);
  if(url == "/") type = "html";
  if(["html","css","js","ico"].includes(type))
    load(res,type);
  else res.end();
}).listen(3001);

myws.listen(3002);

