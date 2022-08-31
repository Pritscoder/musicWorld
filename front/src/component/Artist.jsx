import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
const Artist = () => {
    const [artist,setartist]=useState([]);

    useEffect(()=>{ 
        axios.get("http://localhost:8000/getartist").then((res)=>{
          setartist(res.data);
        }).catch((err)=>{
          console.log(err);
        })   
        document.body.className=sessionStorage.getItem("theme"); 
      },[]);
  return (
    <>
    <div className='container-fluid'>
    <div className='row row-cols-1 row-cols-md-5 g-4 mt-2 my-3'>
      {
       artist.map((data)=>{
        const artimg=`http://localhost:8000/getSong/${data.ArtistImg}`;
        const sendArtist=`artistpanel/${data.ArtistImg}/${data.Name}/${data.Bio}`
        return(
         <div className='col' key={data._id}>
              <div className='card text-center aimg'>
                    <div className='artimg'>
                    <a href={sendArtist}><img src={artimg} className="artimage"></img></a>
                    <p>{data.Name}</p>
                    </div>
                </div>
              
         </div>
        )
       })
      }
    </div>
    </div>
    </>
  )
}

export default Artist