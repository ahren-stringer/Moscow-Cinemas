import React, { useEffect, useState } from 'react';
import 'materialize-css'
import { useMessage } from '../../Hooks/message.hook';
import axios from 'axios';

import { Field, reduxForm } from 'redux-form'
import { required, aol, email, minLength6 } from '../../validators'
import { withRouter } from 'react-router-dom';

const input = ({ input, label, type, meta: { touched, error, warning } }) => {
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

    let submit = async (formData) => {
        // print the form values to the console
        console.log(formData)
        //props.loginThunk(formData.email, formData.password, formData.rememberMe)
        try {
            const data = await axios.post('http://localhost:8001/cinema/register', { ...formData })
            console.log('Зарегистрировался ',data)
            props.history.goBack()
        } catch (e) { }
    }

    return <div class="container">
        <div style={{marginLeft: "10px"}}>
            <h4>Регистрация</h4>
        </div>
        <div className="row">
            <RegisterForm onSubmit={submit}/>
        </div>
    </div>
}

export default withRouter(Register);

