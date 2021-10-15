const p1 = {
    name : 'Kitana',
    hp : 100,
    img : 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon : ['Knife', 'Boobs'],
    attack : function () {
        return `${this.name} Fight...`;
    }
}

const p2 = {
    name : 'Subzero',
    hp : 100,
    img : 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon : ['Sword', 'Ice'],
    attack : function () {
        return `${this.name} Fight...`;
    }
}

const createPlayer = function (playerNum, player) {
    const $player = document.createElement('div');
    $player.className = playerNum;

    const $progressbar = document.createElement('div');
    $progressbar.className = 'progressbar';

    const $life = document.createElement('div');
    $life.className = 'life';
    $life.style.width = `${player.hp}%`;
    $progressbar.appendChild($life);

    const $name = document.createElement('div');
    $name.className = 'name';
    $name.innerText=player.name;
    $progressbar.appendChild($name);

    const $character = document.createElement('div');
    $character.className = 'character';

    const $avatar = document.createElement('img');
    $avatar.src=player.img;
    $character.appendChild($avatar);

    $player.appendChild($progressbar);
    $player.appendChild($character);


    $root = document.querySelector('.arenas');
    $root.appendChild($player);
}

createPlayer('player1', p1);

createPlayer('player2', p2);