var http = require('http');
var url = require('url');
var fs = require('fs');
var stu = require('./students.json');
var port = 7000;
var server = http.createServer(function (req, res) {
    if (req.url === "/") {
        res.write("<h1>welcome to API</h1>");
        res.end();
    }
    if (req.url === "/students" && req.method === "GET") {
        fs.readFile("students.json", function (err, data) {
            res.write(data);
            res.end();
        });
    }
    if (req.method === "POST") {
        var newStu = url.parse(req.url, true).query;
        stu.push(newStu);
        writeDataBack(stu);
        res.write("<h1>New Student record added successfully</h1>");
        res.end();
    }
    if (req.method === "PUT") {
        var upStu = url.parse(req.url, true).query;
        for (s in stu) {
            if (stu[s]['id'] == upStu['id']) {
                stu[s]['name'] = upStu['name'];
                stu[s]['year'] = upStu['year'];
                stu[s]['cgpa'] = upStu['cgpa'];
                writeDataBack(stu);
                res.write("<h1>New Student record updated successfully</h1>");
            }
        }
        res.end();
    }
    if (req.method === "DELETE") {
        var delStu = url.parse(req.url, true).query;
        for (s in stu) {
            if (stu[s]['id'] == delStu['id']) {
                stu.splice(s, 1);
                writeDataBack(stu);
                res.write("<h1>New Student record deleted successfully</h1>");
            }
        }
        res.end();
    }
    function writeDataBack(data) {
        fs.writeFile("students.json", JSON.stringify(data), function (err) {
            console.log(err);
        });
    }
});
server.listen(port, function () {
    console.log("server is listening on port:" + port);
});
