import { useState,useEffect } from "react"
import React from 'react'
import axios from 'axios';
import $ from 'jquery'
import Navbar from "./Navbar";
import Artist from "./Artist";

const RightSide = () => {
    const [songs,setsongs]=useState([]);
    const [isplay,setisplay]=useState(false);
    const [name,setname]=useState("");

    useEffect(()=>{ 
      if(sessionStorage.getItem("users")!=null){
        const user=sessionStorage.getItem("users");
        const users=JSON.parse(user);             
        setname(users.UserName);
             
     } 

        axios.get("http://localhost:8000/getSong").then((res)=>{
          setsongs(res.data);
        }).catch((err)=>{
          console.log(err);
        })   
        document.body.className=sessionStorage.getItem("theme"); 
      },[songs]);
  return (
   <>
   <div className='col-md-10 rightnav'>
            <Navbar></Navbar>
            <div className='rightimg'>
              <img src='rightimg1.jpg'></img>
            </div>
            <Artist></Artist>
            <div className='container-fluid'>             
             <div className='mt-5 my-3 row row-cols-1 row-cols-md-5 g-4'>
               {
                songs.map((data)=>{
                  const url=`http://localhost:8000/getSong/${data.SongImg}`
                  const song=`http://localhost:8000/getSong/${data.Song}`
                  const send=`playPanel/${data.SongImg}/${data.Name}/${data.Artist}/${data.Song}`
                          return(
                            <div className='col' key={data._id}>
                             <div className='card text-center xyz'> 
                             <div>                             
                                <a href={send}><img src={url} className="sogImg"></img></a>
                                </div>
                                <div className='playicon'>
                                <i className="fa fa-play-circle" onClick={(ev)=>{
                                  const sog=document.getElementById('sog');
                                  $('.playicon i').removeClass("fa fa-pause");
                                  $('.playicon i').addClass("fa fa-play-circle");
                                  sog.src=song;
                                  const form={                                    
                                    Name:data.Name,
                                    Artist:data.Artist,
                                    SongImg:data.SongImg,
                                    Song:data.Song
                                  }
                                  if(isplay){
                                    sog.pause();
                                    setisplay(false);
                                    ev.target.className="fa fa-play-circle"
                                  }
                                  
                                  else{                                    
                                    sog.play();
                                    let recent=localStorage.getItem(name);
                                    if(recent===null){
                                      let dat=[];
                                      dat.push(form);
                                      localStorage.setItem(name,JSON.stringify(dat));
                                    }
                                    else{                                                                      
                                      let dats=JSON.parse(recent);                                  
                                      let recentdata=dats.find((datas)=>datas.Song===data.Song);
                                      if(recentdata){}
                                      else{
                                      dats.push(form);
                                      localStorage.setItem(name,JSON.stringify(dats));
                                    }
                                   
                                    }
                                    setisplay(true);
                                    ev.target.className="fa fa-pause";
                                  }
                                }}></i>
                                </div>
                                <h6>{data.Name}</h6>                  
                             </div>
                            </div>
                          )
                })
               }
               <audio id="sog" onEnded={()=>{
                $('.playicon i').removeClass("fa fa-pause");
                $('.playicon i').addClass("fa fa-play-circle");
               }}></audio>
             </div>
            </div>
            </div>
   </>
  )
}

export default RightSide