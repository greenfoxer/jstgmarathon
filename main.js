import { getRandom } from "./utils.js";
import { HIT} from "./constants.js";
import { generateLog } from "./logging.js";
import { createPlayer, $arenas, enemyAttack, createReloadButton, $formFight, 
    $randomButton, playerTurn, checkRoundEnd } from "./game.js";

const p1 = {
    player : 1,
    name : 'Kitana',
    hp : 100,
    img : 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon : ['Knife', 'Boobs'],
    elHp,
    renderHp,
    changeHP,
    attack : function () {
        return `${this.name} Fight...`;
    }
}

const p2 = {
    player : 2,
    name : 'Subzero',
    hp : 100,
    img : 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon : ['Sword', 'Ice'],
    elHp,
    renderHp,
    changeHP,
    attack : function () {
        return `${this.name} Fight...`;
    }
}

function changeHP(wounds){
    if( this.hp >= wounds){
        this.hp -= wounds;
    }
    else {
        this.hp = 0;
    }
}

function elHp(){
    return document.querySelector(`.player${this.player} .life`);
}

function renderHp(){
    this.elHp().style.width =this.hp+'%';
}

$formFight.addEventListener('submit', function (event) {
    event.preventDefault();
    const enemy = enemyAttack();
    const player = {};

    for(let item of $formFight){
        if ( item.checked && item.name === 'hit'){
            player.value = getRandom(HIT[item.value]);
            player.hit = item.value;
        }
        if ( item.checked && item.name === 'defence'){
            player.defense = item.value;
        }
        item.checked = false;
    }

    playerTurn(p1, p2.name, player, enemy)
    playerTurn(p2, p1.name, enemy, player);

    if ( p1.hp === 0 || p2.hp === 0 ) { 
        $randomButton.disabled = true;
        $arenas.appendChild(createReloadButton());
    }

    checkRoundEnd(p1,p2);

});

$arenas.appendChild(createPlayer(p1));
$arenas.appendChild(createPlayer(p2));
generateLog('start', p1, p2);