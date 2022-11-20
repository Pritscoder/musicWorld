const mongoose=require('mongoose');

const con =mongoose.connect("mongodb://mongodb:27017/musicWorld",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connect");
}).catch((err)=>{
console.log(err)
}) 