import { useRef, useState } from 'react';
import QrScanner from 'qr-scanner'
import '../form.css'
const ReadQr=()=>{
    const[file,setFile]=useState(null)
    const[data,setData]=useState(null)
    const fileRef=useRef()

    const handleClick=()=>{
        fileRef.current.click();
        console.log(file)
    }

    const handleChange=async(e)=>{
        const file =e.target.files[0]
        setFile(file)
       const result= await QrScanner.scanImage(file)
       setData(result)
    }

    return(
        <div className="login1">
        <h2>Read QR Here</h2>
        <button  className="btn" onClick={handleClick}> Scan QR</button>
        <div>
            <input
              type="file"
              ref={fileRef}
              accept=".png, .jpg, .jpeg"
              className="d-none"
              onChange={handleChange}
            />
          </div>
          {
            file &&(
                <img className='img1' src={URL.createObjectURL(file)} alt="QR code"/>
            )
          }
          {data && <p><a href={data}>Click to check ticket before entry</a></p> }
        </div>
    )
}

export default ReadQr