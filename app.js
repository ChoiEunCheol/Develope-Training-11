const http = require('http');
const fs = require('fs');
const querysrting = require('querystring');

http.createServer((req,res)=>{
    if (req.method === 'GET' && req.url === '/'){
        fs.readFile('./Develope-Traning-11.html',(err,data)=>{
            if(err){
                console.log('html파일을 찾을 수 없습니다.');
            }else{
                res.writeHead(200, {'Content-Type':'text/html'});
                res.end(data);
        }})}
}).listen(8080,()=>
    console.log(`http://localhost:8080`));