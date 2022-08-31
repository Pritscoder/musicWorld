require('../connection.js');
const mongoose =require('mongoose');

const song=new mongoose.Schema({
    Category:String,
    Name:String,
    Artist:String,
    SongImg:String,
    Song:String
})

const songs=new mongoose.model('song',song);
module.exports=songs;