const pg = require('pg');
const client = new pg.Client('postgres://localhost/dealers-choice-pg');

const syncAndSeed = async()=>{
    const SQL = `
        DROP TABLE IF EXISTS developers CASCADE;
        DROP TABLE IF EXISTS publishers CASCADE;
        DROP TABLE IF EXISTS games;

        CREATE TABLE developers(
            devid INTEGER PRIMARY KEY,
            devname VARCHAR(255) NOT NULL
        );
        CREATE TABLE publishers(
            pubid INTEGER PRIMARY KEY,
            pubname VARCHAR(255) NOT NULL
        );
        CREATE TABLE games(
            id INTEGER PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL UNIQUE,
            gameArt VARCHAR(255) NOT NULL,
            releaseDate DATE,
            developersid INTEGER,
            publishersid INTEGER,
            FOREIGN KEY (developersid) REFERENCES developers(devid),
            FOREIGN KEY (publishersid) REFERENCES publishers(pubid)
        );

        INSERT INTO developers(devid, devname) VALUES(1, 'Smilebit, BitWorks');
        INSERT INTO developers(devid, devname) VALUES(2, 'Project Soul, Namco');
        INSERT INTO developers(devid, devname) VALUES(3, 'Sega, Sonic Team');
        INSERT INTO developers(devid, devname) VALUES(4, 'Capcom');
        INSERT INTO developers(devid, devname) VALUES(5, 'Sega Hitmaker');
        INSERT INTO developers(devid, devname) VALUES(6, 'Atari Games, BitWorks');
        INSERT INTO developers(devid, devname) VALUES(7, 'Point of View, Midway Games, Crawfish Interactive');
        INSERT INTO developers(devid, devname) VALUES(8, 'Neversoft, Activision');
        
        INSERT INTO publishers(pubid, pubname) VALUES(1, 'Sega');
        INSERT INTO publishers(pubid, pubname) VALUES(2, 'Namco, BANDAI Entertainment');
        INSERT INTO publishers(pubid, pubname) VALUES(3, 'Capcom');
        INSERT INTO publishers(pubid, pubname) VALUES(4, 'Midway Games');
        INSERT INTO publishers(pubid, pubname) VALUES(5, 'Activision');

        INSERT INTO games(id, title, content, gameArt, releaseDate, developersid, publishersid) 
            VALUES(1, 'Jet Grind Radio', 'Jet Set Radio is a 2000 action game developed by Smilebit and published by Sega for the Dreamcast. The player controls a member of a youth gang, the GGs, as they use inline skates to traverse Tokyo, spraying graffiti and evading authorities. Development was headed by director Masayoshi Kikuchi, with art by Ryuta Ueda.', 'JetGrindRadio2.jpg', '(6/1/2001)', 1, 1);
        INSERT INTO games(id, title, content, gameArt, releaseDate, developersid, publishersid) 
            VALUES(2, 'Soul Calibur', 'Soulcalibur is a weapon-based 3D fighting game developed by Project Soul and produced by Namco. It is the second game in the Soulcalibur series, preceded by Soul Edge in December 1995. Originally released in arcades on July 30, 1998, it ran on the Namco System 12 hardware.', 'SoulCalibur.jpg', '(7/30/1998)', 2, 2);
        INSERT INTO games(id, title, content, gameArt, releaseDate, developersid, publishersid) 
            VALUES(3, 'Sonic Adventure 2', 'Sonic Adventure 2 is a 2001 platform game developed by Sonic Team USA and published by Sega. It was the final Sonic the Hedgehog game for the Dreamcast after Sega discontinued the console', 'SonicAdventure_2.jpg', 'Wed Jul 18 2001', 3, 1);
        INSERT INTO games(id, title, content, gameArt, releaseDate, developersid, publishersid) 
            VALUES(4, 'Marvel vs Capcom 2: New Age of Heroes', 'Marvel vs. Capcom 2: New Age of Heroes is a crossover fighting game developed and published by Capcom. It is the fourth installment in the Marvel vs. Capcom series, which features characters from both Capcoms video game franchises and comic book series published by Marvel Comics', 'MarvelvsCapcom2.jpg', 'Sat Mar 04 2000', 4, 3);    
        INSERT INTO games(id, title, content, gameArt, releaseDate, developersid, publishersid) 
            VALUES(5, 'Power Stone 2', 'Power Stone 2 is a multiplayer fighting game that built on the innovative gameplay introduced by its predecessor, Power Stone. Power Stone 2 allows up to four players to choose from multiple characters and utilize items such as tables, chairs, and rocks in battle.', 'PowerStone2.jpg', '4/1/2000', 4, 3);
        INSERT INTO games(id, title, content, gameArt, releaseDate, developersid, publishersid) 
            VALUES(6, 'Crazy Taxi 2', 'Crazy Taxi 2 is a 2001 racing video game and the second installment of the Crazy Taxi series. It was released for the Dreamcast and was later ported to the PSP as part of Crazy Taxi: Fare Wars in 2007. It is the last Crazy Taxi game to be released for the Dreamcast after it was discontinued on March 31, 2001.', 'CrazyTaxi2.jpg', '5/28/2001', 3, 1);
        INSERT INTO games(id, title, content, gameArt, releaseDate, developersid, publishersid) 
            VALUES(7, 'Sonic Adventure', 'Sonic Adventure is a 1998 platform game for Segas Dreamcast and the first main Sonic the Hedgehog game to feature 3D gameplay.', 'SonicAdventure.jpg', '12/23/1998', 3, 1);
        INSERT INTO games(id, title, content, gameArt, releaseDate, developersid, publishersid) 
            VALUES(8, 'San Fransico Rush 2049', 'San Francisco Rush 2049 is a racing video game developed and published by Atari Games for arcades. It was ported to the Nintendo 64, Game Boy Color, and Dreamcast by Midway Games. It was released on September 7, 2000 in North America and November 17, 2000 in Europe.', 'Rush2049.jpg', '10/1/1999', 6, 4);
        INSERT INTO games(id, title, content, gameArt, releaseDate, developersid, publishersid) 
            VALUES(9, 'Ready 2 Rumble', 'Ready 2 Rumble Boxing is a boxing video game developed by Midway Studios San Diego, published by Midway Games in 1999 for the Dreamcast, PlayStation, Game Boy Color, and Nintendo 64. The success of the Dreamcast version led to it becoming one of the few Sega All Stars titles.', 'Ready2Rumble.jpg', '9/8/1999', 7, 4);
        INSERT INTO games(id, title, content, gameArt, releaseDate, developersid, publishersid) 
            VALUES(10, 'Tony Hawk Pro Skater 2', 'Tony Hawks Pro Skater 2 is a skateboarding video game developed by Neversoft and published by Activision. It is the second installment in the Tony Hawks series of sports games and was released for the PlayStation in 2000, with subsequent ports to Microsoft Windows, Game Boy Color, and Dreamcast the same year.', 'TonyHawk.jpg', '11/19/2000', 8, 5);
        `;

    await client.query(SQL);
}

const findAllGames = async()=>{
    var allgames;
    const SQL = `
        SELECT * FROM games
        INNER JOIN developers ON games.developersid = developers.devid
        INNER JOIN publishers ON games.publishersid = publishers.pubid
    `;
    allgames = await client.query(SQL);
    return allgames;
}

const findGame = async(id)=>{
    var result;
    var game;
    //console.log(id);
    const SQL = `SELECT * FROM games 
        INNER JOIN developers
        ON games.developersid = developers.devid
        INNER JOIN publishers
        on games.publishersid = publishers.pubid
        WHERE games.id = ${id}
        `;
    result = await client.query(SQL).then(res => {
        game = res.rows[0];
    });
    return game;
}

const init = async()=>{
    try{
        await client.connect();
        await syncAndSeed();
        console.log('Connected to db');
    }
    catch(ex)
    {
        console.log(ex);
    }
}
init();

module.exports = {
    client,
    init,
    findAllGames,
    findGame
};
