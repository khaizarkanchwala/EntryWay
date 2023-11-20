import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import '../datatable.css'
const Checkout = () => {
  let { _id } = useParams()
  const navigate = useNavigate();
  const [userid, setUser] = useState('')
  const [datamore, setData] = useState({})
  const [siteticket, setTicket] = useState({})
  const [adult, setadult] = useState(0)
  const [child, setchild] = useState(0)
  const [foreigner, setforeigner] = useState(0)
  const [Total, setTotal] = useState(0)//
  const [siteId, setSiteId] = useState('')//
  const [siteName, setSitename] = useState('')//
  const [adminid, setAdminid] = useState('')//
  const [show, setShow] = useState(false)
  const userHome = async () => {
    try {
      const res = await fetch(`/api/getdataofsite/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })
      const data = await res.json()
      setData(data)
      setSiteId(datamore._id)//touristsite
      setSitename(datamore.siteName)
      setTicket(datamore.ticketfair)
      setAdminid(datamore.Adminid)
      setShow('true')
      if (!res.status === 200) {
        const error = new Error(res.error)
        throw error
      }

    } catch (err) {
      console.log(err)
      navigate('/login', { replace: true })
    }
  }

  const Postdata = async (e) => {
    // console.log((adult*siteticket.adult)+" "+(child*siteticket.children)+" "+(foreigner*siteticket.foreigner));  
    // setTotal((adult*siteticket.adult)+(child*siteticket.children)+(foreigner*siteticket.foreigner))
    e.preventDefault();
    const res = await fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ticket_of: siteId, ticket_ofname: siteName, adminID: adminid, Totalpaid: Total, adults: adult, children: child, foreigner: foreigner })
    })
    const data = await res.json()
    setUser(data)
    console.log(userid)
    if (res.status === 422 || !data) {
      window.alert("booking failed")
    }
    else {
      console.log(Total);
      console.log(data)
      window.alert("booking successful")
      navigate(`/generateqr/${data}/${siteId}`, { replace: true })
      // console.log(`/generateqr/${data}/${siteId}`)
    }
  }

  useEffect(() => {
    userHome();
  },)
  return (
    <div className="login1">
      <h4>{show?'SELECT MEMBERS':'login'}</h4>
      <form className='form1' method="POST">
        <div className="text_area">
          <input
            type="Number"
            id="adult"
            name="adult"
            placeholder='no of adults'
            className="text_input"
            onChange={(event) => { setadult(event.target.value); setTotal(((event.target.value) * siteticket.adult) + Total) }}
          />
        </div>
        <div className="text_area">
          <input
            type="Number"
            id="children"
            name="children"
            placeholder='no of children'
            className="text_input"
            onChange={(event) => { setchild(event.target.value); setTotal(((event.target.value) * siteticket.children) + Total) }}
          />
        </div>
        <div className="text_area">
          <input
            type="Number"
            id="foreigner"
            name="foreigner"
            // defaultValue="0"
            placeholder='no of foreigner'
            className="text_input"
            onChange={(event) => { setforeigner(event.target.value); setTotal(((event.target.value) * siteticket.foreigner) + Total) }}
          />
        </div>
        <h3>TOTAL AMOUNT={Total}</h3>
        <button
          className="btn"
          onClick={Postdata}
        >Check out</button>
      </form>
    </div>
  );
}

export default Checkout;