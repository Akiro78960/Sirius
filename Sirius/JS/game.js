var dragon = null //contient uniquement la sprite
var boss = null
var player = null
var playerimg = new Image()
var previousReponse = null
var nextReponse = null
var ctx = null
var skill = []
var cooldown = 120
var nbSkill = null
var partiefinie=false
var ally = []
var imgHero2 = new Image()
var imgHero3 = new Image()
var imgHero4 = new Image()


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
        img.src="images/background.png"
        imgHero2.src="images/Hero2.png"
        imgHero3.src="images/Hero3.png"
        imgHero4.src="images/Hero4.png"

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
            for (var i = 0; i < previousReponse.other_players.length; i++) {
                if(i==0){
                    ally[i] = new Ally(previousReponse.other_players[i].name, previousReponse.other_players[i].level, previousReponse.other_players[i].hp, previousReponse.other_players[i].max_hp, previousReponse.other_players[i].mp, previousReponse.other_players[i].max_mp, previousReponse.other_players[i].welcome_text, 45, 325, imgHero2)
                }else if(i==1){
                    ally[i] = new Ally(previousReponse.other_players[i].name, previousReponse.other_players[i].level, previousReponse.other_players[i].hp, previousReponse.other_players[i].max_hp, previousReponse.other_players[i].mp, previousReponse.other_players[i].max_mp, previousReponse.other_players[i].welcome_text, 210, 330, imgHero3)
                }else{
                    ally[i] = new Ally(previousReponse.other_players[i].name, previousReponse.other_players[i].level, previousReponse.other_players[i].hp, previousReponse.other_players[i].max_hp, previousReponse.other_players[i].mp, previousReponse.other_players[i].max_mp, previousReponse.other_players[i].welcome_text, 205, 200, imgHero4)
                }
                ally[i].spawn()
            }
            nbAlly = previousReponse.other_players.length
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
            if(reponse == "\"GAME_NOT_FOUND_LOST\""){
                partiefinie=true
                ctx.font="120px monospace"
                ctx.fillStyle="red"
                ctx.fillText("GAME", 250, 200)
                ctx.fillText("OVER", 250, 420)
            }else if (reponse == "\"GAME_NOT_FOUND_WIN\"") {
                partiefinie=true
                ctx.font="150px monospace"
                ctx.fillStyle="red"
                ctx.fillText("VICTORY", 100, 330)
            }else if(reponse != "\"USER_NOT_FOUND\""){
                previousReponse = nextReponse
                nextReponse = JSON.parse(reponse)
                console.log(nextReponse);
                boss.update(nextReponse.game.hp, nextReponse.game.last_target)
                if(nextReponse.game.attacked){
                    boss.attack()
                }
                player.update(nextReponse.player.hp, nextReponse.player.mp)

                for (var i = 0; i < nextReponse.other_players.length; i++) {
                        if(ally[i] == null){
                            if(i==0){
                                ally[i] = new Ally(nextReponse.other_players[i].name, nextReponse.other_players[i].level, nextReponse.other_players[i].hp, nextReponse.other_players[i].max_hp, nextReponse.other_players[i].mp, nextReponse.other_players[i].max_mp, nextReponse.other_players[i].welcome_text, 45, 325, imgHero2)
                            }else if(i==1){
                                ally[i] = new Ally(nextReponse.other_players[i].name, nextReponse.other_players[i].level, nextReponse.other_players[i].hp, nextReponse.other_players[i].max_hp, nextReponse.other_players[i].mp, nextReponse.other_players[i].max_mp, nextReponse.other_players[i].welcome_text, 210, 330, imgHero3)
                            }else{
                                ally[i] = new Ally(nextReponse.other_players[i].name, nextReponse.other_players[i].level, nextReponse.other_players[i].hp, nextReponse.other_players[i].max_hp, nextReponse.other_players[i].mp, nextReponse.other_players[i].max_mp, nextReponse.other_players[i].welcome_text, 205, 200, imgHero4)
                            }
                            ally[i].spawn()
                        }
                        ally[i].update(nextReponse.other_players[i].hp, nextReponse.other_players[i].mp)
                        if(nextReponse.other_players[i].attacked != "--"){
                            ally[i].attack()
                        }
                }
            }
        })
        callAjax()
    }, 2500)

}

function tick(){
    if (!partiefinie) {
        ctx.drawImage(img, 0, 0)
        dragon.update()
        dragon.render(boss.x,boss.y)

        if (boss.cooldown!=120) {
            boss.attack()
        }
        drawInfoBoss()
        drawInfoPlayer()
        for (var i = 0; i < ally.length; i++) {
            if(ally[i].cooldownSpawn!= 120){
                ally[i].spawn()
            }
            if(ally[i].cooldownAttack != 120){
                ally[i].attack()
            }
        }
        drawInfoAlly()
        drawButtons()
        requestAnimationFrame(tick)
    }
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

function drawInfoAlly(){
    for (var i = 0; i < ally.length; i++) {
        ctx.strokeStyle="blue"
        ctx.strokeRect(140+i*120, 450, 100 ,80)
        ctx.fillStyle="white"
        ctx.font="16px Courier New"
        ctx.fillText(ally[i].name, 160+i*120, 465, 50, 50)
        ctx.strokeStyle="black"
        ctx.strokeRect(150+i*120, 473, 70, 12)
        ctx.fillStyle="red"
        ctx.fillRect(151+i*120, 474, (ally[i].HP/ally[i].maxHP)*68, 10)
        ctx.strokeRect(150+i*120, 493, 70, 12)
        ctx.fillStyle="blue"
        ctx.fillRect(151+i*120, 494, (ally[i].MP/ally[i].maxMP)*68, 10)
        ctx.drawImage(ally[i].img, ally[i].x, ally[i].y, 100, 100)
    }
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
    if(cooldown==120 && (player.MP>=skill[1].cost)){
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
    if(cooldown==120 && (player.MP>=skill[0].cost)){
        $.ajax({
            url: 'ajaxskills.php',
            type: 'POST',
            data: {
                value:skill[2].name
            }
        })
        .done(function() {
            nbSkill=3
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
