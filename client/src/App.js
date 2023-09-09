import './App.css';

import React, {useEffect, useState, useContext, createContext} from 'react';

import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom"

import EditUser from './components/EditUser';

import axios from 'axios';
import Playground from './components/Playground';

export const UserContext = createContext();


function App() {

  const [data, setData] = useState ([]);
  console.log ('line:1', data);

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



  useEffect (() => {
    getUserData ();
  }, []);


  return (
    <div>
      <UserContext.Provider value={data}>

      <Header />
      <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/register' element={ <Register />} />
        {/* <Route path='/register' element={ <Register />} /> */}
        <Route element={<EditUser />} path="/edituser/:userid" />
        {/* ### Playground */}
        {/* <Route element={<Playground />} path="/playground" /> */}

      </Routes>
     
      </UserContext.Provider>
    </div>
  );
}

export default App;
