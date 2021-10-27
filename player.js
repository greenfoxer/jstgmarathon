export default class Player {
    constructor({player, name, hp, img}) {
        this.player = player;
        this.name = name;
        this.hp = hp;
        this.img = img;
    }

    elHp = () => {
        return document.querySelector(`.player${this.player} .life`);
    };

    renderHp = () => {
        this.elHp().style.width =this.hp+'%';
    }

    changeHP = (wounds) => {
        if( this.hp >= wounds){
            this.hp -= wounds;
        }
        else {
            this.hp = 0;
        }
    }
}