import express from 'express';
const {Router} = express;
const router=Router()
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'site_mailsender@mail.ru',
        pass: 'youwi11neverpa22'
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

router.post('/email',(req,res)=>{
    if (!req.body.email || !req.body.message) return res.sendStatus(400)
    const message = {
        from: `site_mailsender@mail.ru`,
        to: 'pavel12g@mail.ru', // Почта сайта
        subject: req.body.name,
        html: req.body.message
      };
      mailer(message)
})

export default router