const mongoose = require("mongoose")
const { Schema , model } = mongoose;


const chatSchema = new Schema({
    message:{
        type:String,
        required: true,
    },
    role:{
        type:String,
        enums:['bot','user'],
        default:'user'
    }

});


const Chat = model("Chat",chatSchema);
module.exports = Chat;