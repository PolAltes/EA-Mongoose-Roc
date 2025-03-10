import mongoose from 'mongoose';

const mongoURI = 'mongodb://localhost:27017/exercici'

export async function startDBConnection(){
    mongoose.set('strictQuery',true);

    await mongoose.connect(mongoURI)
      .then(() => console.log('Conectado a MongoDB'))
      .catch(err => console.error('Error al conectar:', err));

    await mongoose.connection.dropCollection('users')
    .then(()=>console.log("Col·lecció users el·liminada"))
    .catch(err=> console.log("Error al connectar: ",err));

    await mongoose.connection.dropCollection('games')
    .then(()=>console.log("Col·lecció games el·liminada"))
    .catch(err=> console.log("Error al connectar: ",err));
};