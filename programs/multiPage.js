const http = require('http');
const url = require('url');
const fs = require("fs")

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    switch(pathname) {
        case '/':
            res.end(`
                <h1>Home Page</h1>
                <nav>
                    <a href="/about">About</a> | 
                    <a href="/contact">Contact</a> | 
                    <a href="/projects">Projects</a> | 
                    <a href="/blog">Blog</a>
                </nav>
            `);
            break;
        
        case '/about':
            // fs.readFile("foo.txt","utf-8",(err,data)=>res.write(`<pre>${data}</pre>`))  not working for some js bs
            res.end(`
                <h1>About Us</h1>
                <p>I am a pationate about programming and learning many things on my own.</p>
                <a href="/">Back to Home</a>
            `);
            break;
        
        case '/contact':
            res.end(`
                <h1>Contact Us</h1>
                <p>Email: adrojadhairya@cloud.com</p>
                <p>Phone: 96648 47885</p>
                <a href="/">Back to Home</a>
            `);
            break;
        
        case '/projects':
            res.end(`
                <h1>My Projects</h1>
                <ul>
                    <li>Wireless controller with python flask</li>
                    <li>Cricket Game simulator in JAVA</li>
                    <li>Many More...</li>
                </ul>
                <a href="/">Back to Home</a>
            `);
            break;
        
        case '/blog':
            res.end(`
                <h1>Blog</h1>
                <article>Latest posts coming soon!</article>
                <a href="/">Back to Home</a>
            `);
            break;
        
        default:
            res.writeHead(404);
            res.end(`
                <h1>404 Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <a href="/">Back to Home</a>
            `);
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});