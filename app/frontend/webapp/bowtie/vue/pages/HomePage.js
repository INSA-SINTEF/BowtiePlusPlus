/**
 * Home Page
 * Related route: /
 * Contains the diagram editor
 */
import {TutorielComponent} from "../components/TutorielComponent.js";

export const HomePage = {
    template: `
        <div id="diagram-editor">
           <tuto id="tutoriel_component"></tuto>
            <iframe id="editor" src="/html/editor.html" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>
        </div>
    `,
    components: {
       'tuto': TutorielComponent
    },
}
