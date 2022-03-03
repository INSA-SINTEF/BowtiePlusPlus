class MatrixImpact{
    constructor(matrixCell){
        if(matrixCell != null) {
            this.matrixCell = matrixCell.id;
            this.comColor = this.getLaneColor(matrixCell.children[0]);
            this.repColor = this.getLaneColor(matrixCell.children[1]);
            this.envColor = this.getLaneColor(matrixCell.children[2]);
            this.indColor = this.getLaneColor(matrixCell.children[3]);
        }else{
            //Default Value, useful to avoid having errors in RiskComputationComponent component
            this.matrixCell = -1;
            this.comColor = '#cafefd';
            this.repColor = '#cafefd';
            this.envColor = '#cafefd';
            this.indColor = '#cafefd';
        }
    }

    getEllipseColor(ellipseCell){
        if(ellipseCell.style.split(";")[1].split("=")[1] === '1'){
            return '#cafefd';
        }
        return ellipseCell.style.split(";")[1].split("=")[1];
    }

    getLaneColor(laneCell){
        for(const ellipse in laneCell.children){
            if (this.getEllipseColor(laneCell.children[ellipse]) !== '#cafefd'){
                return this.getEllipseColor(laneCell.children[ellipse]);
            }
        }
        return '#cafefd';
    }

    convertValueToColor(value){
        if (value != ""){
            switch(true){
                case (value < 1.5):
                    return '#00ff06';

                case (value < 3.5):
                    return '#a7ec67';

                case (value < 5.5):
                    return '#fffe00'

                case (value < 7.5):
                    return '#fe773d';

                default:
                    return '#ff0000';
            }
        }
        return '#cafefd';

    }

    convertColorToIndex(color){
        switch (color){
            case '#00ff06':
                return 0;

            case '#a7ec67':
                return 1;

            case '#fffe00':
                return 2;

            case '#fe773d':
                return 3;

            case '#ff0000':
                return 4;

            default:
                return -1;
        }
    }

    clearLane(lane){
        lane.children.forEach(ellipse => {
            ellipse.setStyle("ellipse;fillColor=#cafefd");
        })
    }

    updateMatrixColors(){
        if(this.matrixCell == -1){return;}
        let matCell = window.currentUI.editor.graph.model.getCell(this.matrixCell);
        if (this.convertColorToIndex(this.comColor) == -1){
            this.clearLane(matCell.children[0]);
        }else{
            this.clearLane(matCell.children[0]);
            matCell.children[0].children[this.convertColorToIndex(this.comColor)].setStyle("ellipse;fillColor=" + this.comColor);
        }
        if (this.convertColorToIndex(this.repColor) == -1){
            this.clearLane(matCell.children[1]);
        }else{
            this.clearLane(matCell.children[1]);
            matCell.children[1].children[this.convertColorToIndex(this.repColor)].setStyle("ellipse;fillColor=" + this.repColor);
        }
        if (this.convertColorToIndex(this.envColor) == -1){
            this.clearLane(matCell.children[2]);
        }else{
            this.clearLane(matCell.children[2]);
            matCell.children[2].children[this.convertColorToIndex(this.envColor)].setStyle("ellipse;fillColor=" + this.envColor);
        }
        if (this.convertColorToIndex(this.indColor) == -1){
            this.clearLane(matCell.children[3]);
        }else{
            this.clearLane(matCell.children[3]);
            matCell.children[3].children[this.convertColorToIndex(this.indColor)].setStyle("ellipse;fillColor=" + this.indColor);
        }
    }

    getCOM(){
        return this.comColor;
    }

    setCOM(value){
        this.comColor = this.convertValueToColor(value);
        this.updateMatrixColors();
    }

    getREP(){
        return this.repColor;
    }

    setREP(value){
        this.repColor = this.convertValueToColor(value);
        this.updateMatrixColors();
    }

    getENV(){
        return this.envColor;
    }

    setENV(value){
        this.envColor = this.convertValueToColor(value);
        this.updateMatrixColors();
    }

    getIND(){
        return this.indColor;
    }

    setIND(value){
        this.indColor = this.convertValueToColor(value);
        this.updateMatrixColors();
    }

    getMatrixCell(){
        return this.matrixCell;
    }
}