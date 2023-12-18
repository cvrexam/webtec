var http=require('http');
var url=require('url');
var fs=require('fs');
var student=require('./student.json')
var server=http.createServer(
    (req,res)=>{
        if(req.url ==="/students" && req.method==="GET"){
            fs.readFile("student.json",(err,data)=>{
                res.write(data);
                res.end();
            });
        }
        if(req.method==="POST"){
            var newStu=url.parse(req.url,true).query;
            student.push(newStu)
            fs.writeFile("student.json",JSON.stringify(student),(err)=>{console.log(err);});
            res.end();
        }
        if(req.method==="PUT"){
            var upStu=url.parse(req.url,true).query;
            student.forEach((student, index) => {
                if(student.id === upStu.id){
                    student.name = upStu.name;
                    student.age = upStu.age;
                }
            });
            fs.writeFile("student.json",JSON.stringify(student),(err)=>{console.log(err);});
            res.end();
        }
        if(req.method==="DELETE"){
            var delStu=url.parse(req.url,true).query;
            student.forEach((student1, index) => {
                if(student1.id === delStu['id']){
                    student.splice(student1,1);
                }
            });
            fs.writeFile("student.json",JSON.stringify(student),(err)=>{console.log(err);});
            res.end();
        }
    }
);
server.listen(5000,()=>{console.log("Server Running");})