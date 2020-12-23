import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'materialize-css'
import { NavLink, withRouter } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { setSearchedPage } from '../../redux/headerReduser';
import { connect } from 'react-redux';
import './Search.css'

function Search(props) {
    let [searched, setSearched] = useState([
        {
            name: "Государственный музей имени Пушкина",
            address: "г. Москва, улица Нелидовская, д. 10, стр. 1",
            photos: {
                photoLarge: "https://www.mobrep.ru/b/c/28427.jpg",
                photosSlider: ["https://b1.m24.ru/c/1321540.580xp.jpg",
                    "https://www.mos.ru/upload/newsfeed/newsfeed/salut-sl2.jpg",
                    "https://www.osd.ru/photos/txt/3153_txt_0081.jpg"]
            },
        },
        {
            name: "Государственный музей имени Пушкина",
            address: "г. Москва, улица Нелидовская, д. 10, стр. 1",
            photos: {
                photoLarge: "https://www.mobrep.ru/b/c/28427.jpg",
                photosSlider: ["https://b1.m24.ru/c/1321540.580xp.jpg",
                    "https://www.mos.ru/upload/newsfeed/newsfeed/salut-sl2.jpg",
                    "https://www.osd.ru/photos/txt/3153_txt_0081.jpg"]
            },
        },
        {
            name: "Государственный музей имени Пушкина",
            address: "г. Москва, улица Нелидовская, д. 10, стр. 1",
            photos: {
                photoLarge: "https://www.mobrep.ru/b/c/28427.jpg",
                photosSlider: ["https://b1.m24.ru/c/1321540.580xp.jpg",
                    "https://www.mos.ru/upload/newsfeed/newsfeed/salut-sl2.jpg",
                    "https://www.osd.ru/photos/txt/3153_txt_0081.jpg"]
            },
        },
        {
            name: "Государственный музей имени Пушкина",
            address: "г. Москва, улица Нелидовская, д. 10, стр. 1",
            photos: {
                photoLarge: "https://www.mobrep.ru/b/c/28427.jpg",
                photosSlider: ["https://b1.m24.ru/c/1321540.580xp.jpg",
                    "https://www.mos.ru/upload/newsfeed/newsfeed/salut-sl2.jpg",
                    "https://www.osd.ru/photos/txt/3153_txt_0081.jpg"]
            },
        },
        {
            name: "Государственный музей имени Пушкина",
            address: "г. Москва, улица Нелидовская, д. 10, стр. 1",
            photos: {
                photoLarge: "https://www.mobrep.ru/b/c/28427.jpg",
                photosSlider: ["https://b1.m24.ru/c/1321540.580xp.jpg",
                    "https://www.mos.ru/upload/newsfeed/newsfeed/salut-sl2.jpg",
                    "https://www.osd.ru/photos/txt/3153_txt_0081.jpg"]
            },
        },
        {
            name: "Государственный музей имени Пушкина",
            address: "г. Москва, улица Нелидовская, д. 10, стр. 1",
            photos: {
                photoLarge: "https://www.mobrep.ru/b/c/28427.jpg",
                photosSlider: ["https://b1.m24.ru/c/1321540.580xp.jpg",
                    "https://www.mos.ru/upload/newsfeed/newsfeed/salut-sl2.jpg",
                    "https://www.osd.ru/photos/txt/3153_txt_0081.jpg"]
            },
        },
        {
            name: "Государственный музей имени Пушкина",
            address: "г. Москва, улица Нелидовская, д. 10, стр. 1",
            photos: {
                photoLarge: "https://www.mobrep.ru/b/c/28427.jpg",
                photosSlider: ["https://b1.m24.ru/c/1321540.580xp.jpg",
                    "https://www.mos.ru/upload/newsfeed/newsfeed/salut-sl2.jpg",
                    "https://www.osd.ru/photos/txt/3153_txt_0081.jpg"]
            },
        },]
        //props.searchedPage
    );

    // useEffect(() => {
    //     async function fetchData() {
    //         let riched = props.match.params.riched;
    //         const req = await axios.get(`http://localhost:8001/place_category/places/search/${riched}`);
    //         debugger
    //         props.setSearchedPage(req.data)
    //         console.log(req.data)
    //     }
    //     fetchData()
    // }, [props.match.params.riched])

    // useEffect(() => {
    //     setSearched(props.searchedPage)
    // }, [props.searchedPage])

    if (!searched) return <Preloader />
    return (
        <div>
            <h4>Возможно вы искали:</h4>
            <ul class="collection">
                {
                    searched.map((item) => <li class="item">
                        <NavLink to={`/cinemas/${item.name}`}>
                        <div className='list__container'>
                            <div className='list__info'>
                                <div className='list__name'>
                                    {item.name}
                                </div>
                                <div className='list__address'>
                                    {item.address}
                                </div>
                            </div>                          
                            <img src={item.photos.photoLarge} class="list__img"></img>                            
                        </div>
                        </NavLink>
                    </li>)
                }
            </ul>
        </div>
    );
}
let mapStateToPros = (state) => {
    return {
        searchedPage: state.header.searchedPage,
    }
}

export default connect(mapStateToPros, { setSearchedPage })(withRouter(Search));


