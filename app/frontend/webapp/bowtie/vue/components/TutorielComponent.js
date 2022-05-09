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
            this.rebase();
            for (const cell of Object.values(this.allcells)) {
                switch (cell.customID) {
                    case "Hazard":
                        this.hazard.push(cell);
                        break;
                    case "Event":
                        this.event.push(cell);
                        break;
                    case "Barrier":
                        this.barriers.push(cell);
                        break;
                    case "Escalation Factor":
                        this.escalfactors.push(cell);
                        break;
                    case "Threat":
                        this.threats.push(cell);
                        break;
                    case "Cause":
                        this.causes.push(cell);
                        break;
                    case "Asset":
                        this.assets.push(cell);
                        break;
                    //consequence are deals in another way to separate the right side elements of the diagram
                }
            }


            this.consequences = this.graph.getAllConsequences()
            this.rightBarriers = 0;
            this.rightEscFactors = 0;
            this.consequences.forEach(cons => {
                this.rightBarriers += cons.barriers.length;
                this.rightEscFactors += cons.escalfactors.length
            });

            //Deals with 0 division
            this.threats.length+this.causes.length == 0? this.leftFillingRate = 0 : this.leftFillingRate = ((this.barriers.length-this.rightBarriers) / (this.threats.length+this.causes.length)).toFixed(1)
            this.consequences.length == 0 ? this.rightFillingRate = 0 : this.rightFillingRate = (this.rightBarriers / this.consequences.length).toFixed(1);
            (this.barriers.length-this.rightBarriers) == 0 ? this.barriersAccuRateLeft = 0 : this.barriersAccuRateLeft = ((this.escalfactors.length-this.rightEscFactors)/(this.barriers.length-this.rightBarriers)).toFixed(1);
            this.rightBarriers == 0? this.barriersAccuRateRight = 0 : this.barriersAccuRateRight = (this.rightEscFactors/this.rightBarriers).toFixed(1);

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

        rebase() {
            this.assets =[];
            this.hazard =[];
            this.event =[];
            this.threats =[];
            this.barriers =[];
            this.escalfactors =[];
            this.causes =[];
        }
    },

    template:
        //HTML code corresponding to the component
            `
<div id="tuto" v-show="this.is_displayed" >
<button id="gostButtonTuto" v-on:click="update"> <h3> Tutorial - TopDown approach </h3> </button>
    <div v-bind:class= "[this.event.length >= 1 ? 'alert-success' : 'alert-danger', 'alert', 'container', 'myToolTip']" role="alert">
        <div class="item"> UNWANTED EVENT </div> <div class="item"> <h3> {{this.event.length}}/1 </h3> </div>
        <span class="tooltiptext">The unwanted situation you want to analyse. Only one is allowed.</span>
    </div>
    <div v-bind:class= "[this.hazard.length >= 1 ? 'alert-success' : 'alert-danger', 'alert', 'container', 'myToolTip']" role="alert" v-on:mouseover="onMouseOver = true" v-on:mouseleave="onMouseOver = false">
      <div class="item"> HAZARD </div> <div class="item"> <h3> {{this.hazard.length}}/1 </h3> </div>
      <span class="tooltiptext">The main hazard related to the studied unwanted event (i.e., something around or part of the organization which has the potential to cause damage). Only one is allowed.</span>
    </div>

    <div v-bind:class= "[this.assets.length >= 3 ? 'alert-success' : 'alert-danger', 'alert', 'container', 'myToolTip']" role="alert" v-on:mouseover="onMouseOver = true" v-on:mouseleave="onMouseOver = false">
      <div class="item"> ASSETS </div> <div class="item"> <h3> {{this.assets.length}}/3 </h3> </div>
      <span class="tooltiptext">Resources related to the system you want to protect. It is usual to have several assets, think about what is valuable!</span>
    </div>

    <div v-bind:class= "[(this.threats.length+this.causes.length) >= 8 ? 'alert-success' : 'alert-danger', 'alert', 'container', 'myToolTip']" role="alert" v-on:mouseover="onMouseOver = true" v-on:mouseleave="onMouseOver = false">
      <div class="item"> THREATS & CAUSES </div> <div class="item"> <h3> {{this.threats.length+this.causes.length}}/8 </h3> </div>
      <span class="tooltiptext">Fill-in the left side of the diagram with events that can lead to the unwanted event.</span>
    </div>

    <div v-bind:class= "[this.leftFillingRate >= 1 ? 'alert-success' : 'alert-danger', 'alert', 'container', 'myToolTip']" role="alert" v-on:mouseover="onMouseOver = true" v-on:mouseleave="onMouseOver = false">
      <div class="item">LEFT BARRIERS / (CAUSES+THREATS)</div> <div class="item"> <h3> {{this.leftFillingRate}} </h3> </div>
      <span class="tooltiptext">Add barriers to make threats/causes relevant and improve diagram quality <b>(Ratio of 1 is good)</b></span>
    </div>

    <div v-bind:class= "[this.barriersAccuRateLeft >= 0.5 ? 'alert-success' : 'alert-danger', 'alert', 'container', 'myToolTip']" role="alert" v-on:mouseover="onMouseOver = true" v-on:mouseleave="onMouseOver = false">
      <div class="item">LEFT ESC.FACTORS / LEFT BARRIERS</div> <div class="item"> <h3> {{this.barriersAccuRateLeft}} </h3> </div>
      <span class="tooltiptext">Add escalation factors to model precisely a barrier failure probability <b>(Ratio of 0.5 is good)</b></span>
    </div>

    <div v-bind:class= "[this.consequences.length >= 4 ? 'alert-success' : 'alert-danger', 'alert', 'container', 'myToolTip']" role="alert" v-on:mouseover="onMouseOver = true" v-on:mouseleave="onMouseOver = false">
      <div class="item"> CONSEQUENCES </div> <div class="item"> <h3> {{this.consequences.length}}/4 </h3> </div>
      <span class="tooltiptext">Fill-in the right side of the diagram with consequences resulting from the unwanted event. </span>
    </div>

    <div v-bind:class= "[this.rightFillingRate >= 1 ? 'alert-success' : 'alert-danger', 'alert', 'container', 'myToolTip']" role="alert" v-on:mouseover="onMouseOver = true" v-on:mouseleave="onMouseOver = false">
      <div class="item"> RIGHT BARRIERS / CONSEQUENCES</div> <div class="item"> <h3> {{this.rightFillingRate}} </h3> </div>
      <span class="tooltiptext">Add barriers to make threats/causes relevant and improve diagram quality <b>(Ratio of 1 is good)</b></span>
    </div>

    <div v-bind:class= "[this.barriersAccuRateRight >= 0.5 ? 'alert-success' : 'alert-danger', 'alert', 'container', 'myToolTip']" role="alert" v-on:mouseover="onMouseOver = true" v-on:mouseleave="onMouseOver = false">
      <div class="item">RIGHT ESC.FACTORS / RIGHT BARRIERS</div> <div class="item"> <h3> {{this.barriersAccuRateRight}} </h3> </div>
      <span class="tooltiptext">Add escalation factors to model precisely a barrier failure probability <b>(Ratio of 0.5 is good)</b></span>
    </div>
</div>`,

}
