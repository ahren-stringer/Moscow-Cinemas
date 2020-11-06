import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Header.css'

const SearchingForm = (props) => {
    let searchInput = React.createRef();

    let onSearchChange = () => {
        props.SearchChange(searchInput.current.value)
    }

    return (<div className="searching__form">
        <div className="search">
            <input type="text" value={props.newSearchText} onChange={onSearchChange} ref={searchInput} />
        </div>
        <NavLink to={"/cinema/" + props.names.indexOf(props.newSearchText)}>
            Найти
           </NavLink>
    </div>)
}

export default SearchingForm;