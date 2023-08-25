import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom"

import EditUser from './components/EditUser';


function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/register' element={ <Register />} />
        <Route path='/register' element={ <Register />} />
        <Route element={<EditUser />} path="/edituser/:userid" />

      </Routes>
     
    </>
  );
}

export default App;
