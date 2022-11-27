const LivingCreature = require('./livingcreature')
module.exports = class Female extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 80;
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
    random(arr) {
        let result = Math.floor(Math.random() * arr.length);
        return arr[result];
    }
    die() {
        if (this.energy == 0) {
            matrix[this.y][this.x] = 0;
            for (var i in femaleArr) {
                if (this.x == femaleArr[i].x && this.y == femaleArr[i].y) {
                    femaleArr.splice(i, 1);
                    break;
                }
            }
        }
    }
    move() {
        if (this.energy > 0) {
            var emptyCells = this.chooseCell(0);
            var grassCells = this.chooseCell(1);
            var newgrCell = this.random(grassCells);
            var newCell = this.random(emptyCells);
            if (newCell || newgrCell) {
                if(newCell){
                var newY = newCell[1];
                var newX = newCell[0];
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = 5;
                this.y = newY;
                this.x = newX;
                this.energy--;
                } 
                else if (newgrCell){
                    newCell = newgrCell;
                    var newY = newCell[1];
                    var newX = newCell[0];
                    matrix[this.y][this.x] = 2;
                    matrix[newY][newX] = 5;
                    this.y = newY;
                    this.x = newX;
                    this.energy--;
                }
            }
        } else {
            this.die();
        }
    }
    eat() {
        var mealCells = this.chooseCell(6);
        var eatenCell = this.random(mealCells);
        if (eatenCell) {
            var newY = eatenCell[1];
            var newX = eatenCell[0];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;
            for (var i in mealsArr) {
                if (newX == mealsArr[i].x && newY == mealsArr[i].y) {
                    mealsArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
            this.eaten++;
            this.energy++;
        } else {
            this.move();
        }
    }
}