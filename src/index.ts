import {createGame,findGames,findGameByName,updateGameByName,deleteGameByName,addGameUsers, populateGameUsers,findGameUsers}from './services/gameService.js';

import {createUser, findUsers, findUserByMail, findUserByID} from './services/userService.js';

import {IGame} from './models/game.js';
import {IUser} from './models/user.js';
import mongoose, { Types } from 'mongoose';
import { startDBConnection } from './connection.js';

async function main(){
    await startDBConnection();

    //Creació d'usuaris
    let user1: IUser = {
        "name": "Miquel",
        "email": "miquel@hot.mail",
        "phone": 123456789
    };
    let newUser1 = await createUser(user1);
    console.log("User inserted: ", newUser1);

    let user2: IUser = {
        "name": "Marta",
        "email": "marta@hot.mail",
        "phone": 987654321
    };
    let newUser2 = await createUser(user2);
    console.log("User inserted: ", newUser2);

    let user3: IUser = {
        "name": "Carla",
        "email": "carla@hot.mail",
        "phone": 681902579
    };
    let newUser3 = await createUser(user3);
    console.log("User inserted: ", newUser3);

    //Creació de jocs
    let game1: IGame = {
        "title": "Hollow Knight",
        "release": "24/02/2017",
        "picture":"https://imgur.com/a/uHblFZ4"
    };
    let newGame1 = await createGame(game1);
    console.log("Game inserted: ", newGame1);

    let game2: IGame = {
        "title": "Minecraft",
        "release": "18/11/2011",
        "picture": "https://imgur.com/a/6UYZh2T"
    };
    let newGame2 = await createGame(game2);
    console.log("Game inserted: ", newGame2);

    let game3: IGame = {
        "title": "Euro Truck Simulator 2",
        "release": "19/10/2012",
        "picture": "https://imgur.com/a/BVSaMH8"
    };
    let newGame3 = await createGame(game3);
    console.log("Game inserted: ", newGame3);

    //Afegim un jugador a un joc
    if(newGame1 && newUser3 && newUser2){
        await updateGameByName(newGame1.title,newUser3.name);
        await updateGameByName(newGame1.title,newUser2.name);
        let players = await findGameUsers(newGame1.title);
        if(!players){return null;}
        for(let i=0; i<players.length;i++){
            console.log("User that plays ", newGame1.title,": ", await findUserByID(players[i]));
        };
        let populatedGame1 = await populateGameUsers(newGame1.title);
        console.log("populated game: ", populatedGame1)
    }

    let games = await findGames();
    console.log("All games: ", games);

    let deletedGame;

    if(newGame2){
        deletedGame = await deleteGameByName(newGame2.title);
    }
    games = await findGames();
    console.log("Deleted game: ",deletedGame);
    console.log("All games after deleting one: " ,games)
    
};

main();