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
        autoplay:true,
        autoplaySpeed: 5000
    };

    let [categores, setCategores] = useState([
        {
            category: "Кинотеатры",
            categoryUrl: "cinemas",
            img: "https://www.mobrep.ru/b/c/28427.jpg"
        },
        {
            category: "Театры",
            categoryUrl: "theatres",
            img: "https://blog.edinoepole.ru/wp-content/uploads/2016/08/km091.jpg"
        },
        {
            category: "Галереи",
            categoryUrl: "galleries",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU0kPJr1Y_Uo5Dx4zhW-OrIq91A1hz9Xjy4A&usqp=CAU"
        },
        {
            category: "Музеи",
            categoryUrl: "museums",
            img: 'https://www.nlb.by/upload/iblock/c4c/296a2067.jpg'
        }
    ])

    // useEffect(
    //     () => {
    //         async function fetchData() {
    //             const req = await axios.get('http://localhost:8001/place_category');
    //             setCategores(req.data)
    //             console.log(req.data)
    //         }
    //         fetchData()
    //     }
    //     , [])

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