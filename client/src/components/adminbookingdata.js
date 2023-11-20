import React,{ useEffect, useState }  from 'react';
import { useNavigate } from "react-router-dom";
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import '../datatable.css'
const Adminbookings=()=> {
    const navigate=useNavigate();
    const [userName,setUserName]=useState('')
    const[userId,setuserId]=useState('')
    const[show,setShow]=useState(false)
    const [booking, setBookings] = useState([])
    const userHome=async()=>{
        try{
            const res= await fetch('/api/getdata',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
            })
            const data=await res.json()
            setUserName(data.name)
            setuserId(data._id)
            setShow('true')
            if(!res.status===200){
                const error=new Error(res.error)
                throw error
            }
            else if(data.role==='user'){
                navigate('/login',{replace:true})
            }
        }catch(err){
            console.log(err)
        }
    }

    const showSites = async (e) => {
        try {
            const res = await fetch(`/api/bookingdataadmin/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json()
            setBookings(data)
            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        userHome();
        showSites()
    },)
    return (
        <div>
            <div className='hero2'>
                <div className='content'>
            <h1>{ show ? 'TOURIST BOOKINGS FOR ':'Please login to get started'}{userName}</h1>
            </div>
            </div>
            {/* <button className='btn' onClick={showSites}>show sites</button> */}
            <table>
                <thead>
                    <tr>
                        <td>Bought by(id)</td>
                        <td>siteid</td>
                        <td>QR(id)</td>
                        <td>status</td>
                        <td>Total Amount paid</td>
                        <td>QR</td>
                    </tr>
                </thead>
                <tbody>
                {booking.map((val, key) => {
                    return <tr key={key}>
                        <td>{val.bought_by}</td>
                        <td>{val.siteid}</td>
                        <td>{val.qrid}</td>
                        <td>{val.status}</td>
                        <td>{val.Total_paid}</td>
                        {val.qrurl &&(<td>
                <a href={val.qrurl} download='qr.png'>
                <img className='img1' src={val.qrurl} alt=" QR code" />
                </a>
            </td>)}
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Adminbookings;