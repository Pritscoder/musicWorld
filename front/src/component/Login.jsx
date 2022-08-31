import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom' 

const Login = () => {
    useEffect(()=>{
        const theme=sessionStorage.getItem("theme");
        document.body.className=theme;
    })
    const navigate=useNavigate();
  const [User,setUser]=useState({
  UserName:"",Password:""
 })

 const getData=(event)=>{
    let name=event.target.name;
    let value=event.target.value;
    setUser({...User,[name]:value})
 }

 const submit=(event)=>{
event.preventDefault();   
 const form={uname:User.UserName,pass:User.Password}
    axios.post("http://localhost:8000/login",form).then((res)=>{
         if(res.data===""){alert("Please Enter Valid Data")}
         else{
            sessionStorage.setItem("users",JSON.stringify(res.data))
           navigate("/");
         }
    }).catch((err)=>{
        console.log(err);
    })
 }
  return (
    <>
    <div className='log'>
    <div className='container mt-5 login'>
         <div className='row'>
            <div className='col-md-8'>                
                <div className='card'>
                    <div className='text-center'>
                        <h2>Login</h2>
                    </div>
                    <div className='card-body'>
                   <form>                   
                <label>Username</label>
                <input className='form-control' type="text" name='UserName' onChange={getData} value={User.UserName} ></input>
                <label className='mt-3'>Password</label>
                <input className='form-control' type="password" name='Password' onChange={getData} value={User.Password} ></input>
                <div className=' cuser mt-4 text-center'>
                    <a href='/newuser'>Create User</a>
                </div>
                <button onClick={submit} className='btn btn-success form-control mt-4'>LOGIN</button>
                
                   </form>
                   
                    </div>
                </div>
            </div>
         </div>
    </div>
    </div>
    </>
  )
}

export default Login