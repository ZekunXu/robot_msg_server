const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const https = require("https");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const GLOBAL_PARAM = require("./lib/global_param.js");
const router = require("./router.js");

// http sever
var http_server = http.createServer(app);


/**
 * 配置使用 session
 */

app.use(session({
  secret: 'victor', //配置加密字符串
  resave: true,
  saveUninitialized: true, // 无论是否使用 Session，都会默认分配一把钥匙
}));


//配置post请求
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));


//设置跨域访问
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin",GLOBAL_PARAM.HOST_NAME);
    //允许的header类型
    res.header("Access-Control-Allow-Headers","Content-Type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS,PATCH");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Content-Type", "application/x-www-form-urlencoded");
    res.header("Set-Cookie", "SameSite=None; Secure");
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200);  //让options尝试请求快速结束
    else
        next();
})




app.get('/', (req, res, next) => {
	res.send("Server Starting at port: " + GLOBAL_PARAM.SERVER_PORT);
})


// 起用 路由
app.use(router);


http_server.listen(GLOBAL_PARAM.SERVER_PORT, () =>{
	console.log('App is running at port ' +  + GLOBAL_PARAM.SERVER_PORT);

})