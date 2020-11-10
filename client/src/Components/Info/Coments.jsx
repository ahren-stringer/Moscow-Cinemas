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
    let [form, setForm] = useState({ email: '', name: '', size: 0, coment: '' });

    let onInputChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        async function fetchData() {
            debugger
            const req = await axios.get('http://localhost:8001/cinema/coments');
            setComents(req.data)
            console.log(req.data)
        }
        fetchData()
    }, [])

    const sendComent = async () => {
        await axios.post('http://localhost:8001/cinema/coments', { ...form })
        const req = await axios.get('http://localhost:8001/cinema/coments');
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
            <h4>Коментарии</h4>
            <div >
                <ul >
                    {coments.map((item) => {
                        return <li className={s.coment}>
                            <img src={user} className={s.coment__ava} />
                            <div className={s.coment__container}>
                                <span>{item.name}</span>
                                <span>{item.email}</span>
                                <div>Оценка: {
                                    arr.map((star, index, array) => {
                                       if (index<item.size) return <FontAwesomeIcon icon={faStar} style={{color: 'red'}} />
                                    })
                                    } </div>
                                <div>{item.coment} </div>
                                <div>{item.date} </div>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
            <div className={s.coment__form}>
            <h4>Оставить отзыв</h4>
                <div className="row">
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="name" name='name' type="text" className="validate" onChange={onInputChange} />
                            <label for="name">Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="email" type="email" className="validate" name='email' onChange={onInputChange} />
                            <label for="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea id="textarea1" className="materialize-textarea" name='coment' onChange={onInputChange}></textarea>
                                <label for="textarea1">Textarea</label>
                            </div>
                        </div>
                    </div>
                    <div>Оценка:   {arr.map((item, index, array) => {
                                return (
                                    <FontAwesomeIcon icon={faStar} id={item + 's'} onClick={() => { onColorChange(item) }} />
                                )
                            })
                            }
                        </div>
                    <button className='btn' onClick={sendComent}>отправить</button>
                </div>
            </div>
        </div>
    );

}

export default Coments