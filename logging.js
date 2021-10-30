import { getRandom } from "./utils.js";
import { $chat } from "./game.js";
import { logs } from "./constants.js";


const normalizeToTwoDigit = (num) => {
    return num.toString().length > 1 ? num : `0${num}`;
}

export const generateLog = (type, player1, player2, wounds=undefined) => {
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