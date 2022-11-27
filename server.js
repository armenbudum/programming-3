var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("papikcoder"));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

var statsgr = 0;
var statsge = 0;
var statspr = 0;
var statsma = 0;
var statsfma = 0;
var statsml = 0;

grassArr = [];
grasseaterArr = [];
predatorArr = [];
maleArr = [];
femaleArr = [];
mealsArr = [];
matrix = [];
arr = [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 6];


function random(arr) {
    let result = Math.floor(Math.random() * arr.length);
    return arr[result];
}

function matrixGen() {
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
    matrix[17][16] = 4;
    matrix[17][17] = 5;
    matrix[36][29] = 4;
    matrix[34][29] = 5;
     io.sockets.emit("send matrix", matrix)
}

matrixGen();
const Grass = require('./papikcoder/grass');
const GrassEater = require('./papikcoder/grasseater');
const Predator = require('./papikcoder/predator');
const Male = require('./papikcoder/male');
const Female = require('./papikcoder/female');
const Meal = require('./papikcoder/meals');

function createObj() {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] == 1) {
                const gr1 = new Grass(j, i, 1);
                grassArr.push(gr1);
                statsgr = grassArr.length;
            } else if (matrix[i][j] == 2) {
                const ge1 = new GrassEater(j, i, 2);
                grasseaterArr.push(ge1);
                statsge = grasseaterArr.length;
            } else if (matrix[i][j] == 3) {
                const p1 = new Predator(j, i, 3);
                predatorArr.push(p1);
                statspr = predatorArr.length;
            } else if (matrix[i][j] == 4) {
                const m1 = new Male(j, i, 4);
                maleArr.push(m1);
                statsma = maleArr.length;
            } else if (matrix[i][j] == 5) {
                const f1 = new Female(j, i, 5);
                femaleArr.push(f1);
                statsfma = femaleArr.length;
            } else if (matrix[i][j] == 6) {
                const me1 = new Meal(j, i, 6);
                mealsArr.push(me1);
                statsml = mealsArr.length;
            }
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function game() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grasseaterArr) {
        grasseaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in maleArr) {
        maleArr[i].eat();
    }
    for (var i in femaleArr) {
        femaleArr[i].eat();
    }
    statsgr = grassArr.length;
    statsge = grasseaterArr.length;
    statspr = predatorArr.length;
    statsma = maleArr.length;
    statsfma = femaleArr.length;
    statsml = mealsArr.length;

    io.sockets.emit("send matrix", matrix)
}

setInterval(game, 150)

io.on('connection', function (socket) {

    createObj()

});
var fs = require('fs');
function statsfunc() {
    
    var stats = {
        "grassborn": statsgr,
        "grasseaterborn": statsge,
        "predator": statspr,
        "male": statsma,
        "female": statsfma,
        "meals": statsml
    }
    const strstats = JSON.stringify(stats);
    fs.writeFileSync("stats.json", strstats);
}
setInterval(statsfunc, 150)