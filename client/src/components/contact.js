import React, { useEffect, useState } from 'react';
const Contact=()=> {
    const[message,setMess]=useState("");
    const [userData,setUserData]=useState({})
    const userContact=async()=>{
        try{
            const res= await fetch('/getdata',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
            })
            const data=await res.json()
            setUserData(data)
            console.log(data)
            if(!res.status===200){
                const error=new Error(res.error)
                throw error
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        userContact();
    },)

    const Postdata=async(e)=>{
        e.preventDefault();
        const res= await fetch("/contact",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({name:userData.name,email:userData.email,phone:userData.phone,message:message})
           })
           const data= await res.json()
           if(!data){
            console.log("message not sent")
           }
           else{
            alert("message sent")
            setUserData({name:userData.name,email:userData.email,phone:userData.phone,message:""})
           }
    }
    return (
        <div>
            <form method="POST">
                <input placeholder='name' type="text" value={userData.name}/>
                <input placeholder='email' type="text" value={userData.email}/>
                <input placeholder='phone' type="number" value={userData.phone}/>
                <input
              type="text"
              id="message"
              name="message"
              placeholder='message'
              onChange={(event)=>{setMess(event.target.value);}}
            />
            <button
            onClick={Postdata}
          >SUBMIT</button>
            </form>
        </div>
    );
}

export default Contact;