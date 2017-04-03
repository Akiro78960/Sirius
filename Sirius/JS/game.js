var dragon = null
var boss = null

$(document).ready(function() {

    ctx = document.getElementById("canvas").getContext("2d")
    img = new Image()
    dragonImage = new Image()
    dragonImage.src="images/dragon-sprite.png"
    var previousReponse = null
    var nextReponse = null

    dragon = sprite({
        width:384,
        height:95,
        image:dragonImage,
        numberOfFrames:4,
        ticksPerFrame:8,
        scale:2,
        sX:92
    })


    $.ajax({
        type : "POST",
        url : "ajaxUpdate.php",
        data : {}
    }).done(function(reponse){
        previousReponse = JSON.parse(reponse)
        boss = new Boss(previousReponse.game.hp, previousReponse.game.max_hp, previousReponse.game.name)
        tick()
    })

    setInterval(function(){
        $.ajax({
            type : "POST",
            url : "ajaxUpdate.php",
            data : {}
        }).done(function(reponse){
            if(reponse != "\"USER_NOT_FOUND\""){
                previousReponse = nextReponse
                nextReponse = JSON.parse(reponse)
                console.log(nextReponse)
                boss.update(nextReponse.game.hp, nextReponse.game.last_target)
            }
        })
    }, 2500)
});

function tick(){

    img.src="images/background.png"
    ctx.drawImage(img, 0, 0)
    dragon.update()
    dragon.render(550,200)
    drawInfoBoss()
    requestAnimationFrame(tick)
}

function drawInfoBoss(){
    ctx.strokeStyle="blue"
    ctx.strokeRect(570, 450, 180 ,130)
    ctx.fillStyle="white"
    ctx.font="18px Courier New"
    ctx.fillText(boss.name, 625, 465, 80, 80)
    ctx.font="16px Courier New"
    ctx.fillText("HP:", 580, 520)
    ctx.strokeStyle="black"
    ctx.strokeRect(610, 508, 120, 15)
    ctx.fillStyle="red"
    ctx.fillRect(611, 509, (boss.HP/boss.maxHP)*118, 13)

    // ctx.strokeRect()

}
