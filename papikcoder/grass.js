const LivingCreature = require('./livingcreature')
module.exports = class Grass extends LivingCreature {

     random(arr){
        let result = Math.floor(Math.random()*arr.length);
        return arr[result];
    }
    mul() {
        this.multiply++;
        var newCell = this.random(this.chooseCell(0));
        if (this.multiply >= 5 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.multiply = 0;
        }
    }
}