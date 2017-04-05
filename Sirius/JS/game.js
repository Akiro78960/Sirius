var dragon = null
var boss = null
var player = null
var playerimg = new Image()
var previousReponse = null
var nextReponse = null
var ctx = null
var skill = []
var cooldown = 120
var nbSkill = null


$(document).ready(function() {

    displayLoadingScreen()
    setTimeout(function(){
        var div = document.getElementById("LoadingDiv")
        div.removeChild(document.getElementById("chargement"))
        div.removeChild(document.getElementById("loadingimg"))

        ctx = document.getElementById("canvas").getContext("2d")
        img = new Image()
        dragonImage = new Image()
        playerimg .src = "images/Hero.png"
        dragonImage.src="images/dragon-sprite.png"

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
            player = new Player(previousReponse.player.name, previousReponse.player.level, previousReponse.player.hp, previousReponse.player.max_hp, previousReponse.player.mp, previousReponse.player.max_mp)
            for (var i = 0; i < previousReponse.player.skills.length; i++) {
                skill[i]=new Skill(previousReponse.player.skills[i].name, previousReponse.player.skills[i].dmg, previousReponse.player.skills[i].cost)
            }
            tick()
        })
        callAjax()
    }, 2000)

});




function callAjax(){
    setTimeout(function(){
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
                player.update(nextReponse.player.hp, nextReponse.player.mp)
            }
        })
        callAjax()
    }, 2500)

}

function tick(){
    img.src="images/background.png"
    ctx.drawImage(img, 0, 0)
    dragon.update()
    dragon.render(550,200)
    drawInfoBoss()
    drawInfoPlayer()
    drawButtons()
    requestAnimationFrame(tick)
}

function timerCooldown(){
        cooldown--
        if(cooldown<=0){
            cooldown = 120
        }else {
            switch (nbSkill) {
                case 1:
                    player.doSkill1()
                    break
                case 2:
                    player.doSkill2()
                    break
                case 3:
                    player.doSkill3()
                    break

            }
            requestAnimationFrame(timerCooldown)
        }
}

function drawInfoBoss(){
    ctx.strokeStyle="blue"
    ctx.strokeRect(570, 450, 180 ,130)
    ctx.fillStyle="white"
    ctx.font="18px Courier New"
    ctx.fillText(boss.name, 625, 465, 80, 80)
    ctx.font="16px Courier New"
    ctx.fillText("HP:", 580, 520)
    ctx.fillText(boss.HP+"/"+boss.maxHP, 615, 540)
    ctx.strokeStyle="black"
    ctx.strokeRect(610, 508, 120, 15)
    ctx.fillStyle="red"
    ctx.fillRect(611, 509, (boss.HP/boss.maxHP)*118, 13)
}

function drawInfoPlayer(){
    ctx.strokeStyle="blue"
    ctx.strokeRect(20, 450, 100 ,80)
    ctx.fillStyle="white"
    ctx.font="16px Courier New"
    ctx.fillText(player.name, 40, 465, 50, 50)
    ctx.strokeStyle="black"
    ctx.strokeRect(30, 473, 70, 12)
    ctx.fillStyle="red"
    ctx.fillRect(31, 474, (player.HP/player.maxHP)*68, 10)
    ctx.strokeRect(30, 493, 70, 12)
    ctx.fillStyle="blue"
    ctx.fillRect(31, 494, (player.MP/player.maxMP)*68, 10)
    ctx.drawImage(playerimg, player.x, player.y, 100, 100)
}

function drawButtons(){
    for (var i = 0; i < 3; i++) {
        var node = document.getElementById("button"+(i+1))
        node.style.display = "none"
        node.innerHTML=""
     }
    for (var i = 0; i < skill.length; i++) {
        var node = document.getElementById("button"+(i+1))
        node.style.display = "inline-block"
        var str = skill[i].name
        if(cooldown<120){
            str="2"
        }
        if(cooldown<60){
            str = "1"
        }
        var texte = document.createTextNode(str)
        node.appendChild(texte)
        if(cooldown==120){
            node.appendChild(document.createElement("br"))
            texte = document.createTextNode("dmg: " + skill[i].dmg)
            node.appendChild(texte)
                    node.appendChild(document.createElement("br"))
            texte = document.createTextNode("MP: " + skill[i].cost)
            node.appendChild(texte)
        }
    }
}

function clickButton1(){
    if(cooldown==120 && (player.MP>=skill[0].cost)){
        $.ajax({
            url: 'ajaxskills.php',
            type: 'POST',
            data: {
                value:skill[0].name
            }
        })
        .done(function() {
            nbSkill=1
            player.doSkill1()
        })
        timerCooldown()
    }else if(cooldown==120 ){
        alert("pas assez de MP pour cette action")
    }
}

function clickButton2(){
    if(cooldown==120){
        $.ajax({
            url: 'ajaxskills.php',
            type: 'POST',
            data: {
                value:skill[1].name
            }
        })
        .done(function() {
            nbSkill=2
            player.doSkill2()
        })
        timerCooldown()
    }
}

function clickButton3(){
    if(cooldown==120){
        $.ajax({
            url: 'ajaxskills.php',
            type: 'POST',
            data: {
                value:skill[2].name
            }
        })
        .done(function() {
            nbSkill=1
            player.doSkill3()
        })
        timerCooldown()
    }
}

function displayLoadingScreen(){
    var node = document.createElement("h1")
    node.appendChild(document.createTextNode("Chargement..."))
    node.id = "chargement"
    var div = document.getElementById("LoadingDiv")
    div.appendChild(node)
    node = document.createElement("img")
    node.src = "images/loading.gif"
    node.id = "loadingimg"
    div.appendChild(node)
}
