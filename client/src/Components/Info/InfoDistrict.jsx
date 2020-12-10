import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import s from './Info.module.css'
import user from '../../img/user.png'
import axios from 'axios';

const Coments = (props) => {
    let arr = [1, 2, 3, 4, 5];
    let [coments, setComents] = useState([
        {date:String(new Date()), name: 'alex', email: "1@mail.ru", size: 3, coment: 'Орел и решка, это так, для всех... Общепит.... У Птушкина же, ручная работа. Это, можно сказать, Бентли среди одиночных путешествий.... Это, натуральная кожа и ручная сборка....' },
        {date:String(new Date()), name: 'alex', email: "1@mail.ru", size: 3, coment: 'Орел и решка, это так, для всех... Общепит.... У Птушкина же, ручная работа. Это, можно сказать, Бентли среди одиночных путешествий.... Это, натуральная кожа и ручная сборка....' },
        {date:String(new Date()), name: 'alex', email: "1@mail.ru", size: 3, coment: 'Орел и решка, это так, для всех... Общепит.... У Птушкина же, ручная работа. Это, можно сказать, Бентли среди одиночных путешествий.... Это, натуральная кожа и ручная сборка....' }
    ]);
    let [form, setForm] = useState({size: 0,
        coment: '',
        cinema:props.infoData[0].name,
        token: props.token});

    let onInputChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        async function fetchData() {
            debugger
            const req = await axios.get('http://localhost:8001/cinema/coments',{headers:{
                "Authorization": ('Bearer '+ props.token)
            }});
            setComents(req.data)
            console.log(req.data)
        }
        fetchData()
    }, [])

    const sendComent = async () => {
        await axios.post('http://localhost:8001/coment', { ...form },{headers:{
            "Authorization": ('Bearer '+ props.token)
        }})
        const req = await axios.get('http://localhost:8001/cinema/coments',{headers:{
            "Authorization": ('Bearer '+ props.token)
        }});
        setComents(req.data)
    }

    let onColorChange = (item) => {
        for (let i = 1; i <= 5; i++) {
            let id = i + "s";
            document.getElementById(id).style.color = 'black'
        }
        for (let i = 1; i <= item; i++) {
            let id = i + "s";
            document.getElementById(id).style.color = 'red'
        }
        setForm({ ...form, size: item })
    }
    return (
        <div>
           
        </div>
    );

}

export default Coments