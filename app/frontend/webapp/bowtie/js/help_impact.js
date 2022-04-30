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
                dictionnaire.set("greenC", getValOrPlaceholder("greenC").value);
                dictionnaire.set("lgC", getValOrPlaceholder('lgC').value);
                dictionnaire.set("yelC", getValOrPlaceholder('yelC').value);
                dictionnaire.set("orC", getValOrPlaceholder('orC').value);
                dictionnaire.set("redC", getValOrPlaceholder('redC').value);

                dictionnaire.set("greenR", getValOrPlaceholder('greenR').value);
                dictionnaire.set("lgR", getValOrPlaceholder('lgR').value);
                dictionnaire.set("yelR", getValOrPlaceholder('yelR').value);
                dictionnaire.set("orR", getValOrPlaceholder('orR').value);
                dictionnaire.set("redR", getValOrPlaceholder('redR').value);

                dictionnaire.set("greenE", getValOrPlaceholder('greenE').value);
                dictionnaire.set("lgE", getValOrPlaceholder('lgE').value);
                dictionnaire.set("yelE", getValOrPlaceholder('yelE').value);
                dictionnaire.set("orE", getValOrPlaceholder('orE').value);
                dictionnaire.set("redE", getValOrPlaceholder('redE').value);

                dictionnaire.set("greenI", getValOrPlaceholder('greenI').value);
                dictionnaire.set("lgI", getValOrPlaceholder('lgI').value);
                dictionnaire.set("yelI", getValOrPlaceholder('yelI').value);
                dictionnaire.set("orI", getValOrPlaceholder('orI').value);
                dictionnaire.set("redI", getValOrPlaceholder('redI').value);

                sessionStorage.setItem('impact_dico', JSON.stringify(Object.fromEntries(dictionnaire)));

                /*
                var obj = Object.fromEntries(dictionnaire);
                var jsonString = JSON.stringify(obj);

                localStorage.setItem('dico', jsonString);
                 */
                //sessionStorage.setItem('dico', JSON.stringify(Object.fromEntries(dictionnaire)));

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
    return dicoSingleton.getInstance(update, key);
}
