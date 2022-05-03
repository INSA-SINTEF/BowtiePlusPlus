
var dicoSingleton = (function () {
    var dictionnaire;
    var empty = true;
    function getValOrPlaceholder(key){
        let value = document.getElementById(key).value
        if(value === ""){
            return document.getElementById(key).placeholder;
        }
        return value;
    }
    function createInstance() {
        dictionnaire = new Map();

        dictionnaire.set("greenA", " ");
        dictionnaire.set("lgA", " ");
        dictionnaire.set("yelA", " ");
        dictionnaire.set("orA", " ");
        dictionnaire.set("redA", " ");

        dictionnaire.set("greenO", " ");
        dictionnaire.set("lgO", " ");
        dictionnaire.set("yelO", " ");
        dictionnaire.set("orO", " ");
        dictionnaire.set("redO", " ");

        dictionnaire.set("greenM", " ");
        dictionnaire.set("lgM", " ");
        dictionnaire.set("yelM", " ");
        dictionnaire.set("orM", " ");
        dictionnaire.set("redM", " ");

        dictionnaire.set("greenMo", " ");
        dictionnaire.set("lgMo", " ");
        dictionnaire.set("yelMo", " ");
        dictionnaire.set("orMo", " ");
        dictionnaire.set("redMo", " ");

        empty = false;
        return dictionnaire;
    }
    return {
        getInstance : function (update, key) {
            const item = sessionStorage.getItem('likelihood_dico');
            if (!dictionnaire && update){
                dictionnaire = createInstance();
                console.log("instance created");
            }
            if (update && (key === 'None')) {
                //Fill-in the map
                dictionnaire.set("greenA", getValOrPlaceholder("greenA"));
                //console.log(getValOrPlaceholder("greenA"));
                dictionnaire.set("lgA", getValOrPlaceholder('lgA'));
                dictionnaire.set("yelA", getValOrPlaceholder('yelA'));
                dictionnaire.set("orA", getValOrPlaceholder('orA'));
                dictionnaire.set("redA", getValOrPlaceholder('redA'));

                dictionnaire.set("greenO", getValOrPlaceholder('greenO'));
                dictionnaire.set("lgO", getValOrPlaceholder('lgO'));
                dictionnaire.set("yelO", getValOrPlaceholder('yelO'));
                dictionnaire.set("orO", getValOrPlaceholder('orO'));
                dictionnaire.set("redO", getValOrPlaceholder('redO'));

                dictionnaire.set("greenM", getValOrPlaceholder('greenM'));
                dictionnaire.set("lgM", getValOrPlaceholder('lgM'));
                dictionnaire.set("yelM", getValOrPlaceholder('yelM'));
                dictionnaire.set("orM", getValOrPlaceholder('orM'));
                dictionnaire.set("redM", getValOrPlaceholder('redM'));

                dictionnaire.set("greenMo", getValOrPlaceholder('greenMo'));
                dictionnaire.set("lgMo", getValOrPlaceholder('lgMo'));
                dictionnaire.set("yelMo", getValOrPlaceholder('yelMo'));
                dictionnaire.set("orMo", getValOrPlaceholder('orMo'));
                dictionnaire.set("redMo", getValOrPlaceholder('redMo'));

                sessionStorage.setItem('likelihood_dico', JSON.stringify(Object.fromEntries(dictionnaire)));

            } else{ //update est faux
                if(item !== null){
                    let obj = new Map(Object.entries(JSON.parse(item)));
                    if (obj.get(key)!=='undefined'){
                        return obj.get(key);
                    } else {
                        return '';
                    }
                }
            }
                return '';
            }
    }
}) ();

function run(update, key) {
    if(update){
        alert("The form has been submitted succesfully");
    }
    return dicoSingleton.getInstance(update, key);
}