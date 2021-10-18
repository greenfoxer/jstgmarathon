$arenas = document.querySelector('.arenas');
$randomButton = document.querySelector('.button');

const p1 = {
    player : 1,
    name : 'Kitana',
    hp : 100,
    img : 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon : ['Knife', 'Boobs'],
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

function playerLose(name){
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' lose';

    return $loseTitle;
}

function playerWin(name){
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = name + ' win';

    return $winTitle;
}

function draw(){
    const $drawTitle = createElement('div', 'loseTitle');
    $drawTitle.innerText = 'DRAW';

    return $drawTitle;
}

function getRandomWounds(){
    return Math.ceil(Math.random() * 20);
}

function changeHP(player){
    const $playerLife = document.querySelector(`.player${player.player} .life`);
    const wounds = getRandomWounds();
    if( player.hp >= wounds){
        player.hp -= wounds;
    }
    else {
        player.hp = 0;
    }
    $playerLife.style.width =player.hp+'%';
}

$randomButton.addEventListener('click', function () {
    changeHP(p1);
    changeHP(p2);

    if(p1.hp === 0 && p2.hp === 0){
        $arenas.appendChild(draw());
        $randomButton.disabled = true;
    }
    else if(p2.hp === 0){
        $arenas.appendChild(playerWin(p1.name));
        $randomButton.disabled = true;
    }
    else if(p1.hp === 0) {
        $arenas.appendChild(playerWin(p2.name));
        $randomButton.disabled = true;
    }
        
})

$arenas.appendChild(createPlayer(p1));
$arenas.appendChild(createPlayer(p2));