import React from 'react'
import { useParams } from 'react-router-dom'
import $ from 'jquery'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Artistpanel = () => {
    const [isplay,setisplay]=useState(false);
  const [songs,setsongs]=useState([]);
    const artist=useParams();

    useEffect(()=>{  
        axios.get("http://localhost:8000/getSong").then((res)=>{
          setsongs(res.data);
        }).catch((err)=>{
          console.log(err);
        }) 
        document.body.className=sessionStorage.getItem("theme"); 
      },[]);
  return (
    <>
    
     <div className='container play mt-5 shadow-lg p-3 mb-3 rounded'>
     <div className='row'>
      <div className='col-md-4 playleft1 mt-5'>
        <img src={'http://localhost:8000/getSong/'+artist.artistimg}></img>
      </div>
      <div className='col-md-8 playleft2 mt-5' id='artistdetail'>
       <div><h4>{artist.name}</h4></div>
       <div className='bio'><p>{artist.bio}</p></div>
       <div className='mt-2'><button className='btn btn-danger'>Play All</button></div>
      </div>
     </div>
     </div>
     <div className='songSuggestion'>
      {
      songs.map((data)=>{
        if(data.Artist===artist.name){
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
                
                 sog.play()
                 setisplay(true);
                 ev.target.className="fa fa-pause";
                 $('#playcircle').removeClass('fa fa-play-circle');
                 $('#playcircle').addClass('fa fa-pause');
                
               }
              }}></i></div></div>
             </div>
            </div>
        </div>
       </div>
      </div>
        )}
      })
    }
    </div>
    <audio id="sog" onEnded={()=>{
                $('.pla i').removeClass("fa fa-pause");
                $('.pla i').addClass("fa fa-play-circle");
               }}></audio>
    </>
  )
}

export default Artistpanel