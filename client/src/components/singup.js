import React, { useState } from 'react';
// import Axios from 'axios'
import {  NavLink,useNavigate } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import KeyIcon from '@mui/icons-material/Key';
import SecurityIcon from '@mui/icons-material/Security';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import '../form.css'
function Signup() {
  const navigate=useNavigate();
      const[name,setName]=useState("");
      const[email,setEmail]=useState("");
      const[phone,setPhone]=useState(0);
      const[pass,setPass]=useState("");
      const[cpass,setCpass]=useState("");
      const[role,setRole]=useState("");
      const Postdata=async(e)=>{
        e.preventDefault();
         const res= await fetch("/register",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({name:name,email:email,phone:phone,password:pass,cpassword:cpass,role:role})
         })
        const data= await res.json()
        console.log(res.status)
        if(res.status===422 || !data){
          window.alert("invalid registration")
        }
        else{
          window.alert(" registration success")
           navigate('/login',{replace:true})
        }
      }
    return (
        <>
        <div className="login">
        <h4>REGISTER</h4>
        <p><AppRegistrationIcon sx={{ fontSize: 80 }}/></p>
        <form method="POST">
          <div className="text_area">
            <PersonIcon sx={{ fontSize: 30 }}/>
            <input
              type="text"
              id="username"
              name="username"
              placeholder='username'
              className="text_input"
              onChange={(event)=>{setName(event.target.value);}}
            />
          </div>
          <div className="text_area">
            <MailIcon sx={{ fontSize: 30 }}/>
            <input
              type="text"
              id="email"
              name="email"
              placeholder='email'
              className="text_input"
              onChange={(event)=>{setEmail(event.target.value);}}
            />
          </div>
          <div className="text_area">
            <LocalPhoneIcon sx={{ fontSize: 30 }}/>
            <input
              type="number"
              id="phno"
              name="phno"
              placeholder='phno'
              className="text_input"
              onChange={(event)=>{setPhone(event.target.value);}}
            />
          </div>
          <div className="text_area">
            < KeyIcon sx={{ fontSize: 30 }}/>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='password'
              className="text_input"
              onChange={(event)=>{setPass(event.target.value);}}
            />
          </div>
          <div className="text_area">
            <SecurityIcon sx={{ fontSize: 30 }}/>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              placeholder='confirm password'
              className="text_input"
              onChange={(event)=>{setCpass(event.target.value);}}
            />
          </div>
          <div className="text_area">
            
            <input
              type="text"
              id="cpassword"
              name="cpassword"
              placeholder='Role(user or admin in small)'
              className="text_input"
              onChange={(event)=>{setRole(event.target.value);}}
            />
          </div>
          <button
            className="btn"
            onClick={Postdata}
          >SIGN UP</button>
          <NavLink className="link" to="/login">Sign In(if registered)</NavLink>
        </form>
        
      </div>
        </>
        
    );
}

export default Signup;