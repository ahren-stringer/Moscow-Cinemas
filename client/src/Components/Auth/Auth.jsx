import React, { useEffect, useState } from 'react';
import 'materialize-css'
import { useMessage } from '../../Hooks/message.hook';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function Auth(props) {

    //let auth=useContext(AuthContext)
    //let { load, request,error,clearError} = useHttp();
    let message = useMessage();
    let [form, setForm] = useState({ name: '', email: '', password: '' });

    let onInputChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    // useEffect(()=>{
    //     message(error)
    //     clearError()
    // },[error,message,clearError])

    let registerReq = async () => {
        try {
            const data = await axios.post('/cinema/register', { ...form })
            console.log(data)
        } catch (e) { }
    }
    let loginReq = async () => {
        try {
            const data = await axios.post('/cinema/login', { ...form })
            console.log(data)
            //auth.login(data.token,data.userId)
        } catch (e) { }
    }


    return <div class="container">
        <div style={{ marginLeft: "10px" }}>
            <h4>Войти:</h4>
        </div>
        <div className="row">
            <form className="col s6">
                <div className="row">
                    <div className="input-field col s12">
                        <input id="password" type="password" className="validate" onChange={onInputChange} />
                        <label for="password">Password</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" className="validate" onChange={onInputChange} />
                        <label for="email">Email</label>
                    </div>
                </div>
                <button className='btn' style={{ marginLeft: "10px", marginRight: "10px" }}
                    onClick={loginReq}>Войти</button>
                <NavLink to='/register'>
                    <button className='btn'
                    // onClick={registerReq}
                    >Зарегистрироваться</button>
                </NavLink>
            </form>
        </div>
    </div>
}

export default Auth;

