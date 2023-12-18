var a=require('http')
const port=3000;
const host='localhost'

var server=a.createServer(function(req,res)
{
    res.writeHead(200,{'Content-Type':'text/html'});
    if(req.url==='/')
    {
        res.write("<h1>Hello csit</h1>");
        res.end();
    }
    else if(req.url==='/page1')
    {
        res.write("<h1>welcome to page 2</h1>");
        res.end();
    }
})
server.listen(port,host,function(){
    console.log("server is listening on port"+port)
}
);