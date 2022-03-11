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
            threats: [],
            consequences: [],
            nbThreats: 0,
            nbConsequences: 0,
            nbBarriers: 0,
            nbAssets : 0,
            nbEscalationFactors : 0
        }
    },
    methods: {
        update : function (){
            this.threats = document.getElementById('diagram-editor').children[1].contentWindow.currentUI.editor.graph.getAllThreats();
            this.nbThreats = this.threats.length;
            this.consequences = document.getElementById('diagram-editor').children[1].contentWindow.currentUI.editor.graph.getAllConsequences();
            this.nbConsequences = this.consequences.length;
            this.computeBarriers();
        },
        computeBarriers : function(){
            this.nbBarriers = 0;
            this.nbEscalationFactors = 0;
            this.threats.forEach( threat => {
                this.nbBarriers+= threat.barriers.length;
                this.nbEscalationFactors += threat.barriers.escalfactors.length;
            });
            this.consequences.forEach( cons => {
                this.nbBarriers+= cons.barriers.length;
                this.nbEscalationFactors += cons.barriers.escalfactors.length;
            });
        }
    },
    template:
        //HTML code corresponding to the component
            `
<div id="tuto">
    <div class="alert alert-success" role="alert">
        Number of threats disposed : {{this.nbThreats}}
      <button id="gostButtonTuto" v-on:click="update"> </button>
    </div>
    <div class="alert alert-success " role="alert">
        Number of consequences disposed : {{this.nbConsequences}}
    </div>
    <div class="alert alert-danger" role="alert">
      Number of barriers disposed : {{this.nbBarriers}}
    </div>
    <div class="alert alert-danger unused" role="alert">
        Etape 4:
        Here will be describe what to do so far
    </div>
    <div class="alert alert-danger unused" role="alert">
        Etape 5:
        Here will be describe what to do so far
    </div>
    <div class="alert alert-danger unused" role="alert">
        Etape 6:
        Here will be describe what to do so far
    </div>
    <div class="alert alert-danger unused" role="alert">
        Etape 7:
        Here will be describe what to do so far
    </div>
</div>`,

}
