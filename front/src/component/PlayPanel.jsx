import React ,{useEffect} from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery';
import {WhatsappShareButton,WhatsappIcon} from 'react-share'

const PlayPanel = () => {
  let index=0;
  const [Play,setPlay]=useState([]);
  const [isplay,setisplay]=useState(false);
  const [songs,setsongs]=useState([]);
  const [isuse,setisuse]=useState(false);
  const [Range,setRange]=useState(0);
  const [Duration,setDuration]=useState('0:00');
  const [CurrentTime,setCurrentTime]=useState('0:00');
  const [uname,setuname]=useState();
const rg=(ev)=>{

}

const song=useParams();
const loadSong=(music)=>{
  const simg=document.getElementById('sogimg');
  const song=document.getElementById('sog');
  simg.src='http://localhost:8000/getSong/'+music.SongImg;
  song.src='http://localhost:8000/getSong/'+music.Song;
  $('.sname').text(music.Name);
  $('.aname').text(music.Artist);
  song.play()
  setisplay(true);
  $('#playcircle').removeClass('fa fa-play-circle');
  $('#playcircle').addClass('fa fa-pause');
  setisuse(true);
}

useEffect(()=>{  

  const user=sessionStorage.getItem("users");
      const users=JSON.parse(user);     
      setuname(users.UserName);

  axios.get("http://localhost:8000/getSong").then((res)=>{
    setsongs(res.data);
  }).catch((err)=>{
    console.log(err);
  }) 

  axios.post("http://localhost:8000/getplay",{uname}).then((res)=>{    
    setPlay(res.data);      
  }).catch((err)=>{
    console.log(err);
  }) 
  document.body.className=sessionStorage.getItem("theme"); 
},[Play,uname]);
  return (
    <>
    <div className='container mt-5 play shadow-lg p-3 mb-5 rounded'>
       <div className='row'>
        <div className='col-md-4 playleft1 mt-5'>
        <div className='playImg text-center'>    
        <img src={"http://localhost:8000/getSong/"+song.simg} id='sogimg'></img>
        </div> 
        </div>
        <div className='col-md-8 playleft2 mt-5'>
          <div className='row'>           
            <div className=' playdetail'>
              <h4 className='sname'>{song.sname}</h4>
              <p className='aname'>{song.artist}</p>
              </div>
          </div>
          <div className='row'>
            <div className=' playbox mt-5'>
              <div className='time me-2'>
                <div><h5>{CurrentTime}</h5></div>
                <div><h5>{Duration}</h5></div>
              </div>
              <div><input type='range' id='rg' value={Range} onChange={()=>{ 
                 let rg=document.getElementById('rg'); 
                 let sog=document.getElementById('sog'); 
                sog.currentTime = rg.value * (sog.duration / 100);}} className='range text-float'></input></div>
              <div className='icons'>
              <div className='playicons'>
                <div className='icon'><i className='fa fa-backward' onClick={()=>{
                  index=(index-1+songs.length)%songs.length;
                  loadSong(songs[index]);
                  $('.pla i').removeClass("fa fa-pause");
                 $('.pla i').addClass("fa fa-play-circle");     
                 let d=document.querySelectorAll('.crd')[index];
                 $('.crd').removeClass('bor');
                 $(d).addClass('bor');
                 let p=document.querySelectorAll('.crd i')[index];
                 $(p).removeClass('fa fa-play-circle');
                 $(p).addClass('fa fa-pause');
                 $('#playcircle').removeClass("fa fa-play-circle");
                 $('#playcircle').addClass("fa fa-pause"); 
                }}></i></div>
                <div className='icon pla'><i className='fa fa-play-circle' id='playcircle' onClick={(ev)=>{
                  let sog=document.getElementById('sog');
                  if(!isuse){
                  sog.src='http://localhost:8000/getSong/'+song.song;}
                  if(isplay){
                    sog.pause();
                    setisplay(false);
                    ev.target.className="fa fa-play-circle"
                    $('.pla i').removeClass('fa fa-pause');
                    $('.pla i').addClass('fa fa-play-circle');
                  }
                  else{
                    sog.play()
                    setisplay(true);
                    ev.target.className="fa fa-pause";
                  }
                }}></i></div>
                
                <div className='icon'><i className='fa fa-forward' onClick={()=>{
                 index=(index+1)%songs.length;
                 loadSong(songs[index]);
                 $('.pla i').removeClass("fa fa-pause");
                 $('.pla i').addClass("fa fa-play-circle");     
                 let d=document.querySelectorAll('.crd')[index];
                 $('.crd').removeClass('bor');
                 $(d).addClass('bor');
                 let p=document.querySelectorAll('.crd i')[index];
                 $(p).removeClass('fa fa-play-circle');
                 $(p).addClass('fa fa-pause');
                 $('#playcircle').removeClass("fa fa-play-circle");
                 $('#playcircle').addClass("fa fa-pause");     
                }}></i></div>
              </div>
              <div className='specialicon'>          
              <div className='volume'><i className='fa fa-volume-up' id='vol' onClick={()=>{
                let sog=document.getElementById('sog');
                if(sog.muted){
                 $('#vol').removeClass("fa fa-volume-off");
                 $('#vol').addClass("fa fa-volume-up"); 
                 sog.muted=false;
                }
                else{
                  $('#vol').removeClass("fa fa-volume-up");
                  $('#vol').addClass("fa fa-volume-off"); 
                  sog.muted=true;
                }
              }}></i></div>
              <div>
              <WhatsappShareButton url='http://localhost:3000/playPanel/1655913260427-musicWorld-saami.jfif/Saami%20Sammi/Sunidhi%20Chauhan/1655913260429-musicWorld-Saami%20Saami_64(PagalWorld.com.se).mp3'>                
                <WhatsappIcon size={28} round={true} />
              </WhatsappShareButton>  
              </div>
              <div className='download'>
                <a href={'http://localhost:8000/getSong/'+song.song} download><i className='fa fa-download'></i></a>                
                </div>
                <div className='playlist'>
               <select style={{"fontSize":"1.2rem"}} className="sel">
                <option>+Playlist</option>
                {
                Play.map((data)=>{                
                  return(
                    <option>{data.name}</option>
                  )
                })
                }</select>
                </div>
              </div>
              </div>
            </div>

          </div>
        </div>
       </div>
    </div>
    <div className='songSuggestion'>
      {
      songs.map((data)=>{
        const url=`http://localhost:8000/getSong/${data.SongImg}`
        const song=`http://localhost:8000/getSong/${data.Song}`
        return(
          <div className='container' key={data._id}>
       <div className='card mt-3 shadow-lg rounded crd'>
        <div className='card-body'>
            <div className='row'>              
             <div className='col-md-2'>
               <img src={url} className='sugimg'></img>
             </div>
             <div className='col-md-10 sugbox'>
              <div>
                <h5>{data.Name} ({data.Artist})</h5>              
              </div>
              <div className='pla'>
              <div className='sugicon'><i className='fa fa-play-circle' onClick={(ev)=>{
               const sog=document.getElementById('sog');
               const sogimg =document.getElementById('sogimg');
               let br=ev.target.offsetParent;
               $('.crd').removeClass('bor');
               $(br).addClass('bor');
               
               sog.src=song;
               $('.pla i').removeClass("fa fa-pause");
               $('.pla i').addClass("fa fa-play-circle");                              
               if(isplay){
                 sog.pause();
                 setisplay(false);
                 ev.target.className="fa fa-play-circle"
                 $('#playcircle').removeClass('fa fa-pause');
                 $('#playcircle').addClass('fa fa-play-circle');
               }
               else{
                sogimg.src=url;
                $('.sname').text(data.Name);
                $('.aname').text(data.Artist);
                 sog.play()
                 setisplay(true);
                 ev.target.className="fa fa-pause";
                 $('#playcircle').removeClass('fa fa-play-circle');
                 $('#playcircle').addClass('fa fa-pause');
                 setisuse(true);
               }
              }}></i></div></div>
             </div>
            </div>
        </div>
       </div>
      </div>
        )
      })
    }
    </div>
    <audio id="sog" onEnded={()=>{
                $('.pla i').removeClass("fa fa-pause");
                $('.pla i').addClass("fa fa-play-circle");
               }} onTimeUpdate={()=>{
                let sog=document.getElementById('sog'); 
                  let durM=Math.floor(sog.duration/60);
                  let durS=Math.floor(sog.duration%60);
                  let dur=`${durM}:${durS}`;
                  setDuration(dur);

                  let curM=Math.floor(sog.currentTime/60);
                  let curS=Math.floor(sog.currentTime%60);
                  let cur=`${curM}:${curS}`;
                  setCurrentTime(cur);

                  let rg=document.getElementById('rg'); 
                                  
                    rg = sog.currentTime * (100 / sog.duration);
                    // rg.value = rg;   
                    setRange(rg);    
               
               }}></audio>
    </>
  )
}

export default PlayPanel