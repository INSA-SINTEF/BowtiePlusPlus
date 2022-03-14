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
            is_displayed : 1, //1 displayed , 0 hided
            editor : null,
            nbThreats: 0,
            nbConsequences: 0,
            nbBarriers: 0,
            nbAssets : 0,
            nbEscalationFactors : 0,
            nbHazard: 0,
            nbUnwantedEvent: 0,
            nbCauses: 0,
            events : [],
            state: 0
        }
    },
    methods: {
        update : function (){
            if (this.editor == null) this.editor = document.getElementById('diagram-editor').children[1].contentWindow.currentUI.editor;
            this.nbThreats = this.editor.graph.getAllThreatsCells().length;
            this.nbConsequences = this.editor.graph.getAllConsequences().length;
            this.nbCauses = this.editor.graph.getAllCausesCells().length
            this.nbBarriers = this.editor.graph.getAllBarriersCells().length;
            this.nbEscalationFactors = this.editor.graph.getAllEscFactCells().length
            this.nbHazard = this.editor.graph.getAllHazardsCells().length;
            this.nbUnwantedEvent = this.editor.graph.getAllEventsCells().length;
            this.nbAssets = this.editor.graph.getAllAssetsCells().length;
            this.tutorialState();
            },

        tutorialState : function () {
            this.nbUnwantedEvent >= 1 ? this.state = 1 : '';
            this.nbHazard >= 1 ? this.state = 2 : '';
            this.nbAssets >= 3 ? this.state = 3 : '';
            this.nbThreats + this.nbCauses >= 8 ? this.state = 4 : '';
            this.nbBarriers >= 6 ? this.state = 5 : '';
            this.nbEscalationFactors >= 3 ? this.state = 6 : '';
            this.nbConsequences >= 4 ? this.state = 7 : '';
        },

        //function that update the render of the tutoriel, if there is a modal open in the editor, then do not display tutoriel
        zIndex_hide : function () {
            this.is_displayed = 0;
            try {
                let closeBtn = document.getElementById('diagram-editor').children[1].contentWindow.document.getElementsByClassName("geDialogClose")[0];
                closeBtn.addEventListener('click',this.zIndex_show);
            } catch (e) {
                console.log(e);
            }
            },

        //function that update the render of the tutoriel, if we close the modal then display tutoriel
        zIndex_show : function () {
            this.is_displayed = 1;
        },

        initialisation : function () {
            let items = [];
            items = document.getElementById('diagram-editor').children[1].contentWindow.document.getElementsByClassName("geItem");
            for (let item of items) {
                item.addEventListener('click',() => {
                    let tmp = document.getElementById('diagram-editor').children[1].contentWindow.document.getElementsByClassName("mxPopupMenuItem");
                    for (let test of tmp){
                        test.addEventListener('mouseup',this.zIndex_hide);
                    }
                })
            }
            this.events.push(document.getElementById('diagram-editor').children[1].contentWindow.document.getElementById("riskButton"));
            this.events.forEach(event => {
                event.addEventListener('click',this.zIndex_hide)
            })

        }
    },
    template:
        //HTML code corresponding to the component
            `
<div id="tuto" v-bind:style="{'z-index' : is_displayed}" >
<button id="gostButtonTuto" v-on:click="update" v-on:click.once="initialisation"> <h3> Tutorial </h3> </button>
    <div v-bind:class= "[this.nbUnwantedEvent >= 1 ? 'alert-success' : 'alert-danger', 'alert', 'container', this.state < 0 ? 'unused' : '']" role="alert">
        <div class="item"> UNWANTED EVENT </div> <div class="item"> <h3> {{this.nbUnwantedEvent}}/1 </h3> </div>
    </div>
    <div v-bind:class= "[this.nbHazard >= 1 ? 'alert-success' : 'alert-danger', 'alert', 'container', this.state < 1 ? 'unused' : '']" role="alert">
      <div class="item"> HAZARD </div> <div class="item"> <h3> {{this.nbHazard}}/1 </h3> </div>
    </div>
    <div v-bind:class= "[this.nbAssets >= 3 ? 'alert-success' : 'alert-danger', 'alert', 'container', this.state < 2 ? 'unused' : '']" role="alert">
      <div class="item"> ASSETS </div> <div class="item"> <h3> {{this.nbAssets}}/3 </h3> </div>
    </div>
    <div v-bind:class= "[(this.nbThreats+this.nbCauses) >= 8 ? 'alert-success' : 'alert-danger', 'alert', 'container', this.state < 3 ? 'unused' : '']" role="alert">
      <div class="item"> THREATS & CAUSES </div> <div class="item"> <h3> {{this.nbThreats+this.nbCauses}}/8 </h3> </div>
    </div>
    <div v-bind:class= "[this.nbBarriers >= 6 ? 'alert-success' : 'alert-danger', 'alert', 'container', this.state < 4 ? 'unused' : '']" role="alert">
      <div class="item"> BARRIERS </div> <div class="item"> <h3> {{this.nbBarriers}}/6 </h3> </div>
    </div>
    <div v-bind:class= "[this.nbEscalationFactors >= 3 ? 'alert-success' : 'alert-danger', 'alert', 'container', this.state < 5 ? 'unused' : '']" role="alert">
      <div class="item"> ESC. FACTORS </div> <div class="item"> <h3> {{this.nbEscalationFactors}}/3 </h3> </div>
    </div>
    <div v-bind:class= "[this.nbConsequences >= 4 ? 'alert-success' : 'alert-danger', 'alert', 'container', this.state < 6 ? 'unused' : '']" role="alert">
      <div class="item"> CONSEQUENCES </div> <div class="item"> <h3> {{this.nbConsequences}}/4 </h3> </div>
    </div>
</div>`,

}
