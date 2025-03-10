import {ObjectId, Schema, TypeExpressionOperatorReturningObjectId, model } from 'mongoose';
import {IUser} from './user.js';
import {Types} from 'mongoose';

export interface IGame {
    title: string;
    release: string;
    played?: boolean;
    players?: Types.ObjectId[];
    picture?: string;
}

const gameSchema = new Schema<IGame>({
    title:{
        type: String,
        required: true,
        unique: true
    },
    release:{
        type: String,
        required: true
    },
    played:{
        type: Boolean,
        default: false
    },
    players: [{type: Schema.Types.ObjectId, ref:'User'}],
    picture:{
        type: String
    },
});

export const GameModel = model('Game',gameSchema);