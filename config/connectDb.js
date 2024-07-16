const mongoose = require("mongoose");


const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.Mongo_Url);
        console.log("Database Connected");
    }
    catch(error){
        console.log(error);
    }
}

module.exports = connectDb