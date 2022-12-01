// var grassArr = [];
// var grasseaterArr = [];
// var predatorArr = [];
// var matrix = [];
// var arr = [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2];
var socket = io();
var side = 20;
// function random(arr){
//     let result = Math.floor(Math.random()*arr.length);
//     return arr[result];
// }
function setup() {
    frameRate(10);
    createCanvas(800, 800);
    background(255, 255, 255);
    // for (let i = 0; i < 40; i++) {
    //     matrix[i] = [];
    //     for (let j = 0; j < 40; j++) {
    //         matrix[i][j] = random(arr)
    //     }
    // }
    // matrix[24][12] = 3;
    // matrix[21][18] = 3;
    // matrix[2][35] = 3;
    // matrix[30][30] = 3;
    // matrix[19][22] = 3;
    // matrix[1][1] = 3;
    // matrix[38][38] = 3;
    // for (let i = 0; i < matrix.length; i++) {
    //     for (let j = 0; j < matrix[0].length; j++) {
    //         if (matrix[i][j] == 1) {
    //             const gr1 = new Grass(j, i, 1)
    //             grassArr.push(gr1)
    //         } else if (matrix[i][j] == 2) {
    //             const ge1 = new GrassEater(j, i, 2)
    //             grasseaterArr.push(ge1)
    //         } else if (matrix[i][j] == 3) {
    //             const p1 = new Predator(j, i, 3)
    //             predatorArr.push(p1)
    //         }
    //     }
    // }
}

function draww(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill(255, 255, 255);
                rect(x * side, y * side, x * side, y * side);
            }
            else if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, x * side, y * side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, x * side, y * side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, x * side, y * side);
            }
            else if (matrix[y][x] == 4){
                fill("#ADD8E6");
                rect(x * side, y * side, x * side, y * side);
            }
            else if(matrix[y][x] == 5){
                fill("pink");
                rect(x * side, y * side, x * side, y * side);
            }
            else if(matrix[y][x] == 6){
                fill("orange");
                rect(x * side, y * side, x * side, y * side);
            }else if(matrix[y][x] == 7){
                fill("black");
                rect(x * side, y * side, x * side, y * side);
            }
        }
    }
    
    // for (var i in grassArr) {
    //     grassArr[i].mul();
    // }
    // for (var i in grasseaterArr) {
    //     grasseaterArr[i].eat();
    // }
    // for (var i in predatorArr) {
    //     predatorArr[i].eat();
    // }
}

socket.on('send matrix', draww);
