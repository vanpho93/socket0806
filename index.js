const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
server.listen(3000, () => console.log('Server started'));
app.get('/', (req, res) => res.render('home'));

class User {
    constructor(username, id) {
        this.username = username;
        this.id = id;
    }
}

const arrUsers = [];

io.on('connection', socket => {
    // setInterval(() => socket.emit('SERVER_SEND_MSG', Math.random()), 2000);
    socket.on(
        'CLIENT_SEND_MSG', 
        message => io.emit('SERVER_SEND_MSG', message));

    socket.on('CLIENT_SIGN_UP', username => {
        const isExist = arrUsers.some(e => e.username === username);
        if (isExist) return socket.emit('XAC_NHAN_DANG_KY', false);
        const user = new User(username, socket.id)
        socket.emit('XAC_NHAN_DANG_KY', arrUsers);
        arrUsers.push(user);
        io.emit('NGUOI_DUNG_MOI', user);
    });
});
