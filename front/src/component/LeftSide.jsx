import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import $, { map } from 'jquery';


const LeftSide = () => {
  const [name,setname]=useState("");
  const [pic,setpic]=useState("userimg.png");
  const [islogin,setislogin]=useState(false);
  const [songs,setsongs]=useState([]);
  const [mode,setmode]=useState("light");  
  const [srch,setsrch]=useState([]);

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
        <input className="form-control" type="text" id="wr" name='srch' placeholder="Search" onChange={(ev)=>{
          setsrch(ev.target.value)
          let s=srch.toString();
          axios.post('http://localhost:8000/getsearch',{s}).then((res)=>{
            setsongs(res.data);
            
            
             console.table(res.data);
              if(ev.target.value!=""){
                $('.sar ul li').remove();
                songs.map((data)=>{
                $(".sar ul").append(`<li id='dd'>${data.Name}</li>`)})
                
                }
                else{
                  $('.sar ul li').remove();                  
                }
                $(document).on('click', '#dd', function () {
                  $('#wr').val($(this).text());
                  setsrch($(this).text())
                $('.sar ul').html("");
                console.log(srch)
              });
            
      }).catch((err)=>{
        console.log(err);
      })
          }} aria-label="Search"></input>
        <a href={'/search/'+srch}><i className='fa fa-search'></i></a>
        </form>
        <div className='sar'>
          <ul>
            
          </ul>
        </div>
        </div>
        <div className='navitem mt-3'>                
            <div className='navitems'><li><i className="fa fa-moon-o"></i><a onClick={mod}>Mode</a></li></div> 
            <div className='navitems'><li><i className="fa fa-home"></i><a href='/'>Home</a></li></div>
            <div className='navitems'><li><i className="fa fa-history"></i><a href='/recent'>Recent</a></li></div>
            <div className='navitems'>
              { islogin?
                <li><i className="fa fa-list"></i><a href='/playlist'>Playlist</a></li>:
                <li><i className="fa fa-list"></i><a href='/login'>Playlist</a></li>
                }</div>
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

export default LeftSide