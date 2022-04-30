/**
 * This components represents the tutorial
 * Integrated within the HomePage component
 * Observes user diagram and action to help him with the next step to complete efficiently the diagram
 * @type {{template: string, methods: {}, props: {}}}
 */

export const TutorielComponent = {
    props: {
    },
    data: function(){
        return{
            //Deals with the z-index of the component
            onMouseOver : false,
            is_displayed : false,
            window : null,
            graph : null,
            event : [],
            threats : [],
            causes : [],
            hazard : [],
            consequences : [],
            barriers: [],
            rightBarriers: 0,
            escalfactors: [],
            rightEscFactors: 0,
            assets : [],
            state: 0,
            allcells: [],
            eventLaunch : [],
            leftFillingRate : 0,
            rightFillingRate: 0,
            barriersAccuRateLeft: 0,
            barriersAccuRateRight: 0
        }
    },
    methods: {
        update : function (){

            //initialisation for the first update
            if (this.window == null){
                this.window = document.getElementById('diagram-editor').children[1].contentWindow;
                this.graph = this.window.currentUI.editor.graph;
            }

            this.is_displayed = true;

            //Get all cells on the graph than check which cell is the new one
            this.allcells = this.graph.model.cells;
            for (const cell of Object.values(this.allcells)) {
                switch (cell.customID) {
                    case "Hazard":
                        if(!this.hazard.find(element => element.id === cell.id)) this.hazard.push(cell);
                        break;
                    case "Event":
                        if(!this.event.find(element => element.id === cell.id)) this.event.push(cell);
                        break;
                    case "Barrier":
                        if(!this.barriers.find(element => element.id === cell.id)) this.barriers.push(cell);
                        break;
                    case "Escalation Factor":
                        if(!this.escalfactors.find(element => element.id === cell.id)) this.escalfactors.push(cell);
                        break;
                    case "Threat":
                        if(!this.threats.find(element => element.id === cell.id)) this.threats.push(cell);
                        break;
                    case "Cause":
                        if(!this.causes.find(element => element.id === cell.id)) this.causes.push(cell);
                        break;
                    case "Asset":
                        if(!this.assets.find(element => element.id === cell.id)) this.assets.push(cell);
                        break;
                    //consequence are deals in another way to separate the right side elements of the diagram
                }
            }


            this.consequences = this.graph.getAllConsequences()
            this.rightBarriers = 0;
            this.rightEscFactors = 0;
            this.consequences.forEach(cons => {
                this.rightBarriers += cons.barriers.length;
                this.rightEscFactors += cons.barriers_escalfactors.length
            });

            //Deals with 0 division
            this.threats.length+this.causes.length == 0? this.leftFillingRate = 0 : this.leftFillingRate = ((this.barriers.length-this.rightBarriers) / (this.threats.length+this.causes.length)).toFixed(1)
            this.consequences.length == 0 ? this.rightFillingRate = 0 : this.rightFillingRate = (this.rightBarriers / this.consequences.length).toFixed(1);
            (this.barriers.length-this.rightBarriers) == 0 ? this.barriersAccuRateLeft = 0 : this.barriersAccuRateLeft = ((this.escalfactors.length-this.rightEscFactors)/(this.barriers.length-this.rightBarriers)).toFixed(1);
            this.rightBarriers == 0 ? this.barriersAccuRateRight = 0 : this.barriersAccuRateRight = (this.rightEscFactors.length/this.rightBarriers).toFixed(1);

            this.tutorialState();

            if(this.hazard.length > 1){
                this.window.alert("Only one Hazard per diagram is allowed");
                this.graph.removeCells([this.graph.getAllHazardsCells()[1]],true);
                this.hazard.length--;
            }
            if(this.event.length > 1){
                this.window.alert("Only one Unwanted Event per diagram is allowed");
                this.graph.removeCells([this.graph.getAllEventsCells()[1]],true);
                this.event.length--;
            }
            },

        tutorialState : function () {
            this.event.length >= 1 ? this.state = 1 : '';
            this.hazard.length >= 1 ? this.state = 2 : '';
            this.assets.length >= 3 ? this.state = 3 : '';
            this.threats.length + this.causes.length >= 8 ? this.state = 4 : '';
            this.barriers.length >= 6 ? this.state = 5 : '';
            this.escalfactors.length >= 3 ? this.state = 6 : '';
            this.consequences.length >= 4 ? this.state = 7 : '';
        },


        /*//function that update the render of the tutoriel, if there is a modal open in the editor, then do not display tutoriel
        zIndex_hide : function () {
            this.is_displayed = 0;
            try {
                //render the tutorial if close button is selected
                let closeBtn = this.window.document.getElementsByClassName("geDialogClose")[0];
                closeBtn.addEventListener('click',this.zIndex_show);
            } catch (e) {
                //console.log(e);
            }
            },

        //function that update the render of the tutoriel, if we close the modal then display tutoriel
        zIndex_show : function () {
            this.is_displayed = 1;
        },

        initialisation : function () {
            let items = [];
            items = this.window.document.getElementsByClassName("geItem");
            for (let item of items) {
                item.addEventListener('click',() => {
                    let tmp = this.window.document.getElementsByClassName("mxPopupMenuItem");
                    for (let test of tmp){
                        test.addEventListener('mouseup',this.zIndex_hide);
                    }
                })
            }
            this.eventLaunch.push(this.window.document.getElementById("riskButton"));
            this.eventLaunch.forEach(event => {
                event.addEventListener('click',this.zIndex_hide)
            })

        }*/
    },

    template:
        //HTML code corresponding to the component
            `
<div id="tuto" v-show="this.is_displayed" >
<button id="gostButtonTuto" v-on:click="update"> <h3> Tutorial - TopDown approach </h3> </button>
    <div v-bind:class= "[this.event.length >= 1 ? 'alert-success' : 'alert-danger', 'alert', 'container', 'myToolTip', this.state < 0 ? 'unused' : '']" role="alert">
        <div class="item"> UNWANTED EVENT </div> <div class="item"> <h3> {{this.event.length}}/1 </h3> </div>
        <span class="tooltiptext">The unwanted situation you want to analyse. Only one is allowed.</span>
    </div>
    <div v-bind:class= "[this.hazard.length >= 1 ? 'alert-success' : 'alert-danger', 'alert', 'container', 'myToolTip', this.state < 1 ? 'unused' : '']" role="alert" v-on:mouseover="onMouseOver = true" v-on:mouseleave="onMouseOver = false">
      <div class="item"> HAZARD </div> <div class="item"> <h3> {{this.hazard.length}}/1 </h3> </div>
      <span class="tooltiptext">The main hazard related to the studied unwanted event (ie. something around or part of the organization which has the potential to cause damage). Only one is allowed.</span>
    </div>

    <div v-bind:class= "[this.assets.length >= 3 ? 'alert-success' : 'alert-danger', 'alert', 'container', 'myToolTip', this.state < 2 ? 'unused' : '']" role="alert" v-on:mouseover="onMouseOver = true" v-on:mouseleave="onMouseOver = false">
      <div class="item"> ASSETS </div> <div class="item"> <h3> {{this.assets.length}}/3 </h3> </div>
      <span class="tooltiptext">Add resources related to the system you want to protect. It is usual to have several assets, think about what is valuable!</span>
    </div>

    <div v-bind:class= "[(this.threats.length+this.causes.length) >= 8 ? 'alert-success' : 'alert-danger', 'alert', 'container', 'myToolTip', this.state < 3 ? 'unused' : '']" role="alert" v-on:mouseover="onMouseOver = true" v-on:mouseleave="onMouseOver = false">
      <div class="item"> THREATS & CAUSES </div> <div class="item"> <h3> {{this.threats.length+this.causes.length}}/8 </h3> </div>
      <span class="tooltiptext">Fill the left side of the diagram with all events that can lead to the unwanted situation. Be exhaustive and keep the most important elements (8 elements at least)</span>
    </div>

    <div v-bind:class= "[this.leftFillingRate >= 1 ? 'alert-success' : 'alert-danger', 'alert', 'container', 'myToolTip', this.state < 4 ? 'unused' : '']" role="alert" v-on:mouseover="onMouseOver = true" v-on:mouseleave="onMouseOver = false">
      <div class="item"> BARRIERS LEFT </div> <div class="item"> <h3> {{this.leftFillingRate}}/1 </h3> </div>
      <span class="tooltiptext">Add barriers to increase the left filling rate and improve diagram quality <br> <i class="formula"><b>[FORMULA]</b> nb left barriers / (nb threats + nb causes)</i></span>
    </div>

    <div v-bind:class= "[this.barriersAccuRateLeft >= 0.7 ? 'alert-success' : 'alert-danger', 'alert', 'container', 'myToolTip', this.state < 5 ? 'unused' : '']" role="alert" v-on:mouseover="onMouseOver = true" v-on:mouseleave="onMouseOver = false">
      <div class="item">ESC.FACTORS LEFT</div> <div class="item"> <h3> {{this.barriersAccuRateLeft}}/0.7 </h3> </div>
      <span class="tooltiptext">Add escalation factors to model precisely a barrier failure probability <br> <i class="formula"><b>[FORMULA]</b> nb left esc. factors / nb left barriers</i></span>
    </div>

    <div v-bind:class= "[this.consequences.length >= 4 ? 'alert-success' : 'alert-danger', 'alert', 'container', 'myToolTip', this.state < 6 ? 'unused' : '']" role="alert" v-on:mouseover="onMouseOver = true" v-on:mouseleave="onMouseOver = false">
      <div class="item"> CONSEQUENCES </div> <div class="item"> <h3> {{this.consequences.length}}/4 </h3> </div>
      <span class="tooltiptext">Fill the right side of the diagram with all consequences resulting by the unwanted event. Be exhaustive and keep the most important elements (4 consequences at least) </span>
    </div>

    <div v-bind:class= "[this.rightFillingRate >= 1 ? 'alert-success' : 'alert-danger', 'alert', 'container', 'myToolTip', this.state < 4 ? 'unused' : '']" role="alert" v-on:mouseover="onMouseOver = true" v-on:mouseleave="onMouseOver = false">
      <div class="item"> BARRIERS RIGHT </div> <div class="item"> <h3> {{this.rightFillingRate}}/1 </h3> </div>
      <span class="tooltiptext">Add barriers to increase the left filling rate and improve diagram quality <br> <i class="formula"><b>[FORMULA]</b> nb right barriers / nb consequences</i></span>
    </div>

    <div v-bind:class= "[this.barriersAccuRateRight >= 0.7 ? 'alert-success' : 'alert-danger', 'alert', 'container', 'myToolTip', this.state < 5 ? 'unused' : '']" role="alert" v-on:mouseover="onMouseOver = true" v-on:mouseleave="onMouseOver = false">
      <div class="item">ESC.FACTORS RIGHT</div> <div class="item"> <h3> {{this.barriersAccuRateRight}}/0.7 </h3> </div>
      <span class="tooltiptext">Add escalation factors to model precisely a barrier failure probability <br> <i class="formula"><b>[FORMULA]</b> nb right esc. factors / nb consequences </i></span>
    </div>
</div>`,

}
