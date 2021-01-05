import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './MainPage.css'
import s from '../Navbar/Navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { SetPopular, likedThunk } from '../../redux/navReduser';
import { connect } from 'react-redux';
import { Setliked } from '../../redux/navReduser';
import { setCounter } from '../../redux/headerReduser';

function SingleCardMin (props) {

    let settings2 = {
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
        arrows: false,
        adaptiveHeight: true
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
                const req = await axios.get('http://localhost:8001/popular/some');
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
                                                : <FontAwesomeIcon icon={faHeart} />
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    })
                }
            </Slider>
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        popular: state.navData.popular,
        liked: state.navData.liked,
    }
}

export default connect(mapStateToProps, { SetPopular, setCounter, Setliked, likedThunk })(withRouter(SingleCardMin))