/**
 * Home Page
 * Related route: /
 * Contains the diagram editor
 */
import {TutorielComponent} from "../components/TutorielComponent.js";

export const HomePage = {
    template: `
        <div id="diagram-editor">
            <iframe src="/html/editor.html" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>
        </div>
        <tuto> test </tuto>
    `,
    components: {
       'tuto': TutorielComponent
    },
}
