/**
 * This components represents the tutorial
 * Integrated within the HomePage component
 * Observes user diagram and action to help him with the next step to complete efficiently the diagram
 * @type {{template: string, methods: {}, props: {}}}
 */

export const TutorielComponent = {
    props: {
        //variable link to the component
    },
    template:
    //HTML code corresponding to the componet
        `
<div id="tuto">
    <div class="alert alert-success" role="alert">
        Etape 1:
        Here will be describe what to do so far
    </div>
    <div class="alert alert-success " role="alert">
        Etape 2:
        Here will be describe what to do so far
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
     `,
    methods: {}


}
