class Barrier{
    constructor(cell){
        this._cell = cell.id;
        this._failureProbability = 1;
        this._name = cell.value;
        this._escalfactors = [];
    }

    get cell() {
        return this._cell;
    }

    set cell(newCell) {
        this._cell = newCell;
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        this._name = newName.replaceAll(/<div>/g, "").replaceAll(/<\/div>/g, "")
            .replaceAll(/<br>/g, "").replaceAll(/<h[0-9]>/g, "")
            .replaceAll(/<\/h[0-9]>/g,"").replaceAll(/<pre>/g,"")
            .replaceAll(/<\/pre>/g,"");
    }

    get escalfactors() {
        return this._escalfactors;
    }

    set escalfactors(value) {
        this._escalfactors = value;
    }

    /*get failureProbability(){
        let escalfactorsProbability = 1;
        this.escalfactors.forEach(e => {
                escalfactorsProbability *= e.probability;
        })
        return this._failureProbability * escalfactorsProbability;
    }*/


    get failureProbability() {
        return this._failureProbability;
    }

    set failureProbability(value) {
        if (isNaN(value) || value < 0 || value > 1 || value === ""){
            this._failureProbability = 1;
        }else{
            this._failureProbability = value;
        }
    }

}
