require('../connection.js');
const mongoose= require('mongoose');

const users= new mongoose.Schema({
    Name:{type:String},
    Email:{type:String},
    UserName:{type:String},
    Password:{type:String},
    Pic:{type:String}
});

const Users= new mongoose.model("users",users);
module.exports=Users;
