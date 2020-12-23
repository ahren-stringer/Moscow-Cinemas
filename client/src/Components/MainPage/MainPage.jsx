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
        slidesToScroll: 1,
        arrows: false,
        // autoplay:true,
        // autoplaySpeed: 5000
    };

    let [categores, setCategores] = useState([])

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
            <div className='title'>
                <Slider {...settings}>
                    <div style={{ position: 'static' }}>
                        <div className='title__slide-1' style={{ position: 'relative' }}>
                        <div className='title__slide-container-2'
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginRight: '-50%',
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                            <h3>Добро пожаловать на MosCulture</h3>
                            <div>
                                Сайт о местах культурного наследия России и Мира
                            </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: 'static' }}>
                        <div className='title__slide-2' style={{ position: 'relative' }}>
                            <div className='title__slide-container-2'
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginRight: '-50%',
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                <h3>Будьте в курсе событий</h3>
                                <div>
                                    К вашему вниманию представлена актуализированная информация о культырных местах москвы
                            </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ position: 'static' }}>
                        <div className='title__slide-3' style={{ position: 'relative' }}>
                            <div className='title__slide-container-3'
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginRight: '-50%',
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                <h3>Делитесь отзывами</h3>
                                <div>
                                    Здесь вы можете смотреть и оставлять отзывы
                            </div>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
            <div className='__container'>
                <div className='place__type-wrapper'>
                    {
                        categores
                            ? categores.map(item =>
                                <div className='place__type'>
                                    <NavLink to={'/category/' + item.categoryUrl} className='place__type__link'>

                                        <div style={{
                                            'backgroundImage': 'url(' + item.img + ')',
                                            'maxWidth': ' 1720px',
                                            'minHeight': '310px',
                                            'width': '100%',
                                            'backgroundSize': 'cover',
                                            'backgroundPosition': 'center center',
                                            'position': 'relative',
                                            'borderRadius': '4px'
                                        }}
                                            classNmae='plase__type-card'>
                                            <span className='plase__type-title'>
                                                {item.category}
                                            </span>
                                        </div>

                                    </NavLink>
                                </div>)
                            : <Preloader />
                    }

                </div>
            </div>
        </div>
    );
}

export default MainPage;