const express=require('express');
const app=express();
const jwt=require('jsonwebtoken');
const port=7060;
const fs=require('fs');
const key="mysecret";
const dbuser={
    uname:"csit",
    password:123456
};
app.post("/",function(req,res){
    if(dbuser.uname==req.query.name && dbuser.password==req.query.pwd){
        jwt.sign({dbuser},key,function(err,token){
            res.json({token});
            res.end();
        })
    }
    else{
        res.send("<h1>INVALID</h1>");
        res.send();
    }
});
app.get("/student",validate,function(req,res){
    fs.readFile("student.json",function(err,data){
        res.write(data);
        res.end();
    });
});
function validate(req,res,next){
    var auth=req.headers.authorization;
    var harray=auth.split(" ");
    var token=harray[1];
    jwt.verify(token,key,function(err,payload){
        if(err){
            res.send("<h1>INVALID</h1>");
            res.end();
        }
        else{
            next();
        }
    });
}
app.listen(port,function(){
    console.log("JWT server in port"+port);
});
