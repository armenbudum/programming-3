const LivingCreature = require('./livingcreature')
module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 10;
        this.eaten = 1;
    }
    getNewCoordinates() {
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
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    die() {
        if (this.energy === 0) {
            matrix[this.y][this.x] = 0;
            for (var i in grasseaterArr) {
                if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
    random(arr) {
        let result = Math.floor(Math.random() * arr.length);
        return arr[result];
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = this.random(emptyCells);
        if (this.energy > 0) {
            console.log(newCell)
            var newY = newCell[1];
            var newX = newCell[0];
            matrix[newY][newX] = 2;

            var newGrasseater = new GrassEater(newX, newY, 2);
            grasseaterArr.push(newGrasseater);
        } else {
            this.die();
        }
    }
    move() {
        if (this.energy > 0) {
            var emptyCells = this.chooseCell(0);
            var newCell = this.random(emptyCells);
            if (newCell) {
                var newY = newCell[1];
                var newX = newCell[0];
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = 2;
                this.y = newY;
                this.x = newX;
                this.energy--;
            }
        } else {
            this.die();
        }
    }
    eat() {
        var grassCells = this.chooseCell(1);
        var eatenCell = this.random(grassCells);
        if (eatenCell) {
            if (this.eaten < 13) {
                var newY = eatenCell[1];
                var newX = eatenCell[0];
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = 2;
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
                this.y = newY;
                this.x = newX;
                this.eaten++;
                this.energy++;
            }
            if (this.eaten > 10) {
                this.mul();
            }
        } else {
            this.move();
        }
    }
}
