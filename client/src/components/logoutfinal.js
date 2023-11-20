import React, { useContext,useEffect } from 'react'
import {useNavigate } from 'react-router-dom';
import { UserContex } from '../App';
const Logoutfinal=()=>{
    const {state,dispatch}=useContext(UserContex);
    const navigate=useNavigate();
    useEffect(()=>{
        fetch('/api/logout',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res)=>{
            dispatch({type:"USER",payload:false})
            console.log(state)
            navigate('/generatereader',{replace:true})
            if(res.status !== 200){
                    const error=new Error(res.error);
                    throw error
            }
        }).catch((err)=>{
            console.log(err)
        })
    })
    return(
        <div>
            <h1>Logout</h1>
        </div>
    )
}
export default Logoutfinal