// import { FormControl, FormGroup, TextField, styled, Typography, Button } from "@mui/material";
import { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import React from 'react'
import '../form.css'
// import '../App1.css'


// const Container=styled(FormGroup)`
// width:150%;
// margin: 200px;
// & > div{
//     margin-top:20px
// }
// `
// const Textfield=styled(TextField)`
// width:20%;

// `
// const Button1=styled(Button)`
// width:20%;

// `
// const Typography1=styled(Typography)`
// width:20%;

// `


const Addmonument = () => {
    const navigate=useNavigate();
    const[username,setName]=useState("")
    const[userid,setID]=useState("")
    const[useremail,setuserEmail]=useState("")
    const[name,setname]=useState("");
    const[type,setType]=useState("");
    const[description,setDes]=useState("");
    const[country,setCountry]=useState("");
    const[state,setState]=useState("");
    const[city,setCity]=useState("");
    const[zip,setzip]=useState("");
    const[zone,setZone]=useState("");
    const[opentime,setOt]=useState("");
    const[closetime,setCt]=useState("");
    const[adult,setAp]=useState(0);
    const[children,setCp]=useState(0);
    const[foreigner,setFp]=useState(0);
    const[available,setAvailable]=useState("");
    const[contact,setContact]=useState("");
    const[email,setEmail]=useState("");
    const[bestseason,setBs]=useState("");
    const[image,setImage]=useState("")
    const Postdata=async(e)=>{
        e.preventDefault();
         const res= await fetch("/addsite",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({name:username,_id:userid,emailuser:useremail,siteName:name,siteType:type,siteDescription:description,country:country,state:state,city:city,zip:zip,zone:zone,phoneno:contact,email:email,adult:adult,children:children,foreigner:foreigner,open:opentime,close:closetime,Availability:available,Bestseasonvisit:bestseason,image:image})
         })
         const data=await res.json()
         if(res.status===422 || !data ){
            window.alert("invalid registration")
         }
         else{
            window.alert("data stored successfully")
            navigate('/adminhome')
         }
       
      }

      const callAboutPage=async()=>{
        try{
            const res= await fetch('/getdata',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })
            const data=await res.json()
            setName(data.name)
            setuserEmail(data.email)
            setID(data._id)
            // console.log(data)
            if(!res.status===200){
                const error=new Error(res.error)
                throw error
            }
            else if(data.role==='user'){
                navigate('/login',{replace:true})
            }
        }catch(err){
            console.log(err)
            navigate('/login',{replace:true})
        }
    }

      useEffect(()=>{
        callAboutPage();
    },)
    
    return (
        <>
        <div className="login2">
        <h4>ADD SITE</h4>
        <form className='form2' method="POST">
          <div className="text_area">
            <input
              type="text"
              id="name"
              name="name"
              placeholder='name'
              className="text_input"
              onChange={(event) => { setname(event.target.value); }}
            />
          </div>
          <div className="text_area">
            <select
              type="text"
              id="type"
              name="type"
              placeholder='sitetype'
              className="text_input"
              onChange={(event) => { setType(event.target.value); }}>
                <option>--Selecttype--</option>
                <option>MONUMENT</option>
                <option>MUSEUM</option>
                <option>HOLYPLACE</option>
                <option>ARTGALLERY</option>
              </select>
          </div>
          <div className="text_area">
            <input
              type="text"
              id="description"
              name="description"
              placeholder='site description'
              className="text_input"
              onChange={(event) => { setDes(event.target.value); }}
            />
          </div>
          <div className="text_area">
            <input
              type="text"
              id="Country"
              name="country"
              placeholder='country'
              className="text_input"
              onChange={(event) => { setCountry(event.target.value); }}
            />
          </div>
          <div className="text_area">
            <input
              type="text"
              id="State"
              name="state"
              placeholder='state'
              className="text_input"
              onChange={(event) => { setState(event.target.value); }}
            />
          </div>
          <div className="text_area">
            <input
              type="text"
              id="City"
              name="city"
              placeholder='city'
              className="text_input"
              onChange={(event) => { setCity(event.target.value); }}
            />
          </div>
          <div className="text_area">
            <input
              type="text"
              id="Zip"
              name="zip"
              placeholder='zipcode'
              className="text_input"
              onChange={(event) => { setzip(event.target.value); }}
            />
          </div>
          <div className="text_area">
            <select
              type="text"
              id="zone"
              name="zone"
              placeholder='zone'
              className="text_input"
              onChange={(event) => { setZone(event.target.value); }}>
                <option>--Selectzone--</option>
                <option>NORTH</option>
                <option>SOUTH</option>
                <option>EAST</option>
                <option>WEST</option>
                <option>CENTRAL</option>
              </select>
            
          </div>
          <div className="text_area">
            <input
              type="time"
              id="open"
              name="open"
              placeholder='site open time'
              className="text_input"
              onChange={(event) => { setOt(event.target.value); }}
            />
          </div>
          <div className="text_area">
            <input
              type="time"
              id="close"
              name="close"
              placeholder='site close time'
              className="text_input"
              onChange={(event) => { setCt(event.target.value); }}
            />
          </div>
          <div className="text_area">
            <input
              type="Number"
              id="aprice"
              name="aprice"
              placeholder='adult price'
              className="text_input"
              onChange={(event) => { setAp(event.target.value); }}
            />
          </div>
          <div className="text_area">
            <input
              type="Number"
              id="childprice"
              name="childprice"
              placeholder='child price'
              className="text_input"
              onChange={(event) => { setCp(event.target.value); }}
            />
          </div>
          <div className="text_area">
            <input
              type="Number"
              id="fprice"
              name="fprice"
              placeholder='foreigner price'
              className="text_input"
              onChange={(event) => { setFp(event.target.value); }}
            />
          </div>
          <div className="text_area">
            <select
              type="text"
              id="availablity"
              name="availablity"
              placeholder='availablity'
              className="text_input"
              onChange={(event) => { setAvailable(event.target.value); }}>
                <option>--Selectavaiblity--</option>
                <option>YES</option>
                <option>NO</option>
              </select>
          </div>
          <div className="text_area">
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
            <input
              type="text"
              id="phoneno"
              name="phoneno"
              placeholder='phone no'
              className="text_input"
              onChange={(event) => { setContact(event.target.value); }}
            />
          </div>
          <div className="text_area">
            <select
              type="text"
              id="season"
              name="season"
              placeholder=' best season to visit'
              className="text_input"
              onChange={(event) => { setBs(event.target.value); }}>
                <option>--Selectseason--</option>
                <option>SUMMER</option>
                <option>WINTER</option>
                <option>MONSOON</option>
                <option>SPRING</option>
              </select>
          </div>
          <div className="text_area">
            <input
              type="string"
              id="image"
              name="image"
              placeholder='paste image link form net'
              className="text_input"
              onChange={(event) => { setImage(event.target.value); }}
            />
          </div>
          <button
            className="btn"
            onClick={Postdata}
          >ADD SITE</button>
        </form>
      </div>
        </>
    )
}
export default Addmonument;