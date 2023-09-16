import './App.css';
import React, {useEffect, useState, useContext, createContext} from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Register from './User/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom"
import EditUser from './User/EditUser';
import EditUserTop from './User/Index';
import axios from 'axios';

import Playground from './User/Playground';




export const UserContext = createContext();
function App() {

  const [data, setData] = useState ([]);
  console.log ('line:10', data);

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
        <Route path='/' element={ <Home  />} />
        <Route path='/register' element={ <Register />} />
        <Route path='/playground' element={ <Playground />} />
        <Route element={<EditUser />} path="/edituser/:userid" />
        <Route element={<EditUserTop />} path="/editusernew/:userid" />

    

      </Routes>
     
      </UserContext.Provider>
    </div>
  );
}

export default App;
