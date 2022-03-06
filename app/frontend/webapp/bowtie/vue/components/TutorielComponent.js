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
            nbThreats: 0,
            nbConsequences: 0,
            nbBarriers: 0,
            nbAssets : 0,
            nbEscalationFactors : 0
        }
    },
    mounted : function(){
         },
    updated : function(){
        console.log("test");
        this.nbThreats = document.getElementById('diagram-editor').children[1].contentWindow.currentUI.editor.graph.getAllThreats().length;
    },
    methods: {
        //Réussir à l'appeler après qu'il ait été monté!
        update : function (){
            this.nbThreats = document.getElementById('diagram-editor').children[1].contentWindow.currentUI.editor.graph.getAllThreats().length;
            this.nbConsequences = document.getElementById('diagram-editor').children[1].contentWindow.currentUI.editor.graph.getAllConsequences().length;

        }
    },

    template:
    //HTML code corresponding to the component
        `
<div id="tuto">
    <div class="alert alert-success" role="alert">
        Number of threats disposed : {{this.nbThreats}}
      <button id="gostButtonTuto" v-on:click="update"> test </button>
    </div>
    <div class="alert alert-success " role="alert">
        Number of consequences disposed : {{this.nbConsequences}}
    </div>
    <div class="alert alert-danger" role="alert">
        Etape 3:
        Here will be describe what to do so far
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
</div>
     `

}
