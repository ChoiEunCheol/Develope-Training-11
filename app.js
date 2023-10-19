const http = require("http");
const fs = require("fs");
const querysrting = require("querystring");
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
      //   req.on('data', function(chunk){
      //     console.log('chunk :',chunk);
      //     console.log('parse(chunk) :', querysrting.parse(chunk));
      //     console.log(chunk.toString());
      //     var data = querysrting.parse(chunk.toString());
      //     res.writeHead(200, {'Content-Type' : 'text/html'});
      //     res.end(data.id + data.pw);
      //     console.log('data :', data);
      // });
      // // res.writeHead(200, {'Content-Type' : 'text/html'});
      // // res.end('ID : ' + data.id + 'PW : ' + data.pw);
      var data = querysrting.parse(chunk.toString());
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data.id + data.pw);
      console.log("data :", data);
    }
  })
  .listen(8080, () => console.log(`http://localhost:8080`));
