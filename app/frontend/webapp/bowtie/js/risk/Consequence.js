class Consequence{

    constructor(cell,mat){
        this._cell = cell.id;
        this._name = cell.value;
        this._impactValue =  "";
        //this._probability =  "";
        //this._indicator = 0;
        this._barriers = [];

        //this._isHighest = false;

        this._matrix = mat;
        this._com = "";
        this._rep = "";
        this._env = "";
        this._ind = "";
        this.setParameters();

        //this.updateStyle();
    }

    setParameters(){
        this._com == "" ? this._com = this.convertColorToValue(this._matrix.getCOM()) : this._matrix.setCOM(this._com);
        this._rep == "" ? this._rep = this.convertColorToValue(this._matrix.getREP()) : this._matrix.setREP(this._rep);
        this._env == "" ? this._env = this.convertColorToValue(this._matrix.getENV()) : this._matrix.setENV(this._env);
        this._ind == "" ? this._ind = this.convertColorToValue(this._matrix.getIND()) : this._matrix.setIND(this._ind);
        this.updateConsCellColor();
    }

    convertColorToValue(color){
        switch (color){
            case '#00ff06':
                return 0.5;

            case '#a7ec67':
                return 2.5;

            case '#fffe00':
                return 4.5;

            case '#fe773d':
                return 6.5;

            case '#ff0000':
                return 9.0;

            default:
                return "";
        }
    }


    //RONAN
    updateConsCellColor(){
        let consCell = window.currentUI.editor.graph.model.getCell(this._cell);
        if (this.paramDefined()) {
            let subString = '';
            try{
                this._name.getAttribute('infoDesc') == null? subString = 'consequence' : subString = 'consequence_filled';

            } catch (e) {
                subString = 'consequence';
            }
            switch (this.getColorIndicator()) {
                case '#00ff06':
                    consCell.setStyle(consCell.style.replace(/(.*bowtie\.)(\w+)(\;.*)/,'$1verylow'+subString+'$3'));
                    break;
                case '#a7ec67':
                    consCell.setStyle(consCell.style.replace(/(.*bowtie\.)(\w+)(\;.*)/,'$1low'+subString+'$3'));
                    break;
                case '#fffe00':
                    consCell.setStyle(consCell.style.replace(/(.*bowtie\.)(\w+)(\;.*)/,'$1medium'+subString+'$3'));
                    break;
                case '#fe773d':
                    consCell.setStyle(consCell.style.replace(/(.*bowtie\.)(\w+)(\;.*)/,'$1high'+subString+'$3'));
                    break;
                case '#ff0000':
                    consCell.setStyle(consCell.style.replace(/(.*bowtie\.)(\w+)(\;.*)/,'$1veryhigh'+subString+'$3'));
                    break;
                default:
                    break;
            }
        } //else nothing is done while the matrix is not fully filed
        window.currentUI.editor.graph.refresh();
    }

    getMeanValue(){
        if (!this.paramDefined()){
            return ('Missing parameters');
        }else{
            return (this._com+this._rep+this._env+this._ind)/4;
        }
    }

    getColorIndicator(){
        const mean = this.getMeanValue();
        switch(true){
            case mean < 1.5:
                return '#00ff06';

            case mean < 3.5:
                return '#a7ec67';

            case mean < 5.5:
                return '#fffe00'

            case mean < 7.5:
                return '#fe773d';

            default:
                return '#ff0000';
        }
    }




    /*
    impactDefined(){
        return this._ind && this._com && this._env && this._rep;
    }*/

    paramDefined(){
        return ((this._com !== "") && (this._rep !== "") && (this._env !== "") && (this._ind !== ""));
    }


    allDefined(){
        return (this._impactValue !== "") && this.paramDefined();
    }

    getProbability(){
        if(!this.allDefined()) {
            return ('Missing parameters');
        }else{
            let barriersFailureProbability = 1;
            let escalationFactorProbability = 1;
            this.barriers.forEach(barrier => {
                barrier.escalfactors.forEach(e => {
                    escalationFactorProbability *= (1-e.probability);
                })
                barriersFailureProbability *= 1-(barrier.failureProbability * escalationFactorProbability);
            })
            return (this.impactValue/10 * this.getMeanValue()/10 * barriersFailureProbability);
        }
    }
    /*updateStyle(){
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

    }*/

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

    set name(newName){
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
        //useful to clear style when opening a diagram
        this.updateConsCellColor();
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

    /*get probability() {
        return this._probability;
    }

    set probability(value) {
        if (isNaN(value) || value < 0 || value > 1){
            this._probability = "";
        }else{
            this._probability = value;
        }
    }*/

    get matrix(){
        return this._matrix;
    }

    set matrix(newMatrix){
        this._matrix = newMatrix;
        this.setParameters();
    }

    get com() {
        return this._com;
    }

    set com(value) {
        //Check input validity
        if (isNaN(value) || value < 0 || value > 10 || value == ""){
            this._com = "";
        }else{
            this._com = parseFloat(value);
        }
        this._matrix.setCOM(this._com);
    }

    get rep() {
        return this._rep;
    }

    set rep(value) {
        //Check input validity
        if (isNaN(value) || value < 0 || value > 10 || value == ""){
            this._rep = "";
        }else{
            this._rep = parseFloat(value);
        }
        this._matrix.setREP(this._rep);
    }

    get env() {
        return this._env;
    }

    set env(value) {
        //Check input validity
        if (isNaN(value) || value < 0 || value > 10 || value == ""){
            this._env = "";
        }else{
            this._env = parseFloat(value);
        }
        this._matrix.setENV(this._env);
    }

    get ind() {
        return this._ind;
    }

    set ind(value) {
        //Check input validity
        if (isNaN(value) || value < 0 || value > 10 || value == ""){
            this._ind = "";
        }else{
            this._ind = parseFloat(value);
        }
        this._matrix.setIND(this._ind);
    }

    get barriers() {
        return this._barriers;
    }

    set barriers(value) {
        this._barriers = value;
    }

    /*
    get isHighest() {
        return this._isHighest;
    }

    set isHighest(value) {
        this._isHighest = value;
        this.updateConsCellColor();
    }

    get indicator() {
        return this._indicator;
    }

    set indicator(value) {
        this._indicator = value;
        //this.updateStyle();
    }*/

    get barriers_escalfactors() {
        let res = [];
        this._barriers.forEach(b => b.escalfactors.forEach(e => res.push(e)));
        return res;
    }
}
