import axios from 'axios';
const gamesList = document.querySelector('#games-list');
//gamesList.innerHTML = html;
let games, singleGame;

const renderGames = (games) =>{
    const html =games.map(game=> `
    <div id= "game-item"> 
    <div id="rank"><rankID>${game.id}</rankID></div>           
    <div class="game-info">
        <div id= "title"><a href = '/games/${game.id}'>${game.title}</a></div>
        <div id= "details"><small><red>Publisher: </red>${game.pubname} | <red>Developer: </red>${game.devname} | <red>Released: </red>${game.releaseDate}</small></div>
    </div>
    </div>
    `).join('');
    gamesList.innerHTML = html;
}

const start = async() =>{
    try {
        //console.log("in start");
        games = (await axios.get('/api/games')).data;
        //const cars = (await axios.get('/api/cars')).data;
        //singleGame = (await axios.get('/api/games/:id')).data;
        renderGames(games);
        
    }
    catch(ex)
    {
        //console.log(ex);
    }
};

start();
