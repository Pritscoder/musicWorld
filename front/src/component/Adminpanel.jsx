import React from 'react'
import { useEffect,useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import $ from 'jquery'
import AdminLeft from './AdminLeft';
import Addsong from './Addsong';
import AddArtist from './AddArtist';

const Adminpanel = () => { 
    const [isvisible,setisvisible]=useState(false);
    const [Comp,setComp]=useState('addsong');  
  
    useEffect(()=>{         
      document.body.className=sessionStorage.getItem("theme"); 
    },[]);
    if(Comp==='addsong'){  
    
    return (
      <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='bar'>
            <i className='fa fa-bars' onClick={()=>{
              if(isvisible){$('.leftnav').css('display',"none"); setisvisible(false);}
              else{$('.leftnav').css('display',"block");setisvisible(true);}
            }}></i>
          </div>
          <AdminLeft></AdminLeft>
          <div className='col-md-10 rightnav'>
              <Navbar></Navbar>              
              <div className='container-fluid'>
              <Addsong></Addsong>
              </div> 
        </div></div></div>
      </>
    )
    }

    if(Comp==='addartist'){  
    
        return (
          <>
          <div className='container-fluid'>
            <div className='row'>
              <div className='bar'>
                <i className='fa fa-bars' onClick={()=>{
                  if(isvisible){$('.leftnav').css('display',"none"); setisvisible(false);}
                  else{$('.leftnav').css('display',"block");setisvisible(true);}
                }}></i>
              </div>
              <AdminLeft></AdminLeft>
              <div className='col-md-10 rightnav'>
                  <Navbar></Navbar>              
                  <div className='container-fluid'>
                  <AddArtist></AddArtist>
                  </div> 
            </div></div></div>
          </>
        )
        }
}

export default Adminpanel