import expess from 'express'
import mongoose from 'mongoose'
import Coment from "./models/Coment.js"
import Photos from "./models/Photos.js"
import User from './models/User.js'
import Cors from "cors"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pkg from 'express-validator';
const { check, validationResult } = pkg;
import auth from './middleware/auth.middleware.js'

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

app.post('/coment', auth, async (req, res) => {

    try {
        const { cinema, coment, size } = req.body
        console.log(req.user)
        const newComent = new Coment({ cinema, coment, size,owner: req.user.userId })

        await newComent.save()
        res.status(201).json({ newComent })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }

    // Coment.create(dbComent,(err,data)=>{
    //     if (err){
    //         res.status(500).send(err)
    //     }else{
    //         res.status(201).send(data)
    //     }
    // })
})

app.get('/cinema/coments', auth, async (req, res) => {
    try {
        const coments = await Coment.find({ owner: req.user.userId })
        res.json(coments)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }

    // Coment.find((err,data)=>{
    //     if (err){
    //         res.status(500).send(err)
    //     }else{
    //         res.status(200).send(data)
    //     }
    // })
})

app.get('/cinema/coments/:id', auth, async (req, res) => {
    try {
        const coments = await Coment.findById(req.params.id)
        res.json(coments)
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

app.post(
    '/cinema/register',
    [
        check('email', 'Неправильный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            debugger
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
            console.log('body', req.body)
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
            debugger
            res.json({ token, userId: user.id })
        } catch (e) {
            res.status(500).json({ message: 'Ошибка авторизации' })
        }
    })

//Listener

app.listen(port, () => console.log('Server Starts on localhost', port))
