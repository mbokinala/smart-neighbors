const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, (err) => {
    console.log(err || `Server started on port ${port}`);
});