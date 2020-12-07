import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import './Header.css'
import PreloaderList from '../Preloader/PreloaderList';

const SearchingForm = (props) => {
    let [searchedAll, setSearchedAll] = useState([]);
    let [searchedSingle, setSearchedSingle] = useState([]);
    let [requestNumber, setRequestNumber] = useState(0);
    let [counter, setCounter] = useState(0);
    let [searched, setSearched] = useState(props.searched);
    let searchInput = React.createRef();

    useEffect(() => {
        debugger
        //if (searched.requestNumber < props.searched.requestNumber)
        setSearched(props.searched)
        console.log('searched:', searched)
    }, [props.searched])

    let onSearchChange = async () => {
        debugger
        props.setReqNumber(+props.requestNumber + 1)
        let search = searchInput.current.value;
        console.log(search)
        props.SearchChange(search)
        props.toggleList(true)
        props.loadList(true)
        
        function request(req){
            //props.setReqNumber(+props.requestNumber + 1)
            setCounter(counter+1)
            console.log('номер', counter)
            if (search == '') {
                props.setSearched({ requestNumber: props.requestNumber, request: [] })
            } else {
                props.setSearched({ requestNumber: props.requestNumber, request: req.data })
            }
            debugger
            props.loadList(false)
            console.log(req.data)
        }


        axios.get(`http://localhost:8001/place_category/places/search/${search}`)
            .then(req => {
                request(req)
            })
    }
    const CloseList = () => {
        debugger
        props.setSearched({ requestNumber: 0, request: [] })
    }
    return (<div className="searching__form">
        <div className="search">
            <input type="text" value={props.newSearchText}
                onChange={onSearchChange}
                ref={searchInput}
                style={{ margin: 0, height: "2em" }} />
            {props.isListLoading ? <div>!!!!!!!!!!</div>
                : <ul className="collection">
                    {(props.isClosed && searched.length == 0) ? null :
                        searched.request.map((item, index) => {
                            return <li className="collection-item">
                                <NavLink to={`/cinemas/${item.name}`}
                                    onClick={CloseList}>{item.name}
                                </NavLink>
                            </li>
                        })
                    }
                </ul>
            }
        </div>
        <NavLink to={"/search/" + props.newSearchText} onClick={CloseList}>
            Найти
        </NavLink>
    </div>)
}

export default SearchingForm;