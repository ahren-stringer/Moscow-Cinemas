import expess from 'express'
import mongoose from 'mongoose'
import Cors from "cors"
import auth from './routes/auth.routes.js'
import category from './routes/category.routes.js'
import coments from './routes/coments.routes.js'
import email from './routes/email.routes.js'
import places from './routes/places.routes.js'

//API Config
const app = expess();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://Reacter:6Jf4B0YhZXRsZCAg@cluster0.8y24l.mongodb.net/myTinder?retryWrites=true&w=majority';
//'mongodb+srv://Reacter2:4SI0GUVM2zWy3SXr@cluster0.8y24l.mongodb.net/myTinder?retryWrites=true&w=majority'
//4SI0GUVM2zWy3SXr
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

//Listener

app.listen(port, () => console.log('Server Starts on localhost', port))
