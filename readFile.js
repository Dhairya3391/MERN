const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    const serveFile = (filename) => {
        const filePath = path.join(__dirname, filename);
        
        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                res.end('File Not Found');
                return;
            }
            
            res.end(`
                <html>
                    <body>
                        <pre>${content}</pre>
                        <a href="/">Back to Home</a>
                    </body>
                </html>
            `);
        });
    };

    switch(pathname) {
        case '/':
            res.end(`
                <h1>File Reading Web App</h1>
                <nav>
                    <a href="/about">About</a> | 
                    <a href="/contact">Contact</a>
                </nav>
            `);
            break;
        
        case '/about':
            serveFile('foo.txt');
            break;
        
        case '/contact':
            serveFile('bar.txt');
            break;
        
        default:
            res.end('404 Not Found');
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});