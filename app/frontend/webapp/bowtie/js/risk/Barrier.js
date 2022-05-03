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
        try{
                return this._name.getAttribute('label');
            } catch (e) {
                return this._name;
            }
    }

    set name(newName) {
        try{
            String(newName.getAttribute('label')).replaceAll(/<div>/g, "").replaceAll(/<\/div>/g, "")
                .replaceAll(/<br>/g, "").replaceAll(/<h[0-9]>/g, "")
                .replaceAll(/<\/h[0-9]>/g,"").replaceAll(/<pre>/g,"")
                .replaceAll(/<\/pre>/g,"");
            this._name = newName;
        } catch (e) {
            String(newName).replaceAll(/<div>/g, "").replaceAll(/<\/div>/g, "")
                .replaceAll(/<br>/g, "").replaceAll(/<h[0-9]>/g, "")
                .replaceAll(/<\/h[0-9]>/g,"").replaceAll(/<pre>/g,"")
                .replaceAll(/<\/pre>/g,"");
            let cell = window.currentUI.editor.graph.model.getCell(this._cell);
            window.currentUI.editor.graph.setInfoDescForCell(cell,null);
            this._name = cell.value;
        }
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
            this._failureProbability = parseFloat(value).toFixed(2);
        }
    }

}
