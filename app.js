import expess from 'express'
import mongoose from 'mongoose'
import Coment from "./models/Coment.js"
import Photos from "./models/Photos.js"
import Cors from "cors"


//API Config
const app=expess();
const port=process.env.PORT||8001;
const connection_url='mongodb+srv://Reacter:6Jf4B0YhZXRsZCAg@cluster0.8y24l.mongodb.net/myTinder?retryWrites=true&w=majority'

//Middlewares
app.use(expess.json())
app.use(Cors())

//DB Config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true

})

//API Endpoints

app.get('/',(req,res)=>res.status(200).send('GET'))

//Коменты

app.post('/cinema/coments',(req,res)=>{
    const dbComent=req.body

    Coment.create(dbComent,(err,data)=>{
        if (err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get('/cinema/coments',(req,res)=>{
    Coment.find((err,data)=>{
        if (err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

//Фотки

app.post('/cinema/photos',(req,res)=>{
    const dbPhotos=req.body

    Photos.create(dbPhotos,(err,data)=>{
        if (err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get('/cinema/photos',(req,res)=>{
    Photos.find((err,data)=>{
        if (err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

//Listener

app.listen(port,()=>console.log('Server Starts on localhost',port))
