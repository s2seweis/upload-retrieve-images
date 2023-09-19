import './App.css';
import React, {useEffect, useState, useContext, createContext} from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Video from './components/videos/Video';


import Register from './User/Register';

import RegisterVideo from './components/videos/RegisterVideo';

import EditVideo from './components/videos/EditVideo';

import EditVideoChild from './components/videos/EditVideoChild';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom"
import EditUser from './User/EditUser1';
import EditUserTop from './User/Index';
import axios from 'axios';





export const UserContext = createContext();
export const VideoContext = createContext();

function App() {

  const [data, setData] = useState ([]);
  console.log ('line:10', data);

  const [data2, setData2] = useState ([]);
  console.log ('line:11', data2);

  const getUserData = async () => {
    const res = await axios.get ('/getdata', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.data.status === 401 || !res.data) {
      console.log ('errror');
    } else {
      setData (res.data.getUser);
    }
  };

 const getVideo = async () => {
    const res = await axios.get ('/getvideo', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.data.status === 401 || !res.data) {
      console.log ('errror');
    } else {
      setData2 (res.data.getVideo);
    }
  };



  useEffect (() => {
    getUserData ();
  }, []);

  useEffect (() => {
    getVideo ();
  }, []);


  return (
    <div>
      <UserContext.Provider value={data}>
      <VideoContext.Provider value={data2}>

      <Header />
      <Routes>
        <Route path='/' element={ <Home  />} />
        <Route path='/adduser' element={ <Register />} />
        <Route path='/video' element={ <Video />} />
        <Route path='/addvideo' element={ <RegisterVideo />} />
        <Route element={<EditUser />} path="/edituser/:userid" />
        <Route element={<EditUserTop />} path="/editusernew/:userid" />
        <Route element={<EditVideo />} path="/editvideo/:userid" />
        <Route element={<EditVideoChild />} path="/editvideo/child" />

    

      </Routes>
     
      </VideoContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
