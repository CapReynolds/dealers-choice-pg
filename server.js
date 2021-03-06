const {
    findAllGames,
    findGame,
} = require('./db/db');
const express = require('express');
const app = express();
const path = require('path');
app.use(express.json());
app.use('/api', require('./api')); //looking for /api find in the api folder

app.use(express.urlencoded({
    extended: true
  }));

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist'))); //find whatever is after dist in the dist folder
//app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));
//app.get('/games:id', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/games/', async(req, res, next)=>{
    res.redirect('/');
});

app.get('/games/:id', async(req, res, next)=>{
    var game;
    game = await findGame(req.params.id);
    //res.send(game);
    res.send(`
    <html>
    <head>
        <title>Top 10 Sega Dreamcast Games</title>
        <link rel="stylesheet" href="/assets/style.css" />
    </head>
        <body>
            <h1>Top 10 Sega Dreamcast Games</h1>
            <nav>
                <a href='/'>Home</a>
            </nav>
            <div id = "games-list">
            ${displayGame(game)}    
            </div>
            <div class="controls">
            ${displayControls(req.params.id)}
            </div>
        </body>
    </html>
    `);
});

const displayGame = (game) =>{
    var gameList = ''; 
    gameList += 
    `<div id= "game-itemB"> 
        <img src="/assets/${game.gameart}"/>   
        <div class="game-item2">
            <div id="rank">${game.id}</div>   
            <div id="content"><p>${game.content}</p></div>
            <div id= "details2"><small><red>Publisher: </red>${game.pubname} | <red>Developer: </red>${game.devname.join} | <red>Released: </red>${game.releaseDate}</small></div>
        </div>  
    </div>
`;
    return gameList;
}

const displayControls = (id) => {
    var gameList;
    var previous = parseInt(id) + 1;
    var next = parseInt(id) - 1;
    if(next === 0)
    {
        gameList = `
        <div id = "box">
            <div id = "arrow"><a href = '/games/${previous}'> < </a></div>
            <div><img src="/assets/segaSwirl3.jpeg"width="30" height="30"></div>
        </div>
    `
    }
    else if(previous === 11)
    {
        gameList = `
        <div id = "box">
            <div><img src="/assets/segaSwirl3.jpeg"width="30" height="30"></div>
            <div id = "arrow"><a href = '/games/${next}'> > </a></div>
        </div>
    `
    }
    else{
        gameList = `
        <div id = "box">
            <div id = "arrow"><a href = '/games/${previous}'> < </a></div>
            <div><img src="/assets/segaSwirl3.jpeg"width="30" height="30"></div>
            <div id = "arrow"><a href = '/games/${next}'> > </a></div>
        </div>
    `
    }
    return gameList;
}

const port = process.env.PORT || 3000;

app.listen(port, ()=>console.log(`Listening on port ${port}`));

