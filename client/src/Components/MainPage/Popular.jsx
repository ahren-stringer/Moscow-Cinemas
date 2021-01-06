import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './MainPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { SetPopular, likedThunk } from '../../redux/navReduser';
import { connect } from 'react-redux';
import SingleCard from '../Category/SingleCard';

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
        adaptiveHeight: true
    };

    let [ls, setLs] = useState(props.liked);
    let [popular, setPopular] = useState(props.popular)

    useEffect(() => {
        setLs(props.liked)
    }, [props.liked])

    useEffect(
        async () => {
            const req = await axios.get('http://localhost:8001/popular/some');
            props.SetPopular(req.data)
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
                        <NavLink to='/popular'>
                            <h3>Популярные места</h3>
                        </NavLink>
                    </div>
                    <div className='slider__wrapper-big'>
                        <Slider {...settings1}>
                            {
                                popular.map((item, index, array) => {
                                    return <SingleCard item={item}
                                        ls={ls}
                                        match={props.match}
                                        likedThunk={props.likedThunk}
                                        key={index+1} />
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
                                            <NavLink to={`/places/${item.name}`}>
                                                <div className='place__img'
                                                    style={{ 'backgroundImage': 'url(' + item.photos.photoLarge + ')' }}>
                                                </div>
                                                <div className='place__name'>
                                                    {item.name}
                                                </div>
                                            </NavLink>
                                            <div className='place__liked'
                                                onClick={() => {
                                                    props.likedThunk(item.name, item.categoryUrl)
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

export default connect(mapStateToProps, { SetPopular, likedThunk })(withRouter(Popular))