const router = require('express').Router();

const {
    findAllGames,
    findGame,
} = require('../db/db');

router.get('/games', async(req,res,next)=>{
    try {
        var game;
        var gameArray = [];
        
        for(let i = 10; i>0; i--)
        {
            game = await findGame(i);
            //console.log(game);
            gameArray.push(game);
        }
        
       //game = (await findAllGames()).data;
        //console.log(game); 
        res.send(gameArray);
        //res.send('Testing');
    }
    catch(ex) {
        next(ex);
    }
});


router.get('/games/:id', async(req,res,next)=>{
    try {
        var game;
        console.log('hello in the id');
        game = await findGame(req.params.id);

        res.send(game);
        
    }
    catch(ex) {
        next(ex);
    }
});

module.exports = router;