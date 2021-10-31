import { createElement, getRandom } from "./utils.js";
import { ATTACK, HIT } from "./constants.js";
import { generateLog } from "./logging.js";
import request from "./request.js";
import Player from "./player.js";

class Game{
    constructor(){
        this.$arenas = document.querySelector('.arenas');
        this.$randomButton = document.querySelector('.button');
        this.$formFight = document.querySelector('.control');
        this.$chat = document.querySelector('.chat');
    }

    checkRoundEnd = (p1, p2) => {
        if ( p1.hp === 0 && p2.hp === 0 ){
            this.$arenas.appendChild(this.showResult());
            generateLog('draw');
        } else if(p2.hp === 0){
            this.$arenas.appendChild(this.showResult(p1.name));
            generateLog('end', p1.name, p2.name);
        } else if(p1.hp === 0) {
            this.$arenas.appendChild(this.showResult(p2.name));
            generateLog('end', p2.name, p1.name);
        }
    }

    enemyAttack = ( hit, defense) => {
        //const hit = ATTACK[getRandom(3) - 1];
        hit = hit ? hit : ATTACK[getRandom(3) - 1];
        defense = defense ? defense : ATTACK[getRandom(3) - 1];
    
        return {
            value: getRandom(HIT[hit]),
            hit,
            defense
        }
    }

    createReloadButton = () => {
        const $reloadWrapper = createElement('div', 'reloadWrap');
        const $reloadButton = createElement('button','button');
        $reloadButton.innerText = "Reload";
        $reloadButton.addEventListener('click', () => { document.location.reload();} );
        $reloadWrapper.appendChild($reloadButton);
    
        return $reloadWrapper;
    }

    playerTurn = (player, enemyName, playerAct, enemyAct) => {
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

    showResult = (name) => {
        const $loseTitle = createElement('div', 'loseTitle');
        if(name){
            $loseTitle.innerText = name + ' win';
        }
        else {
            $loseTitle.innerText = 'DRAW';
        }
    
        return $loseTitle;
    }

    createPlayer = ({player, hp, name, img}) => {
        const $player = createElement('div', 'player'+player);
    
        const $progressbar = createElement('div', 'progressbar');
    
        const $life = createElement('div', 'life');
        $life.style.width = `${hp}%`;
        $progressbar.appendChild($life);
    
        const $name = createElement('div', 'name');
        $name.innerText=name;
        $progressbar.appendChild($name);
    
        const $character = createElement('div', 'character');
    
        const $avatar = createElement('img');
        $avatar.src=img;
        $character.appendChild($avatar);
    
        $player.appendChild($progressbar);
        $player.appendChild($character);
    
        return $player;
    }

    start = async () => {

        const allCharacters = await request.getAll();
        const player = allCharacters[getRandom(allCharacters.length - 1)];
        const enemy = await request.getRandomEnemy();    

        const p1 = new Player ({
            player : 1,
            ...player,
        });
        
        const p2 = new Player({
            player : 2,
            ...enemy,
        });

        //оказывается в эвент можно прокинуть так контекст
        //const instance = this;
        
        this.$formFight.addEventListener('submit', async function (event) {
            event.preventDefault();

            //И получить его потом тут.
            //console.log('instance', instance);

            let playerChoise = {};
        
            for(let item of GameInstance.$formFight){
                if ( item.checked && item.name === 'hit'){
                    //playerChoise.value = getRandom(HIT[item.value]);
                    playerChoise.hit = item.value;
                }
                if ( item.checked && item.name === 'defence'){
                    playerChoise.defence = item.value;
                }
                item.checked = false;
            }

            const {player1:player,player2:enemy} = await request.letFight(playerChoise);
        
            GameInstance.playerTurn(p1, p2.name, player, enemy)
            GameInstance.playerTurn(p2, p1.name, enemy, player);
        
            if ( p1.hp === 0 || p2.hp === 0 ) { 
                GameInstance.$randomButton.disabled = true;
                GameInstance.$arenas.appendChild(GameInstance.createReloadButton());
            }
        
            GameInstance.checkRoundEnd(p1,p2);
        
        });
        
        this.$arenas.appendChild(this.createPlayer(p1));
        this.$arenas.appendChild(this.createPlayer(p2));
        generateLog('start', p1, p2);
    }
}

const GameInstance = new Game();

export default GameInstance;

export const {$chat} = GameInstance;
