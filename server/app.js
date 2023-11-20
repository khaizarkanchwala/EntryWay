const express=require('express')
const dotenv =require("dotenv")
const jobs=require('./cron')

jobs.start();
const app=express()


dotenv.config({path:'./config.env'})
require('./db/conn')

app.use(express.json())

const userModel=require('./model/userSchema')
app.use(require('./router/auth'))
const PORT=process.env.PORT

app.get('/api',async(req,res)=>{
    console.log('server running to restart')
    try {
      res.status(200).send('Server restart successful');
    } catch (error) {
      console.error('Error during server restart:', error);
      res.status(500).send('Server restart failed');
    }
})
// app.get('/about',(req,res)=>{
//     res.send('hello about')
// })

// app.get('/contact',(req,res)=>{
//     res.send('hello contact')
// })

// app.get('/signin',(req,res)=>{
//     res.send('hello signin')
// })

// app.get('/signup',(req,res)=>{
//     res.send('hello signup')
// })


app.listen(PORT,()=>{
    console.log(`server running at port no ${PORT}`)
})