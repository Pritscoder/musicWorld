import { useState,useEffect } from "react"
import React from 'react'
import axios from 'axios';
import $ from 'jquery'
import Navbar from "./Navbar";
import LeftSide from "./LeftSide";

const Playlist = () => {
    
    const [isvisible,setisvisible]=useState(false);  
    const [picture,setpicture]=useState();
    const [uname,setuname]=useState("");
    const [playlist,setplaylist]=useState([]);
    const submit=()=>{
      const plname=$('#plname').val();
      const form=new FormData();
      form.append("name",plname);
      form.append("uname",uname);
      form.append("picture",picture);
      axios.post("http://localhost:8000/playlist",form).then((res)=>{
        console.log(res);
      }).catch((err)=>{
      console.log(err);
      })
    }

    useEffect(()=>{ 
      const user=sessionStorage.getItem("users");
      const users=JSON.parse(user);     
      setuname(users.UserName);

      axios.post('http://localhost:8000/getplay',{uname}).then((res)=>{
            setplaylist(res.data);
      }).catch((err)=>{
        console.log(err);
      })
        document.body.className=sessionStorage.getItem("theme"); 
      },[playlist]);
  return (
    <>
     <div className='container-fluid'>
      <div className='row'>
        <div className='bar'>
          <i className='fa fa-bars' onClick={()=>{
            if(isvisible){
              $('.leftnav').css('display',"none");
              setisvisible(false);
            }
            else{
              $('.leftnav').css('display',"block");
              setisvisible(true);

            }
          }}></i>
        </div>
        <LeftSide></LeftSide>
        <div className='col-md-10 container rightnav'>
            <Navbar></Navbar> 
            <div className='container play mt-5 shadow-lg p-3 mb-3 rounded'>
     <div className='row'>
      <div className='col-md-4 playlistPic mt-3'>
        <i className="fa fa-picture-o" onClick={()=>{
        $('#upload').click();
        }}></i>
        <input type='file' id='upload' hidden onChange={(event)=>{
         setpicture(event.target.files[0]);
        }}></input>
      </div>
      <div className='col-md-8 playlistDetail mt-3' id='artistdetail'>
       
       <div className='playls'>
       <h5>Playlist Name</h5>
        <h3 onClick={()=>{
          $('#pls').replaceWith("<input type='text' id='plname' autofocus/>")
        }} id='pls'>New Playlist</h3>
       <button className='ADD btn btn-primary mt-3'  onClick={submit}>Create</button>
       </div>
       
      </div>
     </div>

     </div>      
            
     <div className='mt-3 my-3 row row-cols-1 row-cols-md-5 g-4'>
          
          {
            playlist.map((data)=>{
              let url = `http://localhost:8000/getSong/${data.picture}`
                  return(
                    <div className='col' key={data._id}>
                      <img src={url} className="playimg"></img>
                      <h5>{data.name}</h5>
                    </div>
                  )
            })
          }        
          </div>


        </div>
      </div>
    </div>
    
    
   
    </>
  )
}

export default Playlist