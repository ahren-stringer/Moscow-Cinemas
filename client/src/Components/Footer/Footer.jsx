import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { required, aol, email} from '../../validators'
import {MailAPI} from '../../API/api'

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

const textarea = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (<div className="row">
        <div className="input-field col s12">
            <textarea {...input} id={type} type={type} className="materialize-textarea" />
            <label for={type}>{label}</label>
            {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>)
}

function MailForm(props) {
    const {submitting } = props

    return <form onSubmit={props.handleSubmit}>
        <Field
            name="name"
            type="text"
            component={input}
            label="Имя"
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
            name="message"
            type="text"
            component={textarea}
            label="Сообщение"
            validate={[required]}
            warn={aol}
        />
        <button className='btn' type="submit" disabled={submitting}>отправить</button>
    </form>
}

MailForm = reduxForm({ form: 'mailForm' })(MailForm)


const Footer = () => {

    let submit = async (formData) => {
        try {
            await MailAPI.sendMail(formData)
        } catch (e) { }
    }

    return (
        <footer className="page-footer" style={{'background-color': "#2980b9"}}>
            <div className="__container">
<div style={{'height':'500px'}}></div>
                    {/* <div style={{maxWidth:'400px'}}>
                    <h5 className="white-text">Обратная связь</h5>
                        <MailForm onSubmit={submit}/>

                    </div> */}
                    </div>

            <div className="footer-copyright">               
            </div>
        </footer>

    );

}

export default Footer