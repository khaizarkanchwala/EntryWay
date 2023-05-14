import React, { createContext, useReducer } from 'react';
import { Route,Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/about';
import Contact from './components/contact';
import Login from './components/login';
import Signup from './components/singup';
import Logout from './components/logout'
import Logoutfinal from './components/logoutfinal';
import AdminHome from './components/adminhome';
import AdminAllHome from './components/adminperticular'
import AdminForm from './components/adminform'
import MoreInfo from './components/moreinfo'
import UpdateForm from './components/updateform' 
import Checkout from './components/checkout';
import Generateqr from './components/generateqr'
import Qrreader from './components/qrcodereader'
import Bookingdata from './components/bookingdatauser'
import AdminBookingdata from './components/adminbookingdata'
import { initialState,reducer } from './reducer/useReducer';
export const UserContex=createContext();

const App= ()=> {
  const [state,dispatch]=useReducer(reducer,initialState)
    return (
      
      <>
      <UserContex.Provider value={{state,dispatch}}>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/singup' element={<Signup/>} />
      <Route path='/logout' element={<Logout/>} />
      <Route path='/logoutfinal' element={<Logoutfinal/>} />
      <Route path='/adminhome' element={<AdminHome/>} />
      <Route path='/admincustomhome' element={<AdminAllHome/>} />
      <Route path='/adminform' element={<AdminForm/>} />
      <Route path='/moreinfo/:_id' element={<MoreInfo/>} />
      <Route path='/updateinfo/:_id' element={<UpdateForm/>} />
      <Route path='/checkout/:_id' element={<Checkout/>} />
      <Route path='/generateqr/:_id/:site' element={<Generateqr/>} />
      <Route path='/generatereader' element={<Qrreader/>}/>
      <Route path='/bookings' element={<Bookingdata/>}/>
      <Route path='/adminbookingdata' element={<AdminBookingdata/>}/>
      </Routes>
      </UserContex.Provider>
       </> 
    );
}

export default App;
