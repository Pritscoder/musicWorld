import React from 'react'
import { useEffect,useState } from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import $ from 'jquery';

const Index = () => {  
  const [isvisible,setisvisible]=useState(false);  
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
        <RightSide></RightSide>
      </div>
    </div>
    </>
  )
}

export default Index