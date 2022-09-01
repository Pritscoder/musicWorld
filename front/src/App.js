import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Index from './component/Index'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import Error from './component/Error';
import Login from './component/Login';
import Newuser from './component/Newuser';
import Addsong from './component/Addsong';
import Adminpanel from './component/Adminpanel';
import PlayPanel from './component/PlayPanel';
import Artistpanel from './component/Artistpanel';
import Playlist from './component/Playlist';
import Recent from './component/Recent';
import Search from './component/Seach';
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

const App = () => {
  console.log("kk");
  return (
    <>
    <Routes>
      <Route path='/' element={<Index></Index>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/newuser' element={<Newuser></Newuser>}></Route>      
      <Route path='/adminpanel' element={<Adminpanel></Adminpanel>}></Route>
      <Route path='/playPanel/:simg/:sname/:artist/:song' element={<PlayPanel></PlayPanel>}></Route>
      <Route path='/artistpanel/:artistimg/:name/:bio' element={<Artistpanel></Artistpanel>}></Route>
      <Route path='/playlist' element={<Playlist></Playlist>}></Route>
      <Route path='/recent' element={<Recent></Recent>}></Route>
      <Route path='/search/:name' element={<Search></Search>}></Route>
      <Route path='*' element={<Error></Error>}></Route>
    </Routes>
    </>
  )
}

export default App
