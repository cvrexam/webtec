const express=require('express');
const app=express();
const fs=require('fs');
const bp=require('body-parser');
const stu=require('./student.json');
const port=7000;
app.use(bp.json());
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to myAPI</h1>");
    res.end();
});
app.get("/student",(req,res)=>{
    fs.readFile("./student.json",function(err,data) {
        res.send(data);
        res.end();
    });
});
app.post("/student",(req,res)=>{
    var newstu=req.body;
    stu.push(newstu);
    writedataback(stu);
    res.send("<h1>New student record inserted successfullyy!!!</h1>");
    res.end();
});
app.put("/student",(req,res)=>{
    var upstu=req.body;
    for(s in stu){
        if(stu[s]['id']=upstu['id']){
            stu[s]['name']=upstu['name'];
            stu[s]['year']=upstu['year'];
            stu[s]['cgpa']=upstu['cgpa'];
            writedataback(stu);
            res.send("<ha>Student record updated...</h1>");
        }
    }
    res.end();
});
app.delete("/student",(req,res)=>{
    var delstu=req.body;
    for(s in stu){
        if(stu[s]['id']=delstu['id']){
            stu.splice(s,1);
            writedataback(stu);
            res.send("<h1>student record deleted successfully...</h1>");
        }
    }
    res.end();
});
function writedataback(data){
    fs.writeFile("./student.json",JSON.stringify(data) ,function(err){
        console.log(err);
    });
}
app.listen(port,()=>{
    console.log("server is listening on port "+port);
});