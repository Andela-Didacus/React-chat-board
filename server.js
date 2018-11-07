const express = require("express");
const webpack = require('webpack');
const socketIO =  require("socket.io");
const http = require("http");
const bodyParser = require("body-parser");
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
}));
app.use(bodyParser.urlencoded({ extended: false }));

io.on('connection', socket => {
    socket.on('message', body => {
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(8)
        })
    });
})

server.listen(5000, function () {
    console.log('React Chat app is listening on port 5000!\n');
});