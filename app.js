const http = require("http");
const fs = require("fs");
const querysrting = require("querystring");
const signUpAsset = require("./signUpAsset");
// const signUpAsset = require("./signUpAsset")

http
  .createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
      fs.readFile("./Develope-Training-11.html", (err, data) => {
        if (err) {
          console.log("html파일을 찾을 수 없습니다.");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
    } else if (req.method === "POST" && req.url === "/login") {
        req.on('data', function(chunk){
          console.log('chunk :',chunk);
          console.log('chunk.toString() :',chunk.toString());
          console.log('parse(chunk) :', querysrting.parse(chunk));
          console.log('parse(chunk.toString()) :', querysrting.parse(chunk.toString()));
        
          let data = querysrting.parse(chunk.toString());

          fs.writeFile("signUpAsset.js",`const signUpAsset = { id: '${data.id}', pw: '${data.pw}', repw: '${data.repw}', email: '${data.email}' }`,(err)=>{
            if(err){
              console.err("Error");
            } else {
              console.log("signUpAsset.js파일 생성");
            }
          });

          signUpAsset.id = data.id ; 
          signUpAsset.password = data.pw ; 
          signUpAsset.email = data.email ; 

          res.writeHead(200, {'Content-Type' : 'text/html'});
          res.end('id : '+ signUpAsset.id + 'pw : ' + signUpAsset.password);
          console.log('data :', data);
      });
    }
  })
  .listen(8080, () => console.log(`http://localhost:8080`));
