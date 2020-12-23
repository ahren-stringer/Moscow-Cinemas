import React, { useEffect, useState } from 'react';
import 'materialize-css'
import { useMessage } from '../../Hooks/message.hook';
import axios from 'axios';

import { Field, reduxForm } from 'redux-form'
import { required, aol, email, minLength6 } from '../../validators'

const input = ({ input, label, type, meta: { touched, error, warning } }) => {
    debugger
    return (<div className="row">
        <div className="input-field col s12">
            <input {...input} id={type} type={type} className="validate" />
            <label for={type}>{label}</label>
            {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>)
}

function RegisterForm(props) {
    const { handleSubmit, pristine, reset, submitting } = props

    return <form onSubmit={props.handleSubmit}>
        <Field
            name="name"
            type="text"
            component={input}
            label="First Name"
            validate={[required]}
            warn={aol}
        />
        <Field
            name="email"
            type="email"
            component={input}
            label="Email"
            validate={[required,email]}
            warn={aol}
        />
        <Field
            name="password"
            type="password"
            component={input}
            label="Password"
            validate={[required, minLength6]}
            warn={aol}
        />
        <button className='btn' type="submit" disabled={submitting}>Зарегистрироваться</button>
    </form>
}

RegisterForm = reduxForm({ form: 'register' })(RegisterForm)

function Register(props) {

    //let message=useMessage();
    // let [form, setForm] = useState({name:'', email: '', password: '' });

    // let onInputChange = (event) => {
    //     setForm({ ...form, [event.target.name]: event.target.value })
    // }

    // let registerReq = async () => {
    //     try {
    //         const data = await axios.post('http://localhost:8001/cinema/register', { ...form })
    //         console.log('Зарегистрировался ',data)
    //     } catch (e) { }
    // }

    let submit = async (formData) => {
        // print the form values to the console
        console.log(formData)
        //props.loginThunk(formData.email, formData.password, formData.rememberMe)
        try {
            const data = await axios.post('http://localhost:8001/cinema/register', { ...formData })
            console.log('Зарегистрировался ',data)
        } catch (e) { }
    }

    return <div class="container">
        <div style={{marginLeft: "10px"}}>
            <h4>Регистрация</h4>
        </div>
        <div className="row">
            <RegisterForm onSubmit={submit}/>
                {/* <div className="row">
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
                <button className='btn' onClick={registerReq}>Зарегистрироваться</button> */}
        </div>
    </div>
}

export default Register;

