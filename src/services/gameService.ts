import {IGame, GameModel} from '../models/game.js';
import {IUser, UserModel} from '../models/user.js';
import {findUsers,addGameToUser} from './userService.js'
import {Types} from 'mongoose';

//Crear un joc (Crud)
export async function createGame(game:Partial<IGame>): Promise<IGame|null>{
    
    //no cal comprobar si el joc que es vol afegir està o no a la base de dades ja que ja s'ha definit com a únic en la declaració de la classe

    let game1 = new GameModel(game);
    let created = await game1.save(); //probem a guardar el joc

    if(!created){return null}; //si no s'ha pogut guardar parem la funció

    return created;
};

//Trobar tots els jocs (cRud)
export async function findGames(): Promise<IGame[]>{
    return await GameModel.find();
};

//Trobar un joc per la seva ID (cRud)
export async function findGameById(id1:String): Promise<IGame|null>{
    return await GameModel.findById(id1);
};

//Trobar un joc pel seu nom (cRud)
export async function findGameByName(name1:String): Promise<IGame|null>{
    return await GameModel.findOne({name:name1});
};

//Trobar tots els jugadors d'un joc (cRud)
export async function findGameUsers(name1:String): Promise<Types.ObjectId[]|null>{

    let game = await findGameByName(name1);
    if(!game || !game.players){return null;}
    return game.players;

};

//Afegir un jugador a un joc (crUd)
export async function updateGameByName(name1:string, player1:string): Promise<IGame|null>{
    let game1 = await GameModel.findOne({title:name1});
    let user1 = await UserModel.findOne({name:player1});
    if(!game1 || !user1){return null;}

    await addGameToUser(user1._id,game1._id);

    return await GameModel.findOneAndUpdate(game1._id,{$addToSet:{players:user1}});
};

export async function addGameUsers(game1:Partial<IGame>, player:Partial<IUser>): Promise<IGame|null>{
    let player1 = await UserModel.findOne({email:player.email});
    if(!player1){return null;}

    game1.players?.push(player1._id);
    let game12 = await GameModel.findOne({title:game1.title});

    if(!game12){return null;}
    await addGameToUser(player1._id,game12._id);

    return game12;
};

//Descartar un joc de la llista (cruD)
export async function deleteGameByName(name1:string): Promise<IGame|null>{
    return await GameModel.findOneAndDelete({title:name1});
};

export async function populateGameUsers(name1:String): Promise<IGame|null>{
    return await GameModel.findOne({title:name1}).populate('players');
};
