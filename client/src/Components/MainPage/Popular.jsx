import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './MainPage.css'
import s from '../Navbar/Navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { SetPopular } from '../../redux/navReduser';
import { connect } from 'react-redux';

function Popular(props) {

    var settings = {
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true
    };

    let [ls, setLs] = useState(props.liked);
    let [popular, setPopular] = useState([
        {
            popular: 10,
            phones: ["(499) 125-04-48", "(499) 125-01-35"],
            coordinates: [37.571298748323, 55.682806921335],
            name: "Государственный музей имени Пушкина",
            address: "г. Москва, улица Нелидовская, д. 10, стр. 1",
            email: "salut-cinema@mail.ru",
            workHours:
                [{
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                },
                {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                },
            ],
            numberOfHalls: 2,
            webSite: "salut-cinema.ru",
            photos: {
                photoLarge: "https://www.mobrep.ru/b/c/28427.jpg",
                photosSlider: ["https://b1.m24.ru/c/1321540.580xp.jpg",
                    "https://www.mos.ru/upload/newsfeed/newsfeed/salut-sl2.jpg",
                    "https://www.osd.ru/photos/txt/3153_txt_0081.jpg"]
            },
            placeCategory: "Кинотеатры",
            categoryUrl: "cinemas"
        },
        {
            popular: 9,
            phones: ["(499) 125-04-48", "(499) 125-01-35"],
            coordinates: [37.571298748323, 55.682806921335],
            name: "Государственный музей имени Пушкина",
            address: "г. Москва, улица Нелидовская, д. 10, стр. 1",
            email: "salut-cinema@mail.ru",
            workHours:
                [{
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                },
                {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                },
            ],
            numberOfHalls: 2,
            webSite: "salut-cinema.ru",
            photos: {
                photoLarge: "https://pushkinmuseum.art/museum/22_img_pc.jpg",
                photosSlider: ["https://b1.m24.ru/c/1321540.580xp.jpg",
                    "https://www.mos.ru/upload/newsfeed/newsfeed/salut-sl2.jpg",
                    "https://www.osd.ru/photos/txt/3153_txt_0081.jpg"]
            },
            placeCategory: "Кинотеатры",
            categoryUrl: "cinemas"
        },
        {
            popular: 8,
            phones: ["(499) 125-04-48", "(499) 125-01-35"],
            coordinates: [37.571298748323, 55.682806921335],
            name: "Государственный музей имени Пушкина",
            address: "г. Москва, улица Нелидовская, д. 10, стр. 1",
            email: "salut-cinema@mail.ru",
            workHours:
                [{
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                },
                {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                },
            ],
            numberOfHalls: 2,
            webSite: "salut-cinema.ru",
            photos: {
                photoLarge: "https://www.mobrep.ru/b/c/28427.jpg",
                photosSlider: ["https://b1.m24.ru/c/1321540.580xp.jpg",
                    "https://www.mos.ru/upload/newsfeed/newsfeed/salut-sl2.jpg",
                    "https://www.osd.ru/photos/txt/3153_txt_0081.jpg"]
            },
            placeCategory: "Кинотеатры",
            categoryUrl: "cinemas"
        },
        {
            popular: 7,
            phones: ["(499) 125-04-48", "(499) 125-01-35"],
            coordinates: [37.571298748323, 55.682806921335],
            name: "Государственный музей имени Пушкина",
            address: "г. Москва, улица Нелидовская, д. 10, стр. 1",
            email: "salut-cinema@mail.ru",
            workHours:
                [{
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                },
                {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                }, {
                    DayWeek: "понедельник",
                    WorkHours: "10:00-23:00"
                },
            ],
            numberOfHalls: 2,
            webSite: "salut-cinema.ru",
            photos: {
                photoLarge: "https://pushkinmuseum.art/museum/22_img_pc.jpg",
                photosSlider: ["https://b1.m24.ru/c/1321540.580xp.jpg",
                    "https://www.mos.ru/upload/newsfeed/newsfeed/salut-sl2.jpg",
                    "https://www.osd.ru/photos/txt/3153_txt_0081.jpg"]
            },
            placeCategory: "Кинотеатры",
            categoryUrl: "cinemas"
        },
    ]
        //props.popular
        )

    useEffect(() => {
        setLs(props.liked)
    }, [props.liked])

    const Liked = (name, categoryUrl) => {
        let counter = +localStorage.getItem('count');
        if (localStorage.getItem(name)) {
            localStorage.removeItem(name)
            counter = counter - 1
            localStorage.setItem('count', counter)
            props.Setliked({ ...localStorage })
        } else {
            localStorage.setItem(name, categoryUrl)
            counter = counter + 1
            localStorage.setItem('count', counter)
            props.Setliked({ ...localStorage })
        }
        props.setCounter(counter)
        console.log(localStorage)
    }
    // useEffect(
    //     () => {
    //         async function fetchData() {
    //             const req = await axios.get('http://localhost:8001/popular');
    //             props.SetPopular(req.data)
    //             console.log(req.data)
    //         }
    //         fetchData()
    //     }
    //     , [])
    // useEffect(() => {
    //     setPopular(props.popular)
    // }, [props.popular])

    return (
        <div>
            {popular? 
            <div>
            <div>
                <h3>Популярные места</h3>
            </div>
            <div className='slider__wrapper'>
                <Slider {...settings}>
                    {
                        //props.popular
                        popular.map((item, index, array) => {

                            return <div className='place'>
                                <div className='place__wrapper'>
                                    <NavLink to={`/cinemas/${item.name}`}>
                                        <div style={{
                                            'backgroundImage': 'url(' + item.photos.photoLarge + ')',
                                            'minHeight': '185px',
                                            'width': '100%',
                                            'backgroundSize': 'cover',
                                            'backgroundPosition': 'center center',
                                        }}>
                                        </div>
                                        <div className='place__name'>
                                            {item.name}
                                        </div>
                                    </NavLink>
                                    <div className='place__liked'
                                        onClick={() => {
                                            Liked(item.name, item.categoryUrl)
                                        }}>
                                        Добавить в избранное {
                                            !!ls[item.name] && <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
                                        }
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </Slider>
            </div>
            </div>
        : <Preloader/>    
        }
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        popular:state.navData.popular,
        liked: state.navData.liked,
    }
}

export default connect(mapStateToProps, {SetPopular})(Popular)