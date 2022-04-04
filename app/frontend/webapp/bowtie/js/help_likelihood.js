
var dicoSingleton = (function () {
    var dictionnaire;
    var empty = true;
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
            const item = sessionStorage.getItem('likelihood_dico');

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
                dictionnaire.set("greenA", document.getElementById("greenA").value);
                dictionnaire.set("lgA", document.getElementById('lgA').value);
                dictionnaire.set("yelA", document.getElementById('yelA').value);
                dictionnaire.set("orA", document.getElementById('orA').value);
                dictionnaire.set("redA", document.getElementById('redA').value);

                dictionnaire.set("greenO", document.getElementById('greenO').value);
                dictionnaire.set("lgO", document.getElementById('lgO').value);
                dictionnaire.set("yelO", document.getElementById('yelO').value);
                dictionnaire.set("orO", document.getElementById('orO').value);
                dictionnaire.set("redO", document.getElementById('redO').value);

                dictionnaire.set("greenM", document.getElementById('greenM').value);
                dictionnaire.set("lgM", document.getElementById('lgM').value);
                dictionnaire.set("yelM", document.getElementById('yelM').value);
                dictionnaire.set("orM", document.getElementById('orM').value);
                dictionnaire.set("redM", document.getElementById('redM').value);

                dictionnaire.set("greenMo", document.getElementById('greenMo').value);
                dictionnaire.set("lgMo", document.getElementById('lgMo').value);
                dictionnaire.set("yelMo", document.getElementById('yelMo').value);
                dictionnaire.set("orMo", document.getElementById('orMo').value);
                dictionnaire.set("redMo", document.getElementById('redMo').value);

                sessionStorage.setItem('likelihood_dico', JSON.stringify(Object.fromEntries(dictionnaire)));

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