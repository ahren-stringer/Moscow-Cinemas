import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Header.css'
import PreloaderList from '../Preloader/PreloaderList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchingForm = (props) => {
    let [searched, setSearched] = useState(props.searched);

    let searchInput = React.createRef();

    useEffect(() => {
        //if (searched.requestNumber < props.searched.requestNumber)
        setSearched(props.searched)
    }, [props.searched])

    return (<div className="searching__form inner-item">
        <div className="search">
            <input className='search__input' type="text" value={props.newSearchText}
                onChange={()=>{props.searchThunk(searchInput.current.value, props.requestNumber)}}
                ref={searchInput}
                name="s"
                placeholder="Искать здесь..."
            />
            <button className='search__btn'>
                <NavLink to={"/search/" + props.newSearchText} onClick={() => {
                    props.CloseListThunk()
                    props.SearchChange('')
                }}>
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
                                        onClick={()=>{props.CloseListThunk()}}>{item.name}
                                    </NavLink>
                                </li>
                            })
                    }
                    {
                        (searched.request.length === 0) ? null :
                            <li className="collection-item">
                                <NavLink to={"/search/" + props.newSearchText} onClick={() => {
                                    props.CloseListThunk()
                                    props.SearchChange('')
                                }}>
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