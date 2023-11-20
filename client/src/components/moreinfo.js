import React, { useEffect, useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import '../form.css'
const MoreInfo=()=> {
    let {_id}=useParams()
    const navigate=useNavigate();
    const[datamore, setData] = useState({})
    const[siteadd,setAdd]=useState({})
    const[sitecontact,setContact]=useState({})
    const[siteticket,setTicket]=useState({})
    const[sitetime,setTime]=useState({})
    const moreInfo = async (e) => {
        try {
            const res = await fetch(`/api/moreinfo/${_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json()
            setData(data)
            setAdd(data.siteAddress)
            setContact(data.contact)
            setTicket(data.ticketfair)
            setTime(data.timings)
            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        moreInfo();
    },)
    return (
        <div className="login2">
            <div className='form2'>
            <img src={datamore.image}  alt="monument" />
            <h4>{datamore.siteName}</h4>
            <h3>TYPE</h3>
            <h2>{datamore.siteType}</h2>
            <h3>LOCATION</h3>
            <li>{siteadd.country}</li>
            <li>{siteadd.state}</li>
            <li>{siteadd.city}</li>
            <li>{siteadd.zip}</li>
            <li>{siteadd.zone}</li>
            <h3>ABOUT THE SITE</h3>
            <h2>{datamore.siteDescription}</h2>
            <h3>CONTACT</h3>
            <li>{sitecontact.phoneno}</li>
            <li>{sitecontact.email}</li>
            <h3>TICKET COST</h3>
            <li>Adult Rs{siteticket.adult}</li>
            <li>Children Rs{siteticket.children}</li>
            <li>Foreigner Rs{siteticket.foreigner}</li>
            <h3>TIMINGS</h3>
            <li>Opening time {sitetime.open} ISD</li>
            <li>Closing time {sitetime.close} ISD</li>
            <h3>Best season to visit</h3>
            <h2>{datamore.Bestseasonvisit}</h2>
            <button className='btn' onClick={()=>navigate(`/checkout/${datamore._id}`, { replace: true })}>Book Ticket</button>
            </div>
        </div>
    );
}
export default MoreInfo