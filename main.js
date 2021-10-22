const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');


const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

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

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.className = className;
    }
    return $tag;
}

const createPlayer = function (player) {
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

function showResult(name){
    const $loseTitle = createElement('div', 'loseTitle');
    if(name){
        $loseTitle.innerText = name + ' win';
    }
    else {
        $loseTitle.innerText = 'DRAW';
    }

    return $loseTitle;
}

function getRandom(border){
    return Math.ceil(Math.random() * border);
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

function createReloadButton(){
    const $reloadWrapper = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button','button');
    $reloadButton.innerText = "Reload";
    $reloadButton.addEventListener('click', () => { document.location.reload();} );
    $reloadWrapper.appendChild($reloadButton);

    return $reloadWrapper;
}

$arenas.appendChild(createPlayer(p1));
$arenas.appendChild(createPlayer(p2));

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defense = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defense
    }
}

function playerTurn(player, playerAct, enemyAct){
    player.changeHP( playerAct.defense === enemyAct.hit ? 
        Math.ceil(enemyAct.value/5) : enemyAct.value);
    player.renderHp();
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

    playerTurn(p1, player, enemy);
    playerTurn(p2, enemy, player);

    if ( p1.hp === 0 || p2.hp === 0 ) { 
        $randomButton.disabled = true;
        $arenas.appendChild(createReloadButton());
    }

    if ( p1.hp === 0 && p2.hp === 0 ){
        $arenas.appendChild(showResult());
    } else if(p2.hp === 0){
        $arenas.appendChild(showResult(p1.name));
    } else if(p1.hp === 0) {
        $arenas.appendChild(showResult(p2.name));
    }

});