import './App.css';
import React, { useEffect, useState, createContext } from 'react';
import Header from './components/Navigation/Header/Header';
import OffCanvas from './components/Navigation/Header/OffCanvas/OffCanvas';
import Home from './pages/Home/Home';
import Files from './pages/Files/Files';
import Video1 from './pages/Videos/Videos1';
import AddFiles from './pages/Files/AddFiles/AddFiles';
import AddVideo from './pages/Videos/AddVideo/AddVideo';
import EditVideo from './pages/Videos/EditVideo/EditVideo';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Files/EditFiles/Index';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export const UserContext = createContext();
export const VideoContext = createContext();

function AppRouter() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const getUserData = async () => {
    const res = await axios.get('/getfiles', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.data.status === 401 || !res.data) {
      console.log('errror');
    } else {
      setData(res.data.getUser);
    }
  };

  const getVideo = async () => {
    const res = await axios.get('/getvideo', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.data.status === 401 || !res.data) {
      console.log('errror');
    } else {
      setData2(res.data.getVideo);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <div style={{}} className='app-router' >
      <UserContext.Provider value={data}>
        <VideoContext.Provider value={data2}>
          <Header />
          <OffCanvas />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/files' element={<Files />} />
            <Route path='/addfiles' element={<AddFiles />} />
            <Route path='/videos' element={<Video1 />} />
            <Route path='/addvideo' element={<AddVideo />} />
            <Route element={<Index />} path="/editfiles/:userid" />
            <Route element={<EditVideo />} path="/editvideo/:userid" />
          </Routes>
        </VideoContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default AppRouter;
