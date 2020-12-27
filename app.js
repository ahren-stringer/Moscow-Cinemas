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
//import auth from './middleware/auth.middleware.js'
import nodemailer from 'nodemailer'

//API Config
const app = expess();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://Reacter:6Jf4B0YhZXRsZCAg@cluster0.8y24l.mongodb.net/myTinder?retryWrites=true&w=majority';

//Middlewares
app.use(expess.json())
app.use(Cors())

//DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

})

//API Endpoints

app.get('/', (req, res) => res.status(200).send('GET'))

//Коменты

app.post('/coment', async (req, res) => {

    try {
        const { coment, size, token, place } = req.body

        if (!token) return res.status(400).json({ message: 'Вы не авторизованны' })
        const decoded = jwt.verify(token, 'TopSecret')
        //req.user=decoded
        console.log(decoded)
        const user = await User.findOne({ _id: decoded.userId })
        console.log(user)
        const newComent = new Coment({ coment, size, place, name: user.name, email: user.email, owner: decoded.userId })
        console.log(newComent)
        await newComent.save()
        res.status(201).json({ newComent })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

app.get('/cinema/coments/:place', async (req, res) => {
    try {
        const coments = await Coment.find({place: req.params.place})
        res.json([coments[coments.length-1]])
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

app.get('/cinema/coments/some/:place/:limit/:skip', async (req, res) => {
    try {
        const coments = await Coment.find({place: req.params.place}).limit(+req.params.limit).skip(+req.params.skip)
        res.json(coments)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

app.get('/cinema/coments_count/:place', async (req, res) => {
    try {
        const coments = await Coment.find({place: req.params.place})
        res.json(coments.length)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

//Фотки

app.post('/cinema/photos', (req, res) => {
    const dbPhotos = req.body

    Photos.create(dbPhotos, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/cinema/photos', (req, res) => {
    Photos.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

// Авторизация

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'mos_culture@mail.ru',
        pass: 'youwi11neverpass'
    },
    tls: {
        rejectUnauthorized: false
    }
});

const mailer= message =>{
    transporter.sendMail(message,(err,info)=>{
        if (err) return console.log('Error ',err)
        console.log('Email sent:', info)
    })
}

app.post(
    '/cinema/register',
    [
        check('email', 'Неправильный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            console.log('body', req.body)
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные'
                })
            }

            const { name, email, password } = req.body
            const condidate = await User.findOne({ email })
            console.log(condidate)
            if (condidate) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' })
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ name, email, password: hashedPassword });

            await user.save()

            res.status(201).json({ message: 'Пользователь зарегистрирован' })
            // Отправка на почту

            const message = {
                from: 'MosCulture <mos_culture@mail.ru>',
                to: req.body.email, 
                subject: 'Вы зарегистрированны на сайте MosCulture',
                text: `Вы зарегистрированны на сайте MosCulture
                
                Данные вашей учетной записи:
                Логин: ${req.body.email}
                Пароль: ${req.body.password}`
              };

            mailer(message)

        } catch (e) {
            res.status(500).json({ message: 'Ошибка регистрации' })
        }
    })

app.post(
    '/cinema/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Ввкдите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные'
                })
            }

            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'Такого пользователя не существует' })
            }
            const isMatch = bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res, status(400).json({ message: 'Неверный пароль' })
            }

            const token = jwt.sign(
                { userId: user.id },
                'TopSecret',
                { expiresIn: '24h' }
            )
            res.json({ token, userId: user.id })
        } catch (e) {
            res.status(500).json({ message: 'Ошибка авторизации' })
        }
    })

//Наборы данных

//Категории

app.post(
    '/place_category',
    async (req, res) => {
        try {
            const { category, categoryUrl } = req.body
            const condidate = await PlaceCategory.findOne({ category })
            if (condidate) {
                return res.status(400).json({ message: 'Такая категория уже есть' })
            }
            const newCategory = new PlaceCategory({ category, categoryUrl });

            await newCategory.save()

            res.status(201).json({ message: 'Категория зарегистрирована' })
        } catch (e) {
            res.status(500).json({ message: 'Ошибка записи' })
        }
    })

app.get(
    '/place_category',
    async (req, res) => {
        try {
            const category = await PlaceCategory.find()
            res.json(category)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    })

//Места

app.post('/place_category/places', async (req, res) => {

    try {
        const { name,
            address,
            district,
            phones,
            email,
            workHours,
            numberOfHalls,
            coordinates,
            webSite,
            photos,
            placeCategory,
            categoryUrl } = req.body

        const category = await PlaceCategory.findOne({ categoryUrl })

        const newPlace = new Place({
            name,
            address,
            district,
            phones,
            email,
            workHours,
            numberOfHalls,
            coordinates,
            webSite,
            photos,
            placeCategory,
            categoryUrl,
            owner: category
        })

        await newPlace.save()
        //await category.places.push(newPlace)
        res.status(201).json({ newPlace })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})
// Поиск

app.get('/place_category/places/search/:search', async (req, res) => {
    try {
        const places = await Place.find()
        
        res.json(places.filter(item=> item.name.toLowerCase().includes(req.params.search)).slice(0,8))
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

app.get('/place_category/places/search_all/:search', async (req, res) => {
    try {
        const places = await Place.find()
        res.json(places.filter(item=> item.name.toLowerCase().includes(req.params.search)))
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

// по категориям
app.get('/place_category/places/category/:placeCategory', async (req, res) => {
    try {
        const places = await Place.find({ categoryUrl: req.params.placeCategory }).exec()
        res.json(places)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})
// определенное количество
app.get('/place_category/places/some/:placeCategory/:limit/:skip', async (req, res) => {
    try {
        const places = await Place.find({categoryUrl:req.params.placeCategory}).limit(+req.params.limit).skip(+req.params.skip)
        console.log(req.params.limit,req.params.skip)
        res.json(places)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})
// по местам
app.get('/place_category/places/:name', async (req, res) => {
    try {
        const places = await Place.find({name:req.params.name}).exec()
        res.json(places)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

// Популярность
app.put('/place_category/places/:id', async (req, res) => {
    try {
        await Place.findByIdAndUpdate({_id:req.params.id},req.body)
        let place= await Place.findById(req.params.id)
        console.log(place)
        res.send('+1')
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})
app.get('/popular', async (req, res) => {
    try {
        
        let places= await Place.find().exec()
        let arr=[]
        for (let i=0;i<places.length;i++){
            if ('popular' in places[i] && places[i].popular){
                arr.push(places[i])
            }
        }
        arr.sort((a, b) => b.popular - a.popular)
        res.json(arr)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})
// Обратная связь


app.post('/email',(req,res)=>{
    if (!req.body.email || !req.body.message) return res.sendStatus(400)
    const message = {
        from: `MosCulture <mos_culture@mail.ru>`,
        to: 'pavel12g@mail.ru', // Почта сайта
        subject: req.body.name,
        html: req.body.message
      };
      mailer(message)
})

//Listener

app.listen(port, () => console.log('Server Starts on localhost', port))
