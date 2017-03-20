window.onload= function(){
    console.log("tick");
        displayLoadingScreen()

        setTimeout(function () {
        document.getElementById("personnage-details")
        $.ajax({
            type : "POST",
            url : "ajaxParties.php",
            data : {
            }
        }).done(function(reponse){
            result = JSON.parse(reponse)

            //////////enleve le loadingScreen/////////////
            var div = document.getElementById("parties-details")
            div.removeChild(document.getElementById("chargement"))
            div.removeChild(document.getElementById("loadingimg"))

            ///////////ajoute les elements/////////////
            $.each(result, function(index, value){
                var node = document.createElement("div")
                node.setAttribute("id", "partie-uniq")
                document.getElementById("parties-details").appendChild(node)
                appendField("Nom : " +result[index].name,node)
                appendField("Niveau : " +result[index].level,node)
                appendField("Population : "+result[index].nb + " / " + result[index].max_users,node)
                appendField("HP : " +result[index].current_hp,node)
                appendField("Type : " +result[index].type,node)
            })
        })
    }, 2000);

}

function appendField(str, index){
    var node = document.createElement("div")
    node.className = "partie-champ"

    var texte = document.createTextNode(str)
    node.appendChild(texte)

    var div = document.getElementById("parties-details")
    index.appendChild(node)
}

function displayLoadingScreen(){
    var node = document.createElement("h1")
    node.appendChild(document.createTextNode("Chargement..."))
    node.id = "chargement"
    var div = document.getElementById("parties-details")
    div.appendChild(node)
    node = document.createElement("img")
    node.src = "images/loading.gif"
    node.id = "loadingimg"
    div.appendChild(node)

}
