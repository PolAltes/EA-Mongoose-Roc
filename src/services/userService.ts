import {IGame, GameModel} from '../models/game.js';
import {IUser, UserModel} from '../models/user.js';
import {Types} from 'mongoose';

//Crear un user (Crud)
export async function createUser(user:Partial<IUser>): Promise<IUser|null>{
    let user1 = new UserModel(user);
    let created = await user1.save();

    if(!created){return null;}

    return created;
};

//Trobar tots els users (cRud)
export async function findUsers(): Promise<IUser[]>{
    return await UserModel.find();
};

//Trobar user per mail (cRud)
export async function findUserByMail(mail:string): Promise<IUser|null>{
    return await UserModel.findOne({email:mail});
};

//Trobar user per id (cRud)
export async function findUserByID(id:Types.ObjectId): Promise<IUser|null>{
    return await UserModel.findById(id);
};

//Afegir un joc a la llista de l'usuari
export async function addGameToUser(user1:Types.ObjectId,game1:Types.ObjectId):Promise<void|null>{
    return await UserModel.findByIdAndUpdate(user1,{$addToSet:{games:game1}});
};
