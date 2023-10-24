// const http = require("http");
// const fs = require("fs");
// const querysrting = require("querystring");
// // const signUpAsset = require("./signUpAsset")

// http
//   .createServer((req, res) => {
//     if (req.method === "GET" && req.url === "/") {
//       fs.readFile("./Develope-Training-11.html", (err, data) => {
//         if (err) {
//           console.log("html파일을 찾을 수 없습니다.");
//         } else {
//           res.writeHead(200, { "Content-Type": "text/html" });
//           res.end(data);
//         }
//       });
//     }
//     else if (req.method === "GET" && req.url === "/script/checkingInfo.js"){
//       fs.readFile('./script/checkingInfo.js', 'utf8', (err, data) => {
//         if (err) {
//           console.log("js파일을 찾을 수 없습니다.")
//         } else{
//         res.writeHead(200, { 'Content-Type': 'application/javascript' });
//         res.end(data);
//         }
//       });
//     }    else if (req.method === "GET" && req.url === "/style/login.css"){
//       fs.readFile('./style/login.css', 'utf8', (err, data) => {
//         if (err) {
//           console.log("css파일을 찾을 수 없습니다.")
//         } else{
//         res.writeHead(200, {'Content-Type': 'text/css'  });
//         res.end(data);
//         }
//       });
//     }
//     else if (req.method === "POST" && req.url === "/login") {
//       req.on("data", function (chunk) {
//         console.log("chunk :", chunk);
//         console.log("chunk.toString() :", chunk.toString());
//         console.log("parse(chunk) :", querysrting.parse(chunk));
//         console.log(
//           "parse(chunk.toString()) :",
//           querysrting.parse(chunk.toString())
//         );

//         let data = querysrting.parse(chunk.toString());

//         fs.writeFile(
//           "signUpAsset.js",
//           `const signUpAsset = { id: '${data.id}', pw: '${data.pw}', repw: '${data.repw}', email: '${data.email}' }
// module.exports = signUpAsset;`,
//           (err) => {
//             if (err) {
//               console.err("Error");
//             } else {
//               console.log("signUpAsset.js파일 생성");
//               const loginPage = require("./login");
//               res.writeHead(200, { "Content-Type": "text/html" });
//               res.end(loginPage);
//             }
//           }
//         );
//       });
//     }
//   })
//   .listen(8080, () => console.log(`http://localhost:8080`));

//-------------------------------------------------------------------------------
const http = require("http");
const fs = require("fs");
const querysrting = require("querystring");

const serveStaticFile = (req, res, path) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(`파일을 찾을 수 없습니다. ${err}`);
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
    } else {
      res.writeHead(200, { "Content-Type": getContentType(path) });
      res.end(data);
    }
  });
};

const getContentType = (path) => {
  const ext = path.split(".").pop();
  switch (ext) {
    case "html":
      return "text/html";
    case "js":
      return "application/javascript";
    case "css":
      return "text/css";
    default:
      return "text/plain";
  }
};

const handleLogin = (req, res) => {
  req.on("data", (chunk) => {
    const data = querysrting.parse(chunk.toString());

    fs.writeFile(
      "signUpAsset.js",
      `const signUpAsset = { id: '${data.id}', pw: '${data.pw}', repw: '${data.repw}', email: '${data.email}' }
module.exports = signUpAsset;`,
      (err) => {
        if (err) {
          console.err("Error");
        } else {
          console.log("signUpAsset.js파일 생성");
          const loginPage = require("./login");
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(loginPage);
        }
      }
    );
  });
};

http
  .createServer((req, res) => {
    if (req.method === "GET") {
      switch (req.url) {
        case "/":
          serveStaticFile(req, res, "./Develope-Training-11.html");
          break;
        case "/script/checkingInfo.js":
          serveStaticFile(req, res, "./script/checkingInfo.js");
          break;
        case "/style/login.css":
          serveStaticFile(req, res, "./style/login.css");
          break;
        default:
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Not found");
          break;
      }
    } else if (req.method === "POST" && req.url === "/login") {
      handleLogin(req, res);
    } else {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("Method not allowed");
    }
  })
  .listen(8080, () => console.log(`http://localhost:8080`));
