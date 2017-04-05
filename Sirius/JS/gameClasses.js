class Boss{
    constructor(HP, maxHP, name){
        this.HP = HP
        this.maxHP = maxHP
        this.name=name
    }
    update(HP, lastTarget){
        this.HP=HP
        this.lastTarget = lastTarget
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
        this.y=225
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
        }else if(cooldown>12){
            this.x-=5
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
            this.y=225
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
