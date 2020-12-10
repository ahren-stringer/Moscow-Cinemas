import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import s from './Info.module.css'
import user from '../../img/user.png'
import axios from 'axios';

const ComentsForm = (props) => {
    let arr = [1, 2, 3, 4, 5];
    let [coments, setComents] = useState([]);
    let [form, setForm] = useState({ email: '', name: '', size: 0, coment: '', cinema:props.infoData[0].Cells.CommonName});

    let onInputChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

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

export default ComentsForm