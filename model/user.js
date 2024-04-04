const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    Firstname :{
        type :String,
        require:true,
    },
    Lastname:{
        type :String,
        require: true,
    },
    Email :{
        type :String,
        require:true,
        unique : true
    } ,
    Hrname:{
        type :String,
        require:true,
    } ,
    Phonenumber:{
        type: Number,
        require:true,
        unique : true
    } ,
    Password :{
        type: String,
        require:true,
    } 
},
{
    timestamps:true
});
const USER =mongoose.model('user',userSchema);
module.exports =USER;

