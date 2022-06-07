import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import s from './Info.module.css'
import user from '../../img/user.png'
import axios from 'axios';
import Pagination from './Pagination';
import { InfoAPI } from '../../API/api';

const Coments = (props) => {
    let [coments, setComents] = useState(props.coments)
    let [disabled, setDisabled] = useState(true)
    let arr = [1, 2, 3, 4, 5];

    let [form, setForm] = useState({
        size: 0,
        coment: '',
        place: props.infoData[0].name,
        token: props.token
        //userId:JSON.parse(localStorage.getItem('userData')).userId
    });

    let onInputChange = (event) => {
        if (event.target.value != '') {
            setDisabled(false)
        } else {
            setDisabled(true)
        }

        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const sendComent = async () => {
        await InfoAPI.sendComent(form,props.token)
        const req = await InfoAPI.getComent(props.infoData[0].name,props.token)
        let arr = [...coments]
        arr.push(req)
        setComents(arr)
    }

    useEffect(() => {
        setComents(props.coments)
    }, [props.coments])

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
                <h4 className={s.title}>Оставить отзыв</h4>
                {!props.token ?
                    <div>
                        Чтобы оставить коментарий, вам нужно авторизироваться
                </div>
                    :
                    <div className="row">
                        <div className="row">

                            <div className="input-field col s12">
                                <textarea id="textarea1" className="materialize-textarea" name='coment' onChange={onInputChange}></textarea>
                                <label for="textarea1">Коментарий</label>
                            </div>

                        </div>
                        <div className={s.coment__otcenka}> <span className={s.coment__size}>Оценка:</span>
                        {arr.map(item => {
                            return <FontAwesomeIcon icon={faStar} id={item + 's'} onClick={() => { onColorChange(item) }} />
                        })
                        }
                        </div>
                        <button className='btn'
                            onClick={sendComent}
                            disabled={disabled}
                            style={{ margin: '0 .75rem' }}>отправить</button>
                    </div>
                }
            </div>
            <h4 className={s.title}>Коментарии</h4>
            {coments.length === 0 ? <div className={s.no_coments}>
                        Здесь пока нет коментариев
                    </div>
                : <div className={s.coment__wrapper}>
                    <ul >
                        {coments.map((item) => {
                            if (item.place == props.infoData[0].name) return <li className={s.coment}>
                                <img src={user} className={s.coment__ava} />
                                <div className={s.coment__container}>
                                    <div className={s.coment__name}>{item.name}</div>
                                    <div>{item.email}</div>
                                    {item.size===0? <div>Без оценки</div>:
                                    <div>Оценка:{
                                        arr.map((star, index, array) => {
                                            if (index < item.size) return <FontAwesomeIcon icon={faStar} style={{ color: 'red' }} />
                                        })
                                    }
                                    </div>}
                                    <div className={s.coment__coment}>{item.coment} </div>
                                    <div className={s.coment__date}>{item.date
                                    .replace( /-/g, "." )
                                    .match(/[\d\.]+/)
                                    .join('')
                                    //.replace( /(\d+)(\d+)(\d+)/, '$1', '$3' )
                                    } </div>
                                </div>
                            </li>
                        })}
                    </ul>
                    {
                        props.totalCount < props.onOnePage ? null : <Pagination SetTotalCount={props.SetTotalCount}
                            SetPageCount={props.SetPageCount}
                            totalCount={props.totalCount}
                            numberOfPage={props.numberOfPage}
                            onOnePage={props.onOnePage}
                            onPageChange={props.onPageChange}
                            infoData={props.infoData} />}
                </div>}
        </div>
    );

}

export default Coments