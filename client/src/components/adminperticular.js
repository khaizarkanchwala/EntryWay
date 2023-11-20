import React,{ useEffect, useState }  from 'react';
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../datatable.css'
const AdminHome=()=> {
    const navigate=useNavigate();
    const [userName,setUserName]=useState('')
    const[userId,setuserId]=useState('')
    const[show,setShow]=useState(false)
    const [site, setTourist] = useState([])
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
            const res = await fetch(`/api/read/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json()
            setTourist(data)
            console.log(site)
            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            }
        } catch (err) {
            console.log(err)
        }
    }

    const Delete = async (id) => {
        try {
            const res = await fetch(`/api/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            window.alert("data deleted")
            navigate('/admincustomhome',{replace:true})
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
            <div className='hero3'>
                <div className='content'>
            <h1>{ show ? 'SITES ADDED BY ':'Please login to get started'}{userName}</h1>
            </div>
            </div>
            {/* <button className='btn' onClick={showSites}>show sites</button> */}
            <table>
                <thead>
                    <tr>
                        <td>name</td>
                        <td>type</td>
                        <td>country</td>
                        <td>state</td>
                        <td>city</td>
                        <td>zip</td>
                        <td>zone</td>
                        <td>phoneno</td>
                        <td>email</td>
                        <td>adultcost</td>
                        <td>childcost</td>
                        <td>foreigner</td>
                        <td>opentime</td>
                        <td>closetime</td>
                        <td>Available</td>
                        <td>image</td>
                        <td>bestseasonvisit</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                {site.map((val, key) => {
                    return <tr key={key}>
                        <td>{val.siteName}</td>
                        <td>{val.siteType}</td>
                        <td>{val.siteAddress.country}</td>
                        <td>{val.siteAddress.state}</td>
                        <td>{val.siteAddress.city}</td>
                        <td>{val.siteAddress.zip}</td>
                        <td>{val.siteAddress.zone}</td>
                        <td>{val.contact.phoneno}</td>
                        <td>{val.contact.email}</td>
                        <td>{val.ticketfair.adult}</td>
                        <td>{val.ticketfair.children}</td>
                        <td>{val.ticketfair.foreigner}</td>
                        <td>{val.timings.open}</td>
                        <td>{val.timings.close}</td>
                        <td>{val.Availability}</td>
                        <td><img width='100' height='100' src={val.image} alt="..."></img></td>
                        <td>{val.Bestseasonvisit}</td>
                        <td>
                            <button onClick={()=>navigate(`/updateinfo/${val._id}`, { replace: true })}><EditIcon/></button>
                            <button onClick={()=>Delete(val._id)}><DeleteIcon/></button>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
}

export default AdminHome;