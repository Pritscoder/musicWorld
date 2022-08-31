require('../connection.js');
const mongoose =require('mongoose');

const artist=new mongoose.Schema({
    Name:String,
    Bio:String,
    ArtistImg:String
});

const Artist= new mongoose.model('artist',artist);
module.exports=Artist;