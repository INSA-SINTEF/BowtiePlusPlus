let templateSearchVue = new Vue({
    el: '#diagram-template-vue',
    components: {
        'search-bar': SearchBarComponent,
        'visualizer': VisualizerComponent,
    },
    data: function () {
        return {
            isPublic: 1,
            nameInput: "",
            all_template_names : [
                {
                    "id": 1,
                    "name": "Flood Risk",
                    "file": "flood_risks.xml",
                    "btn_link": "https://www-pub.iaea.org/MTCD/Publications/PDF/PUB1798_web.pdf",
                    "info": "This prefilled diagram takes into account the safety standards of the International Atomic Energy Agency for the protection of people and the environment. Regulations for the Safe Transport of Radioactive Material, 2018 edition."
                },
                /*{
                    "id": 2,
                    "name": "Dangerousness of the product sold",
                    "file": "dangerousness_productsold.xml",
                    "btn_link": "https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32001L0095&from=EN",
                    "info": "This prefilled diagram takes into account the directive 2001/95/EC of the European Parliament and of the Council of 3 December 2001 on general product safety. The attached diagram provides a summary of the company's obligations."
                },
                {
                    "id": 3,
                    "name": "Cyber risks (french version - ANSSI)",
                    "file": "norme_AIEA.xml",
                    "btn_link": "https://www.ssi.gouv.fr/uploads/2016/03/Referentiel_exigences_prestataires_integration_maintenance_V1_0.1.pdf",
                    "info": "This prefilled diagram takes into account cybersecurity requirements for industrial systems integration and maintenance providers. According to this standard, the risk assessment should include a list of feared incidents within the scope of the service as listed in the diagram."
                }*/
            ],
            all_diagrams: [],
            tags_selected: [],
            show_all_tags: true,
            loaded: {
                public: false,
                private: false,
                sharedWithMe: false
            }
        }
    },
    computed: {
    },
    methods: {
        init: function () {
            var token = localStorage.getItem('sessionToken');
            if (!token) {
                mxUtils.alert(mxResources.get('notLoggedIn'));
                return;
            }

            /**
             * Since the backend is not ready to deal with template, we use the hard way to get XML templates
             */
            this.loadTemplate();
            //console.log(this.all_diagrams[0]);
            this.loaded.public = true;

        },
        loadTemplate : function () {
            let xhr = new XMLHttpRequest();
            this.all_template_names.forEach(template => {
                xhr.open('GET', '../../'+template.file, false);
                xhr.send(null);
                let diag = Object({
                    id : template.id,
                    name : template.name,
                    is_public: true,
                    diagram : xhr.responseText,
                    //info : template.info,
                    //btn_link: template.btn_link
                });
                // console.log(diag);
                this.all_diagrams.push(diag);
            })
        }

    },
    created() {
        this.init()
    }
})
