import React,{ useEffect, useState }  from 'react';
import QRcode from 'qrcode'
import {  useParams } from "react-router-dom";
import '../form.css'
const Generateqr=()=> {
    let {_id}=useParams()
    let {site}=useParams()
    const qrname=_id+site+Math.floor(Math.random()*1001)+"qr.png"
    const[qrimage,setQrimageURL]=useState("")
    const [url,setUrl]=useState('')
    // const navigate=useNavigate();
    const Getdata=async()=>{
        // console.log(`${_id}`)
        setUrl(`http://localhost:3001/api/generateqr/${_id}`)
        if(!url){
            return alert("Error")
        }
        const response=await QRcode.toDataURL(url);
        setQrimageURL(response)
        if(qrimage!==""){
        const res= await fetch("/api/qrdata",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({bought_by:_id,siteid:site,qrid:qrname,qrurl:qrimage})
           })
          const data= await res.json()
          console.log(res.status)
          if(res.status===422 || !data){
            window.alert("invalid registration")
          }
          else{
            window.alert(" registration success")
          }
        }
    }


    useEffect(()=>{
        Getdata();
    },)
    return (
        <div>
            <h2>Click on QR to download</h2>
            {qrimage &&(
                <a href={qrimage} download={qrname}>
                <img className='img1' src={qrimage} alt=" QR code" />
                </a>
            )}
        </div>
    );
}

export default Generateqr;