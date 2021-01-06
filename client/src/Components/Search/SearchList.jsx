import React from 'react';
import 'materialize-css'
import { NavLink, withRouter } from 'react-router-dom';
import { setSearchedPage } from '../../redux/headerReduser';
import { connect } from 'react-redux';
import './Search.css'

function SearchList(props) {

    return (
            <ul class="collection">
                {
                    props.list.map((item) => <li class="item">
                        <NavLink to={`/places/${item.name}`}>
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
    );
}
let mapStateToPros = (state) => {
    return {
        searchedPage: state.header.searchedPage,
    }
}

export default connect(mapStateToPros, { setSearchedPage })(withRouter(SearchList));