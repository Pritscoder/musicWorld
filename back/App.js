const express =require('express');
const app=express();
const mongoose=require('mongoose');
const cors =require('cors');
require('./component/connection.js');
const Users=require('./component/models/users.js');
const songs=require('./component/models/song.js');
const Artist = require('./component/models/artist.js');
const Playlist=require('./component/models/playlist.js')
const bodyparser=require('body-parser');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const gridfs=require('gridfs-stream')
const storage = new GridFsStorage({ 
    url:"mongodb://localhost:27017/musicWorld",
    options:{useNewUrlParser:true,useUnifiedTopology:true},
    file:(req,file)=>{
       return{
        bucketName:"musicWorld",
        filename:`${Date.now()}-musicWorld-${file.originalname}`
       }
    }


 });


const upload =multer({storage});
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.post("/newuser",upload.single("Pic"),(req,res)=>{
   const Name=req.body.Name;
   const Email=req.body.Email;
   const UserName=req.body.UserName;
   const Password=req.body.Password;
   const Pic = req.file.filename;
   const user=new Users({Name,Email,UserName,Password,Pic});
   user.save();
res.send("successful");
})

const con=mongoose.connection;
let fs;
con.once("open",()=>{
fs=gridfs(con.db,mongoose.mongo); //mongoose driver
fs.collection("musicWorld");
})
app.get("/users/:pic",async(req,res)=>{
   const file=await fs.files.findOne({filename:req.params.pic});
   const read=fs.createReadStream(file.filename);
   read.pipe(res);
})

app.post("/login",(req,res)=>{
    const {uname,pass}=req.body;
 Users.findOne({UserName:uname,Password:pass},(err,data)=>{
if(err){   res.send(err)}
else{   res.send(data);}
 })
})

app.post("/addsong",upload.fields([{name:'SongImg'},{name:'Song'}]),(req,res)=>{

const {Category,Name,Artist}=req.body;
const SongImg=req.files.SongImg[0].filename;
const Song=req.files.Song[0].filename;
const song=new songs({Category,Name,Artist,SongImg,Song});
song.save();
res.send("successfully");
})

app.get("/getSong",(req,res)=>{
songs.find({},(err,data)=>{
if(err){
   res.send(err);
}
else{
   res.send(data);
}
})
})

app.get("/getSong/:song",async (req,res)=>{
    const file=await fs.files.findOne({filename:req.params.song});
    const read=fs.createReadStream(file.filename);
    read.pipe(res);
   })

   app.post('/addartist',upload.single('ArtistImg'),(req,res)=>{
      const {Name,Bio}=req.body;
      const ArtistImg=req.file.filename;
      const artist=new Artist({Name,Bio,ArtistImg});
      artist.save();
      res.send('added');
   })

   app.get("/getartist",(req,res)=>{
      Artist.find({},(err,data)=>{
      if(err){
         res.send(err);
      }
      else{
         res.send(data);
      }
      })
      })

      app.post("/playlist",upload.single('picture'),(req,res)=>{
         const name=req.body.name;
         const uname=req.body.uname;
         const picture=req.file.filename;
         const play=new Playlist({name,uname,picture});
         play.save();
      })
      app.post('/getplay',(req,res)=>{
         const uname=req.body.uname;
         
         Playlist.find({uname:uname},(err,data)=>{
            if(err){
               res.send(err);
            }
            else{
               res.send(data);               
            }
         })
      })  
      app.post("/getsearch",(req,res)=>{
         let srch=req.body.s;
         songs.find({Name:{$regex:srch}},(err,data)=>{
         if(err){
            res.send(err);
         }
         else{
            res.send(data);
         }
         })
         })    
app.listen('8000',()=>{
console.log('running');
});