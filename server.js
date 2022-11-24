var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("papikcoder"));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000);


 grassArr = [];
 grasseaterArr = [];
 predatorArr = [];
 matrix = [];
 arr = [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2];


function random(arr){
    let result = Math.floor(Math.random()*arr.length);
    return arr[result];
}

function matrixGen(){
    for (let i = 0; i < 40; i++) {
        matrix[i] = [];
        for (let j = 0; j < 40; j++) {
            matrix[i][j] = random(arr)
        }
    }
    matrix[24][12] = 3;
    matrix[21][18] = 3;
    matrix[2][35] = 3;
    matrix[30][30] = 3;
    matrix[19][22] = 3;
    matrix[1][1] = 3;
    matrix[38][38] = 3;
    io.sockets.emit("send matrix", matrix)
}

matrixGen()
const Grass = require('./papikcoder/grass')
const GrassEater = require('./papikcoder/grasseater')
const Predator = require('./papikcoder/predator')


function createObj(){
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] == 1) {
                const gr1 = new Grass(j, i, 1)
                grassArr.push(gr1)
            } else if (matrix[i][j] == 2) {
                const ge1 = new GrassEater(j, i, 2)
                grasseaterArr.push(ge1)
            } else if (matrix[i][j] == 3) {
                const p1 = new Predator(j, i, 3)
                predatorArr.push(p1)
            }
        }
    }
    io.sockets.emit("send matrix", matrix)
}


function game(){
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grasseaterArr) {
        grasseaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
}

setInterval(game,1000)

io.on('connection', function (socket) {

    createObj()

});