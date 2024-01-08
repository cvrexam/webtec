const express=require('express');
const app=express();
const fs=require('fs');
const bp=require('body-parser');
const stu=require('./students.json');
const port=7500;
app.use(bp.json());
app.use(bp.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to myAPI</h1>");
    res.end();
});
app.get("/students",(req,res)=>{
    fs.readFile("./students.json",function(err,data) {
        res.send(data);
        res.end();
    });
});
app.post("/students",function(req,res){
    var newstu=req.body;
    stu.push(newstu);
    writedataback(stu);
    res.send("<h1>New student record inserted successfullyy!!!</h1>");
    res.end();
});
app.put("/students",(req,res)=>{
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
app.delete("/students",function(req,res){
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
    fs.writeFile("./students.json",JSON.stringify(data) ,function(err){
        console.log(err);
    });
}
app.listen(port,()=>{
    console.log("server is listening on port "+port);
});
