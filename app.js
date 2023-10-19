const http = require("http");
const fs = require("fs");
const querysrting = require("querystring");
const signUpAsset = require("./signUpAsset")

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
    }
    else if (req.method === "POST" && req.url === "/login") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write(signUpAsset.id);
        res.end("ㅇㅇ")};
    }).listen(8080, () => console.log(`http://localhost:8080`));

    //https://cocoon1787.tistory.com/517
