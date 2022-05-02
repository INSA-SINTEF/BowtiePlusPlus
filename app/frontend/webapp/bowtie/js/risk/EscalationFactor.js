class EscalationFactor{
    constructor(cell){
        this._cell = cell.id;
        this._probability = 0;
        this._name = cell.value;
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

    get probability() {
        return this._probability;
    }

    set probability(value) {
        if (isNaN(value) || value < 0 || value > 1 || value === ""){
            this._probability = 0;
        }else{
            this._probability = value;
        }
    }

}