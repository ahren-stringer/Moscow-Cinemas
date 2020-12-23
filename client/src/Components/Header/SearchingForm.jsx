import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import './Header.css'
import PreloaderList from '../Preloader/PreloaderList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchingForm = (props) => {
    let [searchedAll, setSearchedAll] = useState([]);
    let [searchedSingle, setSearchedSingle] = useState([]);
    let [requestNumber, setRequestNumber] = useState(0);
    let [counter, setCounter] = useState(0);
    let [searched, setSearched] = useState(
        {
            request: [
                {
                    name: "Государственный музей имени Пушкина",
                    address: "г. Москва, улица Нелидовская, д. 10, стр. 1",
                    photos: {
                        photoLarge: "https://www.mobrep.ru/b/c/28427.jpg",
                        photosSlider: ["https://b1.m24.ru/c/1321540.580xp.jpg",
                            "https://www.mos.ru/upload/newsfeed/newsfeed/salut-sl2.jpg",
                            "https://www.osd.ru/photos/txt/3153_txt_0081.jpg"]
                    },
                }
            ]
        },
        //props.searched
    );


    for (let i = 0; i < 8; i++) {
        searched.request.push(searched.request[0])
    }

    let searchInput = React.createRef();

    // useEffect(() => {
    //     //if (searched.requestNumber < props.searched.requestNumber)
    //     setSearched(props.searched)
    //     console.log('searched:', searched)
    // }, [props.searched])

    let onSearchChange = async () => {
        props.setReqNumber(+props.requestNumber + 1)
        let search = searchInput.current.value;
        console.log(search)
        props.SearchChange(search)
        props.toggleList(true)
        props.loadList(true)

        function request(req) {
            //props.setReqNumber(+props.requestNumber + 1)
            setCounter(counter + 1)
            console.log('номер', counter)
            if (search == '') {
                props.setSearched({ requestNumber: props.requestNumber, request: [] })
            } else {
                props.setSearched({ requestNumber: props.requestNumber, request: req.data })
            }
            // props.loadList(false)
            console.log(req.data)
        }

        axios.get(`http://localhost:8001/place_category/places/search/${search}`)
            .then(req => {
                request(req)
            })

        props.loadList(false)
    }
    const CloseList = () => {
        props.setSearched({ requestNumber: 0, request: [] })
    }
    return (<div className="searching__form">
        <div className="search">
            <input className='search__input' type="text" value={props.newSearchText}
                onChange={onSearchChange}
                ref={searchInput}
                style={{
                    margin: 0,
                    background: '#E0EFCA',
                    width: '100%',
                    height: '42px',
                    paddingLeft: '10px',
                    border: '2px solid #7BA7AB',
                    borderRadius: '5px',
                    outline: 'none',
                    background: '#F9F0DA',
                    color: '#9E9C9C',
                    boxSizing: 'inherit'
                }}
                name="s"
                placeholder="Искать здесь..."
            />
            <button className='search__btn'>
                <NavLink to={"/search/" + props.newSearchText} onClick={CloseList}>
                    <FontAwesomeIcon icon={faSearch} />
                </NavLink>
            </button>
            {/* {props.isListLoading ? <div>!!!!!!!!!!</div>
                :  */}
            {/* <ul className="collection">
                {
                    // (props.isClosed && searched.length == 0) ? null :
                    searched.request.map((item) => {
                        return <li className="collection-item">
                            <NavLink to={`/cinemas/${item.name}`}
                                onClick={CloseList}>{item.name}
                            </NavLink>
                        </li>
                    })
                }
            </ul> */}
            {/* } */}
        </div>
    </div>)
}

export default SearchingForm;