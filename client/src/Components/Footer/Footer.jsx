import axios from 'axios';
import React, { useState } from 'react';


const Footer = (props) => {

    let [form, setForm] = useState({
        name: '',
        message: '',
        email: ''
    });

    let onInputChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const sendEmail = async () => {
        await axios.post('http://localhost:8001/email', { ...form })
    }

    return (
        <footer className="page-footer">
            <div className="container">
                <div className="row">
                    <div className="col l6 s12">
                        <div className="row">
                            <div className="row">
                                <div className="row">
                                        <div className="input-field col s12">
                                            <input id="first_name" type="text" className="validate" name='name' onChange={onInputChange} />
                                            <label for="first_name">First Name</label>
                                        </div>
                                    <div className="input-field col s12">
                                        <input id="email" type="email" className="validate" name='email' onChange={onInputChange} />
                                        <label for="email">Email</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <textarea id="textarea1" className="materialize-textarea" name='message' onChange={onInputChange}></textarea>
                                        <label for="textarea1">Textarea</label>
                                    </div>
                                </div>
                            </div>
                            <button className='btn' onClick={sendEmail}>отправить</button>
                        </div>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className="white-text">Links</h5>
                        <ul>
                            <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                            <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                            <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                            <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container">
                    © 2014 Copyright Text
  <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
                </div>
            </div>
        </footer>

    );

}

export default Footer