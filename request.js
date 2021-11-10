
export class Request{
    getAll = async() => {
        const all = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players')
            .then(res => res.json());
        return all;
    }
    getRandomEnemy = async() => {
        const enemy = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose')
            .then(res => res.json());
        return enemy;
    }
    letFight = async({hit,defence}) => {
        const round = fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                hit,
                defence,
            })
        }).then(res => res.json());
        return round;
    }
}

const request = new Request();

export default request;