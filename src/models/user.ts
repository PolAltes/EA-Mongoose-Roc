import { ObjectId, Schema, model } from 'mongoose';
import {IGame} from './game.js';
import {Types} from 'mongoose';

// 1. Create an interface representing a TS object.
export interface IUser {
  name: string;
  email: string;
  phone?: number;
  avatar?: string;
  games?: Types.ObjectId[];
}

// 2. Create a Schema corresponding to the document in MongoDB.
const userSchema = new Schema<IUser>({
  name: { 
    type: String, 
    required: true,
    unique: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: Number,
  avatar: String,
  games: [{type: Schema.Types.ObjectId, ref: 'Game'}]
});

// 3. Create a Model.
export const UserModel = model('User', userSchema);