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
import { Setliked } from '../../redux/navReduser';
import { setCounter } from '../../redux/headerReduser';

function Popular(props) {

    let settings1 = {
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true
    };
    let settings2 = {
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
        arrows: false,
    };

    let [ls, setLs] = useState(props.liked);
    let [popular, setPopular] = useState(props.popular)

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
    useEffect(
        () => {
            async function fetchData() {
                const req = await axios.get('http://localhost:8001/popular');
                props.SetPopular(req.data)
                console.log(req.data)
            }
            fetchData()
        }
        , [])
    useEffect(() => {
        setPopular(props.popular)
    }, [props.popular])

    return (
        <div>
            {popular ?
                <div>
                    <div>
                        <h3>Популярные места</h3>
                    </div>
                    <div className='slider__wrapper-big'>
                        <Slider {...settings1}>
                            {
                                //props.popular
                                popular.map((item, index, array) => {

                                    return <div className='place'>
                                        <div className='place__wrapper'>
                                            <NavLink to={`/cinemas/${item.name}`}>
                                                <div className='place__img'
                                                    style={{ 'backgroundImage': 'url(' + item.photos.photoLarge + ')' }}>
                                                </div>
                                                <div className='place__name'>
                                                    {item.name}
                                                </div>
                                            </NavLink>
                                            <div className='place__liked'
                                                onClick={() => {
                                                    Liked(item.name, item.categoryUrl)
                                                }}>
                                                <div className='place__liked-big'>
                                                    <span className='place__liked-text'>
                                                        Добавить в избранное
                                                    </span>
                                                    {
                                                        !!ls[item.name] && <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
                                                    }
                                                </div>
                                                <div className='place__liked-small'>
                                                    {
                                                        ls[item.name] ? <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
                                                        :<FontAwesomeIcon icon={faHeart} />
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </Slider>
                    </div>
                    <div className='slider__wrapper-small'>
                        <Slider {...settings2}>
                            {
                                props.popular.map((item, index, array) => {

                                    return <div className='place'>
                                        <div className='place__wrapper'>
                                            <NavLink to={`/cinemas/${item.name}`}>
                                                <div className='place__img'
                                                    style={{ 'backgroundImage': 'url(' + item.photos.photoLarge + ')' }}>
                                                </div>
                                                <div className='place__name'>
                                                    {item.name}
                                                </div>
                                            </NavLink>
                                            <div className='place__liked'
                                                onClick={() => {
                                                    Liked(item.name, item.categoryUrl)
                                                }}>
                                                <div className='place__liked-big'>
                                                    <span className='place__liked-text'>
                                                        Добавить в избранное
                                                    </span>
                                                    {
                                                        !!ls[item.name] && <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
                                                    }
                                                </div>
                                                <div className='place__liked-small'>
                                                    {
                                                        ls[item.name] ? <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
                                                        :<FontAwesomeIcon icon={faHeart} />
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </Slider>
                    </div>
                </div>
                : <Preloader />
            }
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        popular: state.navData.popular,
        liked: state.navData.liked,
    }
}

export default connect(mapStateToProps, { SetPopular, setCounter, Setliked })(Popular)