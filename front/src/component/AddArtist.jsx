import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const AddArtist = () => {
    const [artist,setartist]=useState({
        Name:"",Bio:""
    })

    const [Img,setImg]=useState();
    
    useEffect(()=>{
        const theme=sessionStorage.getItem("theme");
        document.body.className=theme;
    })

    const getData=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        setartist({...artist,[name]:value});
    }

    const submit=(event)=>{
        event.preventDefault();
    const form=new FormData();
    form.append("Name",artist.Name);
    form.append("Bio",artist.Bio);
    form.append("ArtistImg",Img);
    

    axios.post("http://localhost:8000/addartist",form).then((res)=>{
    console.log(res);
    }).catch((err)=>{
    console.log(err);
    })
    }
  return (
    <>               
                <div className='card mt-5'>
                    <div className='text-center'>
                        <h2>Add Artist</h2>
                    </div>
                    <div className='card-body'>
                   <form>        
                <label className='mt-3'>Name</label>
                <input className='form-control' onChange={getData} value={artist.Name} type="email" name='Name'></input>
                <label>Bio</label>
                <textarea className='form-control' onChange={getData} value={artist.Bio} rows={5} name='Bio'></textarea>
                <label className='mt-3'>Artist Image</label>
                <input className='form-control' onChange={(event)=>{setImg(event.target.files[0])}}  type="file" name='ArtistImg'></input>
                
                <button onClick={submit} className='btn btn-success form-control mt-4'>ADD</button>
                
                   </form>
                   
                    </div>
                </div>
            
    </>
  )
}

export default AddArtist