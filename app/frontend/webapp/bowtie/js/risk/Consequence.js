class Consequence{

    constructor(cell){
        this._cell = cell.id;
        this._impactValue =  "";
        this._probability =  "";
        this._indicator = 0;
        this._barriers = [];
        this._name = cell.value;
        this._isHighest = false;
        this._com = false;
        this._rep = false;
        this._env = false;
        this._ind = false;
        this.updateStyle();
    }

    impactDefined(){
        return this._ind && this._com && this._env && this._rep;
    }

    allDefined(){
        return (this._impactValue !== "") && (this._probability !== "");
    }

    getProduct(){
        if(this.allDefined()){
            let barriersFailureProbability = 1;
            let escalationFactorProbability = 1;
            this.barriers.forEach(barrier => {
                barrier.escalfactors.forEach(e => {
                    escalationFactorProbability *= (1-e.probability);
                })
                barriersFailureProbability *= 1-(barrier.failureProbability * escalationFactorProbability);
            })
            return (this.impactValue * this.probability * barriersFailureProbability);
        }
    }
    updateStyle(){
        if(this.impactDefined()){
            let cell = window.currentUI.editor.graph.model.getCell(this.cell);
            this._indicator = this._indicator/4;
            if(this.isHighest){
                cell.setStyle('shape=mxgraph.bowtie.highestconsequence;whiteSpace=wrap;html=1;fontSize=16;aspect=fixed');
            }else{
                if (this.indicator === 0){
                    cell.setStyle('shape=mxgraph.bowtie.consequence;whiteSpace=wrap;html=1;fontSize=16;aspect=fixed');
                }else{
                    switch(true){
                        case this.indicator < 1.5:
                            cell.setStyle('shape=mxgraph.bowtie.verylowconsequence;whiteSpace=wrap;html=1;fontSize=16;aspect=fixed');
                            break;
                        case this.indicator < 3.5:
                            cell.setStyle('shape=mxgraph.bowtie.lowconsequence;whiteSpace=wrap;html=1;fontSize=16;aspect=fixed');
                            break;
                        case this.indicator < 5.5:
                            cell.setStyle('shape=mxgraph.bowtie.mediumconsequence;whiteSpace=wrap;html=1;fontSize=16;aspect=fixed');
                            break;
                        case this.indicator < 7.5:
                            cell.setStyle('shape=mxgraph.bowtie.highconsequence;whiteSpace=wrap;html=1;fontSize=16;aspect=fixed');
                            break;
                        case this.indicator <= 10.0:
                            cell.setStyle('shape=mxgraph.bowtie.highconsequence;whiteSpace=wrap;html=1;fontSize=16;aspect=fixed');
                            break;
                        default:
                            cell.setStyle('shape=mxgraph.bowtie.consequence;whiteSpace=wrap;html=1;fontSize=16;aspect=fixed');
                    }
                }

            }
            window.currentUI.editor.graph.refresh();
        }

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
        this.updateStyle();
    }

    get impactValue() {
        return this._impactValue;
    }

    set impactValue(value) {
        if (isNaN(value) || value < 0){
            this._impactValue = "";
        }else{
            this._impactValue = value;
        }
    }

    get probability() {
        return this._probability;
    }

    set probability(value) {
        if (isNaN(value) || value < 0 || value > 1){
            this._probability = "";
        }else{
            this._probability = value;
        }
    }

    get barriers() {
        return this._barriers;
    }

    set barriers(value) {
        this._barriers = value;
    }

    get isHighest() {
        return this._isHighest;
    }

    set isHighest(value) {
        this._isHighest = value;
        this.updateStyle();
    }
    get indicator() {
        return this._indicator;
    }

    set indicator(value) {
        this._indicator = value;
        //this.updateStyle();
    }

    get barriers_escalfactors() {
        let res = [];
        this._barriers.forEach(b => b.escalfactors.forEach(e => res.push(e)));
        return res;
    }
}
