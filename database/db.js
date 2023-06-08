import mongoose  from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connection = () => {
    const DB_URI= `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-85qpbof-shard-00-00.miasmqv.mongodb.net:27017,ac-85qpbof-shard-00-01.miasmqv.mongodb.net:27017,ac-85qpbof-shard-00-02.miasmqv.mongodb.net:27017/?ssl=true&replicaSet=atlas-32cfge-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
        mongoose.connect(DB_URI, { useNewUrlParser:true});
        console.log('Database connected succesfully');
    }catch(error){
        console.log('error while connecting with tha database', error.message);
    }
}

export default connection;