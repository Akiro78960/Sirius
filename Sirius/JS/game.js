$(document).ready(function() {

    ctx = document.getElementById("canvas").getContext("2d")
    img = new Image()

    var previousReponse = null
    var nextReponse = null
    $.ajax({
        type : "POST",
        url : "ajaxUpdate.php",
        data : {}
    }).done(function(reponse){
        previousReponse = reponse
    })


    setInterval(function(){
        $.ajax({
            type : "POST",
            url : "ajaxUpdate.php",
            data : {}
        }).done(function(reponse){
            console.log(reponse);
            if(reponse != "USER_NOT_FOUND"){
                previousReponse = nextReponse
                nextReponse = reponse
                draw()
            }
        })
    }, 2200)
});



function draw(){
    img.src="images/background.png"
    ctx.drawImage(img, 0, 0)
}
