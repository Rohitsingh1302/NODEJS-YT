const http3 = require('http');
const url = require('url');
const myserver3 = http3.createServer((req, res) => {
    // req.url ko parse kar rahe hain, todh rahe hain taaki hum path ko alag kar saken
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/') {
        res.end("This is the home page");
    } 
    else if (pathname === '/about') {
        res.end("This is the about page");
    } 
    else {
        res.end("404 Not Found");
    }
});

myserver3.listen(9001, () => {
    console.log("Server is listening on port 9001");
});
