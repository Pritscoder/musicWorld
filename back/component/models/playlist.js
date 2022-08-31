const mongoose=require('mongoose');


const playlist=new mongoose.Schema({
     name:String,
     uname:String,
     picture:String
});

Playlist= new mongoose.model('playlist',playlist);
module.exports=Playlist;
 

