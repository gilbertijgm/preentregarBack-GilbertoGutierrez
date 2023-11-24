import mongoose from "mongoose";

const connectionString = 'mongodb://127.0.0.1:27017/coderhouse';
const connectionStringATLAS = 
        'mongodb+srv://gilbertojgm:gilberto@cluster0.u7kmwds.mongodb.net/coderhouse?retryWrites=true&w=majority';


//export const initMongoDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log('Conectado a la base de datos de mongoDB');
    } catch (error) {
        console.log(`error => ${error}`);
    }

    
    // try { //conexion mongo atlas
    //     await mongoose.connect(connectionStringATLAS);
    //     console.log('Conectado a la base de datos de mongoDB');
    // } catch (error) {
    //     console.log(`error => ${error}`);
    // }
//}