import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Header.css'
import PreloaderList from '../Preloader/PreloaderList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchingForm = (props) => {
    let [counter, setCounter] = useState(0);
    let [searched, setSearched] = useState(props.searched);

    let searchInput = React.createRef();

    useEffect(() => {
        //if (searched.requestNumber < props.searched.requestNumber)
        setSearched(props.searched)
        console.log('searched:', searched)
    }, [props.searched])

    let onSearchChange = async () => {
        props.setReqNumber(+props.requestNumber + 1)
        let search = searchInput.current.value;
        console.log(search)
        props.SearchChange(search)
        props.toggleList(true)
        props.loadList(true)

        function request(req) {
            props.setReqNumber(+props.requestNumber + 1)
            setCounter(counter + 1)
            console.log('номер', counter)
            if (search === '') {
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
    return (<div className="searching__form inner-item">
        <div className="search">
            <input className='search__input' type="text" value={props.newSearchText}
                onChange={onSearchChange}
                ref={searchInput}
                name="s"
                placeholder="Искать здесь..."
            />
            <button className='search__btn'>
                <NavLink to={"/search/" + props.newSearchText} onClick={CloseList}>
                    <FontAwesomeIcon icon={faSearch} />
                </NavLink>
            </button>
            {props.isListLoading ? <div>!!!!!!!!!!</div>
                :
                <ul className="collection">
                    {
                        (props.isClosed && searched.request.length === 0) ? null :
                            searched.request.map((item) => {
                                return <li className="collection-item" onClick={() => { props.SearchChange('') }}>
                                    <NavLink to={`/places/${item.name}`}
                                        onClick={CloseList}>{item.name}
                                    </NavLink>
                                </li>
                            })
                    }
                    {
                        (searched.request.length === 0) ? null :
                            <li className="collection-item">
                                <NavLink to={"/search/" + props.newSearchText} onClick={CloseList}>
                                    Все результаты
                                </NavLink>
                            </li>
                    }
                </ul>
            }
        </div>
    </div>)
}

export default SearchingForm;