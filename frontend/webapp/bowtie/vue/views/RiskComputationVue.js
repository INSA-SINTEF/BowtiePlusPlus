let risk_vue = new Vue({
    el: '#risk_container',
    components : {
        'threats-component': ThreatsComponent,
        'consequences-component': ConsequencesComponent,
        'result-component': ResultComponent
    },
    data: function(){
        return {
            currentTab: 'Threats',
            tabs: ['Threats', 'Consequences'],
            threats: [],
            highestRiskValue: 'none_defined',
            accumulatedRiskValue: 'none_defined',
            missingConsequence: false,
            eventProbability: 'no_threats',
            consequences : []
        }
    },
    methods: {
        processThreats: function(input) {
            this.threats = input;

            //Check if there are threats to process
            if (this.threats.length === 0){
                this.eventProbability = 'no_threats';
                console.log("No threat linked to a likelihood matrix were found on the diagram");
                return;
            }

            let inter_res = 1;
            for(let i = 0; i < this.threats.length; i++){

                //Check if parameters of the threat are defined
                if(!this.threats[i].allDefined()){
                    this.eventProbability = "missing_param";
                    console.log("Missing parameter(s) on " + this.threats[i].name);
                    return;
                }

                inter_res *= (1.0 - this.threats[i].getProbability());
            }
            this.eventProbability = 1 - inter_res;
            this.processConsequences(this.consequences);
        },

        processConsequences: function(input){
            this.consequences = input;

            //Check if there are consequences to process
            if(this.consequences.length === 0){
                console.log("No consequences on diagram");
                this.highestRiskValue = "no_consequences";
                this.accumulatedRiskValue = "no_consequences";
                return;
            }

            let maxProduct = 0;
            let accumul = 0;
            let oneDefined = false;
            this.missingConsequence = false;

            for(let i = 0; i < this.consequences.length; i++){

                //Check if one consequence attributes are not defined
                if (!this.consequences[i].allDefined()){
                    console.log(this.consequences[i].name + " : Missing consequence parameters")
                    this.missingConsequence = true;
                    continue;
                }
                oneDefined = true;
                let product =  this.consequences[i].getProduct();
                if(product > maxProduct){
                    maxProduct = product;
                }
                accumul += product;
            }

            //Check if at least one consequence attributes are defined
            if(!oneDefined){
                this.highestRiskValue = 'none_defined';
                this.accumulatedRiskValue = 'none_defined';
                console.log("No consequence parameters are defined");
                return;
            }

            this.highestRiskValue = this.eventProbability * maxProduct;
            this.accumulatedRiskValue = this.eventProbability * accumul;
        }
    }
})