module.exports = class Bomb {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]; 
        this.button = document.getElementById("button");
    }
    explosion() {
        var exY = random(arr40);
        var exX = random(arr40);
        var newBomb = new Bomb(exX, exY, this.index);
        bombArr.push(newBomb);
        matrix[exY][exX] = 7;
        for(var i in this.directions){
            matrix[this.directions[1]][this.directions[0]] = 0;
        }
    }
}