class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.eaten = 1;
        this.energy = 30;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    die() {
        if (this.energy === 0) {
            matrix[this.y][this.x] = 0;
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == grasseaterArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (this.energy > 0) {
            var newY = newCell[1];
            var newX = newCell[0];
            matrix[newY][newX] = 3;

            var newPredator = new Predator(newX, newY, 1);
            predatorArr.push(newPredator);
        } else {
            this.die();
        }
    }
    move() {
        if (this.energy > 0) {
            var emptyCells = this.chooseCell(0);
            var newCell = random(emptyCells);
            if (newCell) {
                var newY = newCell[1];
                var newX = newCell[0];
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = 3;
                this.y = newY;
                this.x = newX;
                this.energy--;
            }
        } else {
            this.die();
        }
    }
    eat() {
        var grasseaterCells = this.chooseCell(2);
        var eatenCell = random(grasseaterCells);
        if (eatenCell) {
            if(this.eaten < 10){
                var newY = eatenCell[1];
                var newX = eatenCell[0];
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = 3;
                for (var i in grasseaterArr) {
                    if (newX == grasseaterArr[i].x && newY == grasseaterArr[i].y) {
                        grasseaterArr.splice(i, 1);
                        break;
                    }
                }
                this.y = newY;
                this.x = newX;
                this.eaten++;
                this.energy++;
            }
            if (this.eaten > 5) {
                this.mul();
            }
        } else {
            this.move();
        }
    }
}