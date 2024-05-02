const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    
    Email :{
        type :String,
        require:true,
    } ,
    Password :{
        type: String,
        require:true,
    } 
},
{
    timestamps:true
});

const admin =mongoose.model('admin',adminSchema);
module.exports =admin;