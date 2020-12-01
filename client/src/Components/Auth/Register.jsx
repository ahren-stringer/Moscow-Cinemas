import React, { useEffect, useState } from 'react';
import 'materialize-css'
import { useMessage } from '../../Hooks/message.hook';
import axios from 'axios';

function Register(props) {

    //let message=useMessage();
    let [form, setForm] = useState({name:'', email: '', password: '' });

    let onInputChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    let registerReq = async () => {
        try {
            const data = await axios.post('http://localhost:8001/cinema/register', { ...form })
            console.log('Зарегистрировался ',data)
        } catch (e) { }
    }

    return <div class="container">
        <div style={{marginLeft: "10px"}}>
            <h4>Регистрация</h4>
        </div>
        <div className="row">
                <div className="row">
                    <div className="input-field col s12">
                        <input id="first_name" type="text" className="validate" name='name' onChange={onInputChange}/>
                        <label for="first_name">First Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="password" type="password" className="validate" name='password' onChange={onInputChange}/>
                        <label for="password">Password</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" className="validate" name='email' onChange={onInputChange}/>
                        <label for="email">Email</label>
                    </div>
                </div>
                <button className='btn' onClick={registerReq}>Зарегистрироваться</button>
        </div>
    </div>
}

export default Register;

