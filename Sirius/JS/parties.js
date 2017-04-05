var anim = 0
window.onload= function(){
        displayLoadingScreen()
        setTimeout(function(){
            //////////enleve le loadingScreen/////////////
            var div = document.getElementById("parties-details")
            div.innerHTML=""
        }, 2500)
        ajaxrefresh()



}

function ajaxrefresh(){
    setTimeout(function () {
    document.getElementById("personnage-details")
    if(!anim){
        $.ajax({
            type : "POST",
            url : "ajaxParties.php",
            data : {
            }
        }).done(function(reponse){
            result = JSON.parse(reponse)

            document.getElementById("parties-details").innerHTML=""
            ///////////ajoute les elements/////////////
            $.each(result, function(index, value){
                var node = document.createElement("div")
                node.setAttribute("class", "partie-uniq")
                node.setAttribute("id", "partie-uniq"+index)
                node.setAttribute("data-id", result[index].id)
                document.getElementById("parties-details").appendChild(node)
                appendField("Nom : " +result[index].name,node)
                appendField("Niveau : " +result[index].level,node)
                appendField("Population : "+result[index].nb + " / " + result[index].max_users,node)
                appendField("HP : " +result[index].current_hp,node)
                appendField("Type : " +result[index].type,node)
            })
            $(".partie-uniq").click( function(){
                var idgame = this.getAttribute("data-id")
                console.log(idgame);
                anim=1
                ////////////////////////////////////////////
                $(".partie-uniq").fadeOut(0)
                $(this).css({
                    position: "absolute",
                    left: "40%",
                    top:"0%"
                }, 400)
                $(this).fadeIn(200, function() {

                });
                $(this).animate({top: "40%"}, 500).animate({height: "100%", width: "90%", opacity: "0.3", top:"0%", left:"0%", fontSize:"5em"}, 500, function(){
                    $.ajax({
                        type : "POST",
                        url : "ajaxJoinGame.php",
                        data : {
                            id : idgame
                        }
                    }).done(function(reponse){
                        console.log(reponse);
                        location.href = "game.php"
                    })
                })
            })
            ajaxrefresh()
        })
    }
}, 2550)
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
