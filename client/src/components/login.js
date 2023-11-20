import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import '../form.css'
import { UserContex } from '../App';
const Login = () => {
  const { state, dispatch } = useContext(UserContex);
  const navigate = useNavigate();
  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");
  const Postdata = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password, })
    })
    const userdata = await res.json()
    console.log(userdata.role)
    //  const data= await res.json()
    console.log(res.status)
    console.log(state)
    if (res.status === 400) {
      window.alert("invalid cridential")
    }
    else {
      dispatch({ type: "USER", payload: true })
      window.alert(" loged in success")
      if (userdata.role === 'user') {
        navigate('/', { replace: true })
      }
      else {
        navigate('/adminhome', { replace: true })
      }
    }
  }
  return (
    <>
      <div className="login1">
        <h4>LOGIN</h4>
        <p><AccountCircleTwoToneIcon sx={{ fontSize: 80 }}/></p>
        <form className='form1' method="POST">
          <div className="text_area">
            <MailIcon sx={{ fontSize: 30 }} />
            <input
              type="text"
              id="email"
              name="email"
              placeholder='email'
              className="text_input"
              onChange={(event) => { setEmail(event.target.value); }}
            />
          </div>
          <div className="text_area">
            < KeyIcon sx={{ fontSize: 30 }} />
            <input
              type="password"
              id="password"
              name="password"
              placeholder='password'
              className="text_input"
              onChange={(event) => { setPass(event.target.value); }}
            />

          </div>
          <button
            className="btn"
            onClick={Postdata}
          >LOGIN</button>
        </form>
        <NavLink className="link" to="/singup">Sign Up(if not registered)</NavLink>
      </div>
    </>
  );
}

export default Login;