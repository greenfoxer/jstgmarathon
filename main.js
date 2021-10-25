const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');


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

function normalizeToTwoDigit(num) {
    return num.toString().length > 1 ? num : `0${num}`;
}

function generateLog(type, player1, player2, wounds=undefined){
    let text;
    const date = new Date(); 
    const normalizedTime = `${normalizeToTwoDigit(date.getHours())}:${normalizeToTwoDigit(date.getMinutes())}:${normalizeToTwoDigit(date.getSeconds())} `;
    switch(type){
        case "start":
            text = logs[type]
                .replace('[time]', normalizedTime)
                .replace('[player1]', player1.name)
                .replace('[player2]', player2.name)
            break;
        case 'draw' :
            text = logs[type];
            break;
        case 'end':
            text = logs[type][getRandom(logs[type].length) - 1]
                .replace('[playerWins]', player1 )
                .replace('[playerLose]', player2);
            break;
        default:
            text = `${normalizedTime} ` +
                logs[type][getRandom(logs[type].length) - 1]
                    .replace('[playerKick]', player2)
                    .replace('[playerDefence]', player1.name)
                + ` ${player1.name}: - ${wounds} hp [${player1.hp}/100]`;
            break;

    }
    const result = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin',result);
}

function playerTurn(player, enemyName, playerAct, enemyAct){
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

function checkRoundEnd(){
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

    console.log(player);
    console.log(enemy);
    playerTurn(p1, p2.name, player, enemy)
    playerTurn(p2, p1.name, enemy, player);

    if ( p1.hp === 0 || p2.hp === 0 ) { 
        $randomButton.disabled = true;
        $arenas.appendChild(createReloadButton());
    }

    checkRoundEnd();

});

generateLog('start', p1, p2);