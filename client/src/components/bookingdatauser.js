import React,{ useEffect, useState }  from 'react';
// import { useNavigate } from "react-router-dom";
import '../datatable.css'
const AdminHome=()=> {
    const [booking, setBooking] = useState([])

    const showdata = async () => {
        // e.preventDefault()
        try {
            const res = await fetch('/api/bookingdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json()
            setBooking(data)
            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            }
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(()=>{
        showdata();
    },)
    return (
        <div>
            <div className='hero2'>
                <div className='content'>
            <h1>KNOW YOUR BOOKINGS</h1>
            </div>
            </div>
            <center>
                <pre>
            <table>
                <thead>
                    <tr>
                        <td>Site</td>
                        <td>adult</td>
                        <td>children</td>
                        <td>foreigner</td>
                        <td>Amount paid</td>
                        <td>booked_on</td>
                        <td>valid_for</td>
                        <td>QR</td>
                    </tr>
                </thead>
                <tbody>
                {booking.map((val, key) => {
                    return <tr key={key}>
                        <td>{val.ticket_ofname}</td>
                        <td>{val.adult}</td>
                        <td>{val.children}</td>
                        <td>{val.foreigner}</td>
                        <td>{val.Totalpaid}</td>
                        <td>{val.booked_on}</td>
                        <td>{val.valid_for}</td>
                        {val.Qr_generated &&(<td>
                <a href={val.Qr_generated} download='qr.png'>
                <img className='img1' src={val.Qr_generated} alt=" QR code" />
                </a>
            </td>)}
                    </tr>
                })}
                </tbody>
            </table>
            </pre>
            </center>
        </div>
    );
}

export default AdminHome;