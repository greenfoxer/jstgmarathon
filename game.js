import { createElement, getRandom } from "./utils.js";
import { ATTACK, HIT } from "./constants.js";
import { generateLog } from "./logging.js";

export const $arenas = document.querySelector('.arenas');
export const $randomButton = document.querySelector('.button');
export const $formFight = document.querySelector('.control');
export const $chat = document.querySelector('.chat');

export const createPlayer = (player) => {
    const $player = createElement('div', 'player'+player.player);

    const $progressbar = createElement('div', 'progressbar');

    const $life = createElement('div', 'life');
    $life.style.width = `${player.hp}%`;
    $progressbar.appendChild($life);

    const $name = createElement('div', 'name');
    $name.innerText=player.name;
    $progressbar.appendChild($name);

    const $character = createElement('div', 'character');

    const $avatar = createElement('img');
    $avatar.src=player.img;
    $character.appendChild($avatar);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
}

export const showResult = (name) => {
    const $loseTitle = createElement('div', 'loseTitle');
    if(name){
        $loseTitle.innerText = name + ' win';
    }
    else {
        $loseTitle.innerText = 'DRAW';
    }

    return $loseTitle;
}

export function playerTurn(player, enemyName, playerAct, enemyAct){
    let wounds = 0;
    if(  playerAct.defense === enemyAct.hit ) {
        wounds = Math.ceil(enemyAct.value/5);
        player.changeHP(wounds);
        generateLog('defence', player, enemyName,wounds);
    } else {
        wounds =  enemyAct.value;
        player.changeHP(wounds);
        generateLog('hit', player, enemyName,wounds);
    }
    player.renderHp();
}

export function checkRoundEnd(p1, p2){
    if ( p1.hp === 0 && p2.hp === 0 ){
        $arenas.appendChild(showResult());
        generateLog('draw');
    } else if(p2.hp === 0){
        $arenas.appendChild(showResult(p1.name));
        generateLog('end', p1.name, p2.name);
    } else if(p1.hp === 0) {
        $arenas.appendChild(showResult(p2.name));
        generateLog('end', p2.name, p1.name);
    }
}

export const createReloadButton = () => {
    const $reloadWrapper = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button','button');
    $reloadButton.innerText = "Reload";
    $reloadButton.addEventListener('click', () => { document.location.reload();} );
    $reloadWrapper.appendChild($reloadButton);

    return $reloadWrapper;
}

export const enemyAttack = ( hit, defense) => {
    //const hit = ATTACK[getRandom(3) - 1];
    hit = hit ? hit : ATTACK[getRandom(3) - 1];
    defense = defense ? defense : ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defense
    }
}