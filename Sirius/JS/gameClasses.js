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
