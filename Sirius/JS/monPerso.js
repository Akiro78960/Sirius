window.onload= function(){

        displayLoadingScreen()

        setTimeout(function () {
        document.getElementById("personnage-details")
        $.ajax({
            type : "POST",
            url : "ajax.php",
            data : {
            }
        }).done(function(reponse){
            result = JSON.parse(reponse)

            //////////enleve le loadingScreen/////////////
            var div = document.getElementById("personnage-details")
            div.removeChild(document.getElementById("chargement"))
            div.removeChild(document.getElementById("loadingimg"))

            ///////////ajoute les elements/////////////
            appendField("Username : "+result.username)
            appendField("HP : " +result.hp)
            appendField("MP : " +result.mp)
            appendField("Type : " +result.type)
            appendField("Niveau : " +result.level)
            appendField("Experience : " +result.exp)
            appendField("Victoires : " +result.victories)
            appendField("Defaites : " +result.loss)
            // appendField("JSON : " +reponse)

        })
    }, 2000);

}

function appendField(str){
    var node = document.createElement("div")
    node.className = "personnage-champ"

    var texte = document.createTextNode(str)
    node.appendChild(texte)

    var div = document.getElementById("personnage-details")
    div.appendChild(node)
}

function displayLoadingScreen(){
    var node = document.createElement("h1")
    node.appendChild(document.createTextNode("Chargement..."))
    node.id = "chargement"
    var div = document.getElementById("personnage-details")
    div.appendChild(node)
    node = document.createElement("img")
    node.src = "images/loading.gif"
    node.id = "loadingimg"
    div.appendChild(node)

}
