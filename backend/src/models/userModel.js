import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["Owner","Manager","User"]
    },
},{timestamps:true});

export default mongoose.model('User', userModel);