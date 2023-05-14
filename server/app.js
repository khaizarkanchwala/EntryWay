const express=require('express')
const dotenv =require("dotenv")

const app=express()


dotenv.config({path:'./config.env'})
require('./db/conn')

app.use(express.json())

const userModel=require('./model/userSchema')
app.use(require('./router/auth'))
const PORT=process.env.PORT


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