import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './MainPage.css'


function MainPage(props) {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    let [categores, setCategores] = useState(null)

    useEffect(
        () => {
            async function fetchData() {
                const req = await axios.get('http://localhost:8001/place_category');
                setCategores(req.data)
                console.log(req.data)
            }
            fetchData()
        }
        , [])

    return (
        <div>
            <div className='container'>
                <div className='title'>
                    <Slider {...settings}>
                        <div>
                            <h3>Добро пожаловать на MosCulture</h3>
                            <div>
                                Сайт о местах культурного наследия России и Мира
                            </div>
                        </div>
                        <div>
                            <h3>Будьте в курсе событий</h3>
                            <div>
                                К вашему вниманию представлена актуализированная информация о культырных местах москвы
                            </div>
                        </div>
                        <div>
                            <h3>Делитесь отзывами</h3>
                            <div>
                                Здесь вы можете смотреть и оставлять отзывы
                            </div>
                        </div>
                    </Slider>
                </div>
                <div>
                    {
                        categores
                            ? categores.map(item =>
                                <div className='place__type'>
                                    <NavLink to={'/category/' + item.categoryUrl} className='place__type__link'>
                                        {item.category}
                                    </NavLink>
                                    <img src={item.img} alt=""/>
                                </div>)
                            : <Preloader />
                    }
                </div>
            </div>
        </div>
    );
}

export default MainPage;