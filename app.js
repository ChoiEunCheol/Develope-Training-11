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
    }
    else if (req.method === "GET" && req.url === "/script/checkingInfo.js"){
      fs.readFile('./script/checkingInfo.js', 'utf8', (err, data) => {
        if (err) {
          console.log("js파일을 찾을 수 없습니다.")
        } else{
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
        }
      });
    }
    else if (req.method === "POST" && req.url === "/login") {
      req.on("data", function (chunk) {
        console.log("chunk :", chunk);
        console.log("chunk.toString() :", chunk.toString());
        console.log("parse(chunk) :", querysrting.parse(chunk));
        console.log(
          "parse(chunk.toString()) :",
          querysrting.parse(chunk.toString())
        );

        let data = querysrting.parse(chunk.toString());

        fs.writeFile(
          "signUpAsset.js",
          `const signUpAsset = { id: '${data.id}', pw: '${data.pw}', repw: '${data.repw}', email: '${data.email}' }
module.exports = signUpAsset;`,
          (err) => {
            if (err) {
              console.err("Error");
            } else {
              console.log("signUpAsset.js파일 생성");
              const signUpAsset = require("./signUpAsset");
              const sss = require("./login");
              res.writeHead(200, { "Content-Type": "text/html" });
              res.end(sss);
            }
          }
        );
      });
    }
  })
  .listen(8080, () => console.log(`http://localhost:8080`));
