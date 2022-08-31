import React from 'react'
import { useState ,useEffect} from 'react'
import axios from 'axios'


const Newuser = () => {
    useEffect(()=>{
        const theme=sessionStorage.getItem("theme");
        document.body.className=theme;
    })
 const [User,setUser]=useState({
    Name:"",Email:"",UserName:"",Password:""
 })
 const [Pic,setPic]=useState();

 const getData=(event)=>{
    let name=event.target.name;
    let value=event.target.value;
    setUser({...User,[name]:value})
 }

 const submit=(event)=>{
event.preventDefault();
    let form = new FormData();
    form.append("Name",User.Name);
    form.append("Email",User.Email);
    form.append("UserName",User.UserName);
    form.append("Password",User.Password);
    form.append("Pic",Pic);

    axios.post("http://localhost:8000/newuser",form).then((res)=>{
         console.log(res);
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
                        <h2>New User</h2>
                    </div>
                    <div className='card-body'>
                   <form>                   
                <label>Name</label>
                <input className='form-control' onChange={getData} value={User.Name} type="text" name='Name'></input>
                <label className='mt-3'>Email</label>
                <input className='form-control' onChange={getData} value={User.Email} type="email" name='Email'></input>
                <label>Username</label>
                <input className='form-control' onChange={getData} value={User.UserName} type="text" name='UserName'></input>
                <label className='mt-3'>Password</label>
                <input className='form-control' onChange={getData} value={User.Password} type="password" name='Password'></input>
                <label className='mt-3'>Profile image</label>
                <input className='form-control' onChange={(event)=>{setPic(event.target.files[0])}}  type="file" name='Pic'></input>
                <div className=' cuser mt-4 text-center'>
                    <a href='/login'>Login</a>
                </div>
                <button onClick={submit} className='btn btn-success form-control mt-4'>Register</button>
                
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

export default Newuser