import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Addsong = () => {
    const [song,setsong]=useState({
        Category:"",Name:"",Artist:""
    })

    const [Img,setImg]=useState();
    const [Songs,setSongs]=useState();
    useEffect(()=>{
        const theme=sessionStorage.getItem("theme");
        document.body.className=theme;
    })

    const getData=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        setsong({...song,[name]:value});
    }

    const submit=(event)=>{
        event.preventDefault();
    const form=new FormData();
    form.append("Category",song.Category);
    form.append("Name",song.Name);
    form.append("Artist",song.Artist);
    form.append("SongImg",Img);
    form.append("Song",Songs);

    axios.post("http://localhost:8000/addsong",form).then((res)=>{
    console.log(res);
    }).catch((err)=>{
    console.log(err);
    })
    }
  return (
    <>               
        <div className='card mt-5'>
            <div className='text-center'>
                <h2>Add Song</h2>
            </div>
            <div className='card-body'>
            <form>                   
        <label>Category</label>
        <input className='form-control' onChange={getData} value={song.Category} type="text" name='Category'></input>
        <label className='mt-3'>Name</label>
        <input className='form-control' onChange={getData} value={song.Name} type="email" name='Name'></input>
        <label>Artist</label>
        <input className='form-control' onChange={getData} value={song.Artist} type="text" name='Artist'></input>
        <label className='mt-3'>Song Image</label>
        <input className='form-control' onChange={(event)=>{setImg(event.target.files[0])}}  type="file" name='SongImg'></input>
        <label className='mt-3'>Song</label>
        <input className='form-control' onChange={(event)=>{setSongs(event.target.files[0])}}  type="file" name='Song'></input>
        
        <button onClick={submit} className='btn btn-success form-control mt-4'>ADD</button>
        
            </form>
            
            </div>
        </div>
            
    </>
  )
}

export default Addsong