import expess from 'express'
import mongoose from 'mongoose'
import Coment from "./models/Coment.js"
import Photos from "./models/Photos.js"
import User from './models/User.js'
import PlaceCategory from './models/PlaceCategory.js'
import Place from './models/Place.js'
import Cors from "cors"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pkg from 'express-validator';
const { check, validationResult } = pkg;
import nodemailer from 'nodemailer'
import auth from './routes/auth.routes.js'
import category from './routes/category.routes.js'
import coments from './routes/coments.routes.js'
import email from './routes/email.routes.js'
import places from './routes/places.routes.js'


//API Config
const app = expess();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://Reacter:6Jf4B0YhZXRsZCAg@cluster0.8y24l.mongodb.net/myTinder?retryWrites=true&w=majority';

//Middlewares
app.use(expess.json())
app.use(Cors())
// Авторизация
app.use('',auth)
// Категории
app.use('',category)
// Коменты
app.use('',coments)
// Обратная связь
app.use('',email)
// Места
app.use('',places)

//DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

})

//Коменты

// app.post('/coment', async (req, res) => {

//     try {
//         const { coment, size, token, place } = req.body

//         if (!token) return res.status(400).json({ message: 'Вы не авторизованны' })
//         const decoded = jwt.verify(token, 'TopSecret')
//         //req.user=decoded
//         console.log(decoded)
//         const user = await User.findOne({ _id: decoded.userId })
//         console.log(user)
//         const newComent = new Coment({ coment, size, place, name: user.name, email: user.email, owner: decoded.userId })
//         console.log(newComent)
//         await newComent.save()
//         res.status(201).json({ newComent })
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })

// app.get('/cinema/coments/:place', async (req, res) => {
//     try {
//         const coments = await Coment.find({place: req.params.place})
//         res.json([coments[coments.length-1]])
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })

// app.get('/cinema/coments/some/:place/:limit/:skip', async (req, res) => {
//     try {
//         const coments = await Coment.find({place: req.params.place}).limit(+req.params.limit).skip(+req.params.skip)
//         res.json(coments)
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })

// app.get('/cinema/coments_count/:place', async (req, res) => {
//     try {
//         const coments = await Coment.find({place: req.params.place})
//         res.json(coments.length)
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })

//Наборы данных

//Категории

// app.post(
//     '/place_category',
//     async (req, res) => {
//         try {
//             const { category, categoryUrl } = req.body
//             const condidate = await PlaceCategory.findOne({ category })
//             if (condidate) {
//                 return res.status(400).json({ message: 'Такая категория уже есть' })
//             }
//             const newCategory = new PlaceCategory({ category, categoryUrl });

//             await newCategory.save()

//             res.status(201).json({ message: 'Категория зарегистрирована' })
//         } catch (e) {
//             res.status(500).json({ message: 'Ошибка записи' })
//         }
//     })

// app.get(
//     '/place_category',
//     async (req, res) => {
//         try {
//             const category = await PlaceCategory.find()
//             res.json(category)
//         } catch (e) {
//             res.status(500).json({ message: 'Что-то пошло не так' })
//         }
//     })

//Места

// app.post('/place_category/places', async (req, res) => {

//     try {
//         const { name,
//             address,
//             district,
//             phones,
//             email,
//             workHours,
//             numberOfHalls,
//             coordinates,
//             webSite,
//             photos,
//             placeCategory,
//             categoryUrl } = req.body

//         const category = await PlaceCategory.findOne({ categoryUrl })

//         const newPlace = new Place({
//             name,
//             address,
//             district,
//             phones,
//             email,
//             workHours,
//             numberOfHalls,
//             coordinates,
//             webSite,
//             photos,
//             placeCategory,
//             categoryUrl,
//             owner: category
//         })

//         await newPlace.save()
//         //await category.places.push(newPlace)
//         res.status(201).json({ newPlace })
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })
// // Поиск

// app.get('/place_category/places/search/:search', async (req, res) => {
//     try {
//         const places = await Place.find()
        
//         res.json(places.filter(item=> item.name.toLowerCase().includes(req.params.search)).slice(0,8))
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })

// app.get('/place_category/places/search_all/:search', async (req, res) => {
//     try {
//         const places = await Place.find()
//         res.json(places.filter(item=> item.name.toLowerCase().includes(req.params.search)))
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })

// // по категориям
// app.get('/place_category/places/category/:placeCategory', async (req, res) => {
//     try {
//         const places = await Place.find({ categoryUrl: req.params.placeCategory }).exec()
//         res.json(places)
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })
// // определенное количество
// app.get('/place_category/places/some/:placeCategory/:limit/:skip', async (req, res) => {
//     try {
//         const places = await Place.find({categoryUrl:req.params.placeCategory}).limit(+req.params.limit).skip(+req.params.skip)
//         res.json(places)
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })
// app.get('/place_category/places/category_count/:category', async (req, res) => {
//     try {
//         const place = await Place.find({categoryUrl: req.params.category})
//         res.json(place.length)
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })
// // по местам
// app.get('/place_category/places/:name', async (req, res) => {
//     try {
//         const places = await Place.find({name:req.params.name}).exec()
//         res.json(places)
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })

// // Популярность
// app.put('/place_category/places/:id', async (req, res) => {
//     try {
//         await Place.findByIdAndUpdate({_id:req.params.id},req.body)
//         let place= await Place.findById(req.params.id)
//         console.log(place)
//         res.send('+1')
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })
// app.get('/popular', async (req, res) => {
//     try {      
//         let places= await Place.find().exec()
//         let arr=[]
//         for (let i=0;i<places.length;i++){
//             if ('popular' in places[i] && places[i].popular){
//                 arr.push(places[i])
//             }
//         }
//         arr.sort((a, b) => b.popular - a.popular)
//         res.json(arr)
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })
// app.get('/popular/some', async (req, res) => {
//     try {
//         let places= await Place.find().exec()
//         let arr=[]
//         for (let i=0;i<places.length;i++){
//             if ('popular' in places[i] && places[i].popular){
//                 arr.push(places[i])
//             }
//         }
//         arr.sort((a, b) => b.popular - a.popular)
//         res.json(arr.slice(0,6))
//     } catch (e) {
//         res.status(500).json({ message: 'Что-то пошло не так' })
//     }
// })
// Обратная связь


// app.post('/email',(req,res)=>{
//     if (!req.body.email || !req.body.message) return res.sendStatus(400)
//     const message = {
//         from: `MosCulture <mos_culture@mail.ru>`,
//         to: 'pavel12g@mail.ru', // Почта сайта
//         subject: req.body.name,
//         html: req.body.message
//       };
//       mailer(message)
// })

//Listener

app.listen(port, () => console.log('Server Starts on localhost', port))
