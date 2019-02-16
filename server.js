const express = require('express');

const postsRouter = require('./router/PostRouter');

const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter);

server.get('/', async (req, res) => {
    res.send(`<h1>Testing</h1>`)
})

module.exports = server;