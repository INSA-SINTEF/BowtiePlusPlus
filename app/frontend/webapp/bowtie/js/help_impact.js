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

        dictionnaire.set("greenC", " ");
        dictionnaire.set("lgC", " ");
        dictionnaire.set("yelC", " ");
        dictionnaire.set("orC", " ");
        dictionnaire.set("redC", " ");

        dictionnaire.set("greenR", " ");
        dictionnaire.set("lgR", " ");
        dictionnaire.set("yelR", " ");
        dictionnaire.set("orR", " ");
        dictionnaire.set("redR", " ");

        dictionnaire.set("greenE", " ");
        dictionnaire.set("lgE", " ");
        dictionnaire.set("yelE", " ");
        dictionnaire.set("orE", " ");
        dictionnaire.set("redE", " ");

        dictionnaire.set("greenI", " ");
        dictionnaire.set("lgI", " ");
        dictionnaire.set("yelI", " ");
        dictionnaire.set("orI", " ");
        dictionnaire.set("redI", " ");

        empty = false;
        return dictionnaire;
    }
    return {
        getInstance : function (update, key) {
            const item = sessionStorage.getItem('impact_dico');

            if (!dictionnaire && update){
                dictionnaire = createInstance();
                console.log("instance created");
            }
            if (update && (key === 'None')) {
                //Fill-in the map
                dictionnaire.set("greenC", getValOrPlaceholder("greenC"));
                dictionnaire.set("lgC", getValOrPlaceholder('lgC'));
                dictionnaire.set("yelC", getValOrPlaceholder('yelC'));
                dictionnaire.set("orC", getValOrPlaceholder('orC'));
                dictionnaire.set("redC", getValOrPlaceholder('redC'));

                dictionnaire.set("greenR", getValOrPlaceholder('greenR'));
                dictionnaire.set("lgR", getValOrPlaceholder('lgR'));
                dictionnaire.set("yelR", getValOrPlaceholder('yelR'));
                dictionnaire.set("orR", getValOrPlaceholder('orR'));
                dictionnaire.set("redR", getValOrPlaceholder('redR'));

                dictionnaire.set("greenE", getValOrPlaceholder('greenE'));
                dictionnaire.set("lgE", getValOrPlaceholder('lgE'));
                dictionnaire.set("yelE", getValOrPlaceholder('yelE'));
                dictionnaire.set("orE", getValOrPlaceholder('orE'));
                dictionnaire.set("redE", getValOrPlaceholder('redE'));

                dictionnaire.set("greenI", getValOrPlaceholder('greenI'));
                dictionnaire.set("lgI", getValOrPlaceholder('lgI'));
                dictionnaire.set("yelI", getValOrPlaceholder('yelI'));
                dictionnaire.set("orI", getValOrPlaceholder('orI'));
                dictionnaire.set("redI", getValOrPlaceholder('redI'));

                sessionStorage.setItem('impact_dico', JSON.stringify(Object.fromEntries(dictionnaire)));
                console.log(dictionnaire);

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
