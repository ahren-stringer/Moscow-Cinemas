import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import s from './Info.module.css'
import user from '../../img/user.png'
import axios from 'axios';
import Pagination from './Pagination';

const Coments = (props) => {
    let [disabled, setDisabled] = useState(true)
    let arr = [1, 2, 3, 4, 5];
    let [coments, setComents] = useState([
        { date: String(new Date()), name: 'alex', email: "1@mail.ru", size: 3, coment: 'Орел и решка, это так, для всех... Общепит.... У Птушкина же, ручная работа. Это, можно сказать, Бентли среди одиночных путешествий.... Это, натуральная кожа и ручная сборка....', place: 'Государственный музей имени Пушкина' },
        { date: String(new Date()), name: 'alex', email: "1@mail.ru", size: 3, coment: 'Орел и решка, это так, для всех... Общепит.... У Птушкина же, ручная работа. Это, можно сказать, Бентли среди одиночных путешествий.... Это, натуральная кожа и ручная сборка....', place: 'Государственный музей имени Пушкина' },
        { date: String(new Date()), name: 'alex', email: "1@mail.ru", size: 3, coment: 'Орел и решка, это так, для всех... Общепит.... У Птушкина же, ручная работа. Это, можно сказать, Бентли среди одиночных путешествий.... Это, натуральная кожа и ручная сборка....', place: 'Государственный музей имени Пушкина' }
    ]);
    let [form, setForm] = useState({
        size: 0,
        coment: '',
        place: props.infoData[0].name,
        token: props.token
    });

    let onInputChange = (event) => {


        if (event.target.value != '') {
            setDisabled(false)
        } else {
            setDisabled(true)
        }

        setForm({ ...form, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        async function fetchData() {
            debugger
            const req = await axios.get('http://localhost:8001/cinema/coments', {
                headers: {
                    "Authorization": ('Bearer ' + props.token)
                }
            });
            setComents(req.data)
            console.log(req.data)
        }
        fetchData()
    }, [])

    const sendComent = async () => {
        await axios.post('http://localhost:8001/coment', { ...form }, {
            headers: {
                "Authorization": ('Bearer ' + props.token)
            }
        })
        const req = await axios.get('http://localhost:8001/cinema/coments', {
            headers: {
                "Authorization": ('Bearer ' + props.token)
            }
        });
        setComents(req.data)
    }

    let onColorChange = (item) => {
        if (item == 0) {
            item = 'без оценки'
        } else {
            for (let i = 1; i <= 5; i++) {
                let id = i + "s";
                document.getElementById(id).style.color = 'black'
            }
            for (let i = 1; i <= item; i++) {
                let id = i + "s";
                document.getElementById(id).style.color = 'red'
            }
        }
        setForm({ ...form, size: item })
    }
    return (
        <div>
            <div className={s.coment__form}>
                <h4 className={s.title}>Оставить отзыв</h4>
                {/* {!props.token? */}
                {/* <div>
                    Чтобы оставить коментарий, вам нужно авторизироваться
                </div>
                : */}
                <div className="row">
                    <div className="row">

                        <div className="input-field col s12">
                            <textarea id="textarea1" className="materialize-textarea" name='coment' onChange={onInputChange}></textarea>
                            <label for="textarea1">Textarea</label>
                        </div>

                    </div>
                    <div className={s.coment__otcenka}> <span className={s.coment__size}>Оценка:</span>   {arr.map((item, index, array) => {
                        return (
                            <FontAwesomeIcon icon={faStar} id={item + 's'} onClick={() => { onColorChange(item) }} />
                        )
                    })
                    }
                    </div>
                    <button className='btn'
                        onClick={sendComent}
                        disabled={disabled}
                        style={{ margin: '0 .75rem' }}>отправить</button>
                </div>
                {/* } */}
            </div>
            <h4 className={s.title}>Коментарии</h4>
            <div className={s.coment__wrapper}>
                <ul >
                    {coments.map((item) => {
                        if (item.place == props.infoData[0].name) return <li className={s.coment}>
                            <img src={user} className={s.coment__ava} />
                            <div className={s.coment__container}>
                                <div className={s.coment__name}>{item.name}</div>
                                <div>{item.email}</div>
                                <div>Оценка: {
                                    arr.map((star, index, array) => {
                                        if (index < item.size) return <FontAwesomeIcon icon={faStar} style={{ color: 'red' }} />
                                    })
                                } </div>
                                <div className={s.coment__coment}>{item.coment} </div>
                                <div className={s.coment__date}>{item.date} </div>
                            </div>
                        </li>
                    })}
                </ul>
                <Pagination SetTotalCount={props.SetTotalCount}
                    SetPageCount={props.SetPageCount}
                    totalCount={props.totalCount}
                    numberOfPage={props.numberOfPage}
                    onOnePage={props.onOnePage} />
            </div>
        </div>
    );

}

export default Coments