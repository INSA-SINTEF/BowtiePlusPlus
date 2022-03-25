function getInfo(){
    var fs = requirejs("fs");
    const dictionnaire = new Map();

    dictionnaire.set("greenA", document.getElementById('greenA').value);
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

}