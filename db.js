// db.js
const mongoose =require('mongoose');
const dotenv=require('dotenv');
dotenv.config();


const db = handler => async (req,res)=>{
    if(mongoose.connections[0].readyState){
      console.Console.log("connected to db")
        return handler(req,res)
    }
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,         // Use the new URL parser
       useUnifiedTopology: true, 
    })
    return handler(req,res) ;
}

module.exports = db;

