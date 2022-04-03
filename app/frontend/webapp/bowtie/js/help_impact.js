var dicoSingleton = (function () {
    var dictionnaire;
    var empty = true;
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
    /*
        function initalizeDictionnaire(dictionnaire){
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
        }
     */
    return {
        getInstance : function (update, key) {
            const item = sessionStorage.getItem('impact_dico');

            /*
            if(item===null){
                console.log("item is null");
            }
            */

            if (!dictionnaire && update){
                dictionnaire = createInstance();
                console.log("instance created");
            }
            if (update && (key === 'None')) {
                //Fill-in the map
                dictionnaire.set("greenC", document.getElementById("greenC").value);
                dictionnaire.set("lgC", document.getElementById('lgC').value);
                dictionnaire.set("yelC", document.getElementById('yelC').value);
                dictionnaire.set("orC", document.getElementById('orC').value);
                dictionnaire.set("redC", document.getElementById('redC').value);

                dictionnaire.set("greenR", document.getElementById('greenR').value);
                dictionnaire.set("lgR", document.getElementById('lgR').value);
                dictionnaire.set("yelR", document.getElementById('yelR').value);
                dictionnaire.set("orR", document.getElementById('orR').value);
                dictionnaire.set("redR", document.getElementById('redR').value);

                dictionnaire.set("greenE", document.getElementById('greenE').value);
                dictionnaire.set("lgE", document.getElementById('lgE').value);
                dictionnaire.set("yelE", document.getElementById('yelE').value);
                dictionnaire.set("orE", document.getElementById('orE').value);
                dictionnaire.set("redE", document.getElementById('redE').value);

                dictionnaire.set("greenI", document.getElementById('greenI').value);
                dictionnaire.set("lgI", document.getElementById('lgI').value);
                dictionnaire.set("yelI", document.getElementById('yelI').value);
                dictionnaire.set("orI", document.getElementById('orI').value);
                dictionnaire.set("redI", document.getElementById('redI').value);

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
