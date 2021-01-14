import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'
import PreloaderList from '../Preloader/PreloaderList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchingForm = (props) => {
    let [searched, setSearched] = useState(props.searched);

    let searchInput = React.createRef();

    useEffect(() => {
        if (searched.requestNumber < props.searched.requestNumber || props.searched.requestNumber === 0)
            setSearched(props.searched)
    }, [props.searched])

    return (<div className="searching__form inner-item">
        <div className="search">
            <input className='search__input' type="text" value={props.newSearchText}
                onChange={() => { props.searchThunk(searchInput.current.value, props.requestNumber) }}
                ref={searchInput}
                name="s"
                placeholder="Искать здесь..."
            />
            <button className='search__btn'>
                {props.newSearchText !== ''
                    ? <NavLink to={"/search/" + props.newSearchText} onClick={() => {
                        props.CloseListThunk()
                        props.SearchChange('')
                    }}>
                        <FontAwesomeIcon icon={faSearch} />
                    </NavLink>
                    : <FontAwesomeIcon icon={faSearch} />}
            </button>
            {props.isListLoading ? <div className='preloader'>
                <PreloaderList />
            </div>
                :
                <ul className="collection">
                    {
                        (props.isClosed && searched.request.length === 0) ? null :
                            searched.request.map((item) => {
                                return <NavLink to={`/places/${item.name}`}
                                className="collection-item"
                                onClick={() => {
                                    props.SearchChange('')
                                    props.CloseListThunk()
                                }}>
                                        {item.name}
                                </NavLink>
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