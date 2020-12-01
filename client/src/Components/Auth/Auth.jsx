import React, { useEffect, useState } from 'react';
import 'materialize-css'
import { useMessage } from '../../Hooks/message.hook';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import vkAuth from '../../img/vkAuth.png'
import { connect } from 'react-redux';
import { login, setLoaded } from '../../redux/authReduser'

function Auth(props) {

    //let auth=useContext(AuthContext)

    let message = useMessage();
    let [form, setForm] = useState({ email: '', password: '' });

    let onInputChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    // useEffect(()=>{
    //     message(error)
    //     clearError()
    // },[error,message,clearError])

    let loginReq = async () => {
        try {
            const req= await axios.post('http://localhost:8001/cinema/login', { ...form })
            console.log(req)
            props.login(req.data.token, req.data.userId)
        } catch (e) { }
    }


    return <div class="container">
        <div style={{ marginLeft: "10px" }}>
            <h4>Войти:</h4>
        </div>
        <div className="row">
            <div className="row">
                <div className="input-field col s12">
                    <input id="email" type="email" className="validate" name='email' onChange={onInputChange} />
                    <label for="email">Email</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input id="password" type="password" className="validate" name='password' onChange={onInputChange} />
                    <label for="password">Password</label>
                </div>
            </div>
            <button className='btn' style={{ marginLeft: "10px", marginRight: "10px" }}
                onClick={loginReq}>Войти</button>
            <NavLink to='/register'>
                <button className='btn'
                // onClick={registerReq}
                >Зарегистрироваться</button>
            </NavLink>
        </div>
        <div>
            <div>
                <h5>Авторизация через:</h5>
            </div>
            <div>
                <img src={vkAuth} style={{ width: "40px" }}></img>
            </div>
        </div>
    </div>
}

let mapStateToProps = (state) => {
    return {
        login: state.auth.login,
    }
}

export default connect(mapStateToProps, {})(Auth);

