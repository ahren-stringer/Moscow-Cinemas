import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import './Header.css'

const SearchingForm = (props) => {
    let [searched, setSearched] = useState(props.searched);
    let searchInput = React.createRef();

    useEffect(() => {
        setSearched(props.searched)
        console.log('searched:', searched)
    }, [props.searched])

    let onSearchChange = async () => {
        let search = searchInput.current.value;
        props.SearchChange(search)
        if (search != '') {
            const req = await axios.get(`https://apidata.mos.ru/v1/datasets/495/rows?&$filter=substringof(%27${search}%27,Cells/CommonName)&api_key=c70b711784b712cbe482f9701909fd97`);
            props.setSearched(req.data)
            console.log(req.data)
        } else {
            props.setSearched([])
        }
    }
    debugger
    return (<div className="searching__form">
        <div className="search">
            <input type="text" value={props.newSearchText} onChange={onSearchChange} ref={searchInput} />
            <ul>
            {searched.length == 0 ? null :
                searched.map((item) => {
                    return <li><NavLink to={`/cinema/${item.Cells.CommonName}`}>{item.Cells.CommonName}</NavLink></li>
                })
            }
            </ul>
        </div>
        <NavLink to={"/search/" + props.newSearchText}>
            Найти
        </NavLink>
    </div>)
}

export default SearchingForm;