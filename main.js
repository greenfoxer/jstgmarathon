$arenas = document.querySelector('.arenas');
$randomButton = document.querySelector('.button');

const p1 = {
    player : 1,
    name : 'Kitana',
    hp : 100,
    img : 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon : ['Knife', 'Boobs'],
    elHp : elHp,
    renderHp : renderHp,
    changeHP: changeHP,
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
    elHp : elHp,
    renderHp : renderHp,
    changeHP: changeHP,
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

function getRandomWounds(){
    return Math.ceil(Math.random() * 20);
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

function playerTurn(player){
    player.changeHP(getRandomWounds());
    player.renderHp();
}

function createReloadButton(){
    const $reloadWrapper = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button','button');
    $reloadButton.innerText = "Reload";
    $reloadButton.addEventListener('click', () => { document.location.reload();} );
    $reloadWrapper.appendChild($reloadButton);

    return $reloadWrapper;
}

$randomButton.addEventListener('click', function () {
    playerTurn(p1);
    playerTurn(p2);

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
        
})

$arenas.appendChild(createPlayer(p1));
$arenas.appendChild(createPlayer(p2));