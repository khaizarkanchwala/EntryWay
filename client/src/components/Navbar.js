import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { UserContex } from '../App';
const Navbar = () => {
  const { state, dispatch } = useContext(UserContex)
  const [userName, setUserName] = useState('')
  const userHome = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })
      const data = await res.json()
      setUserName(data.role)
      console.log(dispatch)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    userHome();
  },)
  const RenderMenu = () => {
    if (state && userName === 'user') {
      return (
        <>
          <li class="nav-item active">
            <NavLink class="nav-link" to="/">Home</NavLink>
          </li>
          <li class="nav-item">
            <NavLink class="nav-link" to="/about">About</NavLink>
          </li>
          <li class="nav-item">
            <NavLink class="nav-link" to="/contact">contact</NavLink>
          </li>
          <li class="nav-item">
            <NavLink class="nav-link" to='/generatereader'>QRreader</NavLink>
          </li>
          <li class="nav-item">
            <NavLink class="nav-link" to='/bookings'>My booking</NavLink>
          </li>
          <li class="nav-item">
            <NavLink class="nav-link" to="/logout">Logout</NavLink>
          </li>
        </>
      )
    }
    else if (state && userName === 'admin') {
      return (
        <>
          <li class="nav-item active">
            <NavLink class="nav-link" to="/adminhome">Home</NavLink>
          </li>
          <li class="nav-item active">
            <NavLink class="nav-link" to="/adminform">Add sites</NavLink>
          </li>
          <li class="nav-item active">
            <NavLink class="nav-link" to="/admincustomhome">Site changes</NavLink>
          </li>
          <li class="nav-item active">
            <NavLink class="nav-link" to="/adminbookingdata">Bookings</NavLink>
          </li>
          <li class="nav-item">
            <NavLink class="nav-link" to="/logout">Logout</NavLink>
          </li>
        </>)
    }

    else {
      return (
        <>
          <li class="nav-item active">
            <NavLink class="nav-link" to="/">Home</NavLink>
          </li>
          <li class="nav-item">
            <NavLink class="nav-link" to="/about">About</NavLink>
          </li>
          <li class="nav-item">
            <NavLink class="nav-link" to="/contact">contact</NavLink>
          </li>
          <li class="nav-item active">
            <NavLink class="nav-link" to="/login">Login</NavLink>
          </li>
          <li class="nav-item active">
            <NavLink class="nav-link" to="/singup">Register</NavLink>
          </li>
        </>)
    }
  }
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink class="navbar-brand" to="#">
          <AccountBalanceIcon sx={{ fontSize: 50 }} />ENTRYWAY
        </NavLink>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto">
            <RenderMenu />
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;