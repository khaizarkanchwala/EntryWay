// import { FormControl, FormGroup, TextField, styled, Typography, Button } from "@mui/material";
import { useState,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    let {_id}=useParams()
    const[datamore, setData] = useState({})
    const[siteadd,setAdd]=useState({})
    const[sitecontact,setContactget]=useState({})
    const[siteticket,setTicket]=useState({})
    const[sitetime,setTime]=useState({})
    const[siteby,setAdmin]=useState({})
    const[siteID,setSiteid]=useState("")
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
         const res= await fetch("/api/update",{
          method:"PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({id:_id,siteID:siteID,name:username,_id:userid,emailuser:useremail,siteName:name,siteType:type,siteDescription:description,country:country,state:state,city:city,zip:zip,zone:zone,phoneno:contact,email:email,adult:adult,children:children,foreigner:foreigner,open:opentime,close:closetime,Availability:available,Bestseasonvisit:bestseason,image:image})
         })
         const data=await res.json()
         if(res.status===422 || !data ){
            window.alert("invalid update")
         }
         else{
            window.alert("data updated successfully")
            navigate('/adminhome')
         }
       
      }

      const callAboutPage=async()=>{
        try{
            const res= await fetch(`/api/getupdate/${_id}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
            })
            const data=await res.json()
            setData(data)
            setAdd(data.siteAddress)
            setContactget(data.contact)
            setTicket(data.ticketfair)
            setTime(data.timings)
            setAdmin(data.site_added_by)
            setSiteid(data.siteID)
            setName(siteby.name)
            setID(siteby._id)
            setuserEmail(siteby._id)

            if(!res.status===200){
                const error=new Error(res.error)
                throw error
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
        <h4>UPDATE SITE</h4>
        <form className='form2' method="POST">
          <div className="text_area">
            <input
              type="text"
              id="name"
              name="name"
              value={datamore.siteName}
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
              value={datamore.siteType}
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
              value={datamore.siteDescription}
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
              value={siteadd.country}
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
              value={siteadd.state}
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
              value={siteadd.city}
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
              value={siteadd.zip}
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
              value={siteadd.zone}
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
              value={sitetime.open}
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
              value={sitetime.close}
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
              value={siteticket.adult}
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
              value={siteticket.children}
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
              value={siteticket.foreigner}
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
              value={datamore.Availability}
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
              value={sitecontact.email}
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
              value={sitecontact.phoneno}
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
              value={datamore.Bestseasonvisit}
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
              value={datamore.image}
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