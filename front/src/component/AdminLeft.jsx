import React ,{useState,useEffect} from 'react';
import axios from 'axios';


const AdminLeft = () => {
  const [name,setname]=useState("");
  const [pic,setpic]=useState("userimg.png");
  const [islogin,setislogin]=useState(false);
  const [mode,setmode]=useState("light");  

  const logout=()=>{
    sessionStorage.removeItem("users");
    setislogin(false);
    setpic("userimg.png");
  }

  const mod=()=>{    
    if(mode==="light"){
      setmode("dark");
      sessionStorage.setItem("theme","dark");
    }
    else{
      setmode("light")
      sessionStorage.setItem("theme","light");
    }
  }
  useEffect(()=>{    
    if(sessionStorage.getItem("users")!=null){
       const user=sessionStorage.getItem("users");
       const users=JSON.parse(user);                
       const pr=`http://localhost:8000/users/${users.Pic}`
       setname(users.UserName);
       setislogin(true);      
       setpic(pr);       
    } 
    document.body.className=sessionStorage.getItem("theme"); 
  },[mode]);

  return (
    <>
        <div className='col-md-2 leftnav'>
        <div className='userimg mt-4 text-center'>
        <img src={pic}></img><br></br>
        {
            islogin ? 
            <a className='uname'>{name}</a>:
        <a href='login'>LOGIN</a> 
        }
        </div>
        <div className='search mt-5'>
        <form className="d-flex">
        <input className="form-control" type="search" placeholder="Search" aria-label="Search"></input>
        <button className="btn" type="submit"><i className='fa fa-search'></i></button>
        </form>
        </div>
        <div className='navitem mt-3'>                
            <div className='navitems'><li><i className="fa fa-moon-o"></i><a onClick={mod}>Mode</a></li></div> 
            <div className='navitems'><li><i className="fa fa-home"></i><a>Dashboard</a></li></div>
            <div className='navitems'><li><i className="fa fa-history"></i><a>Add Song</a></li></div>
            <div className='navitems'><li><i className="fa fa-list"></i><a>Add Artist</a></li></div>
            <div className='navitems'><li><i className="fa fa-download"></i><a>Download</a></li></div>
            {
            islogin ? 
            <li><i class="fa fa-sign-out" ></i>&nbsp;<a  onClick={logout}>LOGOUT</a></li>:
            ""
        }
        
        </div>
    </div>
    </>
  )
}

export default AdminLeft