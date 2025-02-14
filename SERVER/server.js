const http = require('http');
const fs = require('fs');
const path = require('path');
const { error } = require('console');

const port = 3000;

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url === '/' ? "index.html" : req.url);
    console.log(filePath);

    const extName = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
    }

    const contentType = mimeTypes[extName] || "application/octet-stream";

    fs.readFile(filePath, (err, content) => {
        if(error){
            if(error.code === "ENOENT"){
                res.writeHead(404, {"Content-Type": "text/html"});
                res.end("404 : File not found brother");
            }
        }else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf-8');
        }
    })
});

server.listen(port, () => {
    console.log(`Server running at ${port}`);
});