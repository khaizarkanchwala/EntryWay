import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import '../hero.css'
import '../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css'
const Home = () => {
    const navigate = useNavigate();
    // const [userName, setUserName] = useState('')
    const [show, setShow] = useState(false)
    const [site, setTourist] = useState([])
    const [search, setSearcht] = useState([])
    const[name,setSearch]=useState("");
    const userHome = async () => {
        try {
            const res = await fetch('/api/readdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json()
            setTourist(data)
            setShow('true')
            console.log(show)
            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            }
        } catch (err) {
            console.log(err)
        }
    }

    const Postdata = async (e) => {
        e.preventDefault();
        if(name===""){
            window.alert("Enter data to search")
        }
        else{
        const res= await fetch("/api/search",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({sitename:name})
           })
          const data= await res.json()
          setSearcht(data)
            setShow('true')
            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            }
        }
    }
    useEffect(() => {
        userHome();
    },)
    return (
        <div>
            <div className='hero'>
                <div className='content'>
                        <h1>EXPLORE THE HERITAGE OF INDIA!!</h1>
                </div>
            </div>
            <form className='search' method="POST">
                            <div>
                                <input type="text" placeholder='search your visit' onChange={(event)=>{setSearch(event.target.value);}}/>
                            </div>
                            <div className='radio'>
                                <button type='submit' onClick={Postdata}><SearchIcon/></button>
                            </div>
                        </form>

                 <div className='container'>
                <div className='row'>
                    {search.map((val, key) => {
                    
                       return <div key={key} className='col-md-3'>
                            <p className='search-text'>Search Result</p>
                            <div class="card">
                                <img src={val.image} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">{val.siteName}</h5>
                                    <p class="card-text">child:rs{val.ticketfair.children}</p>
                                    <button class="btn btn-primary" onClick={()=>navigate(`/moreinfo/${val._id}`, { replace: true })}>Buy Ticket</button>
                                </div>
                            </div>
                        </div>


                    })}
                </div>
            </div>

            <div className='container'>
                <div className='row'>
                    {site.map((val, key) => {
                        

                       return <div key={key} className='col-md-3'>
                            <div class="card">
                                <img src={val.image} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">{val.siteName}</h5>
                                    <p class="card-text">child:rs{val.ticketfair.children}</p>
                                    <button class="btn btn-primary" onClick={()=>navigate(`/moreinfo/${val._id}`, { replace: true })}>Buy Ticket</button>
                                </div>
                            </div>
                        </div>


                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;