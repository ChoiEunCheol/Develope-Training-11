const signUpAsset = require("./signUpAsset");

const aaa =`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./style/login.css">
</head>

<body>
    <div id="root">
        <div>
            <div id="loginName">${signUpAsset.id}</div>
            <h1> 님 반갑습니다.</h1>
        </div><br>
        <h1>저에게 편지를 보내주세요!</h1>
        <form action="loginsuccess" method="post">
            <input name="title" type="text" placeholder="제목을 입력하세요."></input>
            <input name="text" type="text" placeholder="내용을 입력하세요."></input>
            <input type="submit" value="send"></input>
        </form>
    </div>
</body>

</html>`

module.exports = aaa;