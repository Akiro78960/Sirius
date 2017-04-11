class Boss{
    constructor(HP, maxHP, name){
        this.HP = HP
        this.maxHP = maxHP
        this.name=name
        this.x = 550
        this.y =200
        this.cooldown = 120
    }
    update(HP, lastTarget){
        this.HP=HP
        this.lastTarget = lastTarget
    }
    attack(){
        this.cooldown--
        if(this.cooldown >= 110){
            this.x-=10
        }else if(this.cooldown >= 100){
            this.x-=20
        }else if(this.cooldown >= 85){
            this.x-=50
        }else if(this.cooldown == 80){
            this.x = 550
        }
        if(this.cooldown <=0){
            this.cooldown = 120
        }
    }
}

class Player{
    constructor(name, level, HP, maxHP, MP, maxMP){
        this.name = name
        this.level=level
        this.HP=HP
        this.maxHP = maxHP
        this.MP = MP
        this.maxMP = maxMP
        this.x=50
        this.y=205
    }
    update(HP, MP){
        this.HP=HP
        this.MP = MP
    }
    doSkill1(){
        if(cooldown!=120 && cooldown>112){
            this.y-=5
        }else if(cooldown>104){
            this.y+=5
        }else if(cooldown>96){
            this.y-=5
        }else if(cooldown>88){
            this.y+=5
        }else if(cooldown>80){
            this.x+=5
        }else if(cooldown>60){
            this.x+=12
        }else if(cooldown>50){
            this.x+=20
        }else if(cooldown>40){
            this.x-=20
        }else if(cooldown>20){
            this.x-=12
        }else if(cooldown>15){
            this.x-=3
        }else{
            this.x=50
            this.y=205
        }
    }
    doSkill2(){
        if(cooldown!=120 && cooldown>100){
            this.x-=9
        }else if(cooldown==100){
            this.x=800
        }else if(cooldown>80){
            this.x-=10
        }else if(cooldown == 80){
            this.x=50
            this.y=205
        }
    }
    doSkill3(){
        if(cooldown!=120 && cooldown>90){
            this.y-=15
        }else if(cooldown==90){
            this.x=600
            this.y= -100
        }else if(cooldown >70){
            this.y+=19
        }else if(cooldown ==70){
            this.y=205
        }else if(cooldown >51){
            this.x-=30
        }else if(cooldown ==51){
            this.x=50
        }
    }
}

class Skill{
    constructor(name, dmg, cost){
        this.name = name
        this.dmg = dmg
        this.cost = cost
    }
}

class Ally{
    constructor(name, level, HP, maxHP, MP, maxMP, text, x, y, img){
        this.name = name
        this.level=level
        this.HP=HP
        this.maxHP = maxHP
        this.MP = MP
        this.maxMP = maxMP
        this.text = text
        this.x=x
        this.y=y
        this.img = img
        this.saveX = x
        this.saveY = y
        this.cooldown = 120
    }
    update(HP, MP){
        this.HP=HP
        this.MP = MP
    }
    spawn(){
        if(this.cooldown == 120){
            this.x -=300
        }else if(this.cooldown >= 90){
            this.x+=10
        }else if(this.cooldown <=0){
            this.x = this.saveX
        }
        ctx.fillStyle = "white"
        ctx.fillText(this.text, this.saveX-40, this.y-5, 120)

        this.cooldown-=1
        if(this.cooldown <=0){
            this.cooldown = 120
        }
        // console.log(this.cooldown)
    }
    attack(){
        console.log("attacked")
        if(cooldown!=120 && cooldown>112){
            this.y-=5
        }else if(cooldown>104){
            this.y+=5
        }else if(cooldown>96){
            this.y-=5
        }else if(cooldown>88){
            this.y+=5
        }else if(cooldown>80){
            this.x+=5
        }else if(cooldown>60){
            this.x+=12
        }else if(cooldown>50){
            this.x+=20
        }else{
            this.x=this.saveX
            this.y=this.saveY
        }
    }
}
