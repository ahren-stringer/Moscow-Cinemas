import React from 'react';
import 'materialize-css'
import { NavLink, withRouter } from 'react-router-dom';
import { setSearchedPage } from '../../redux/searchReduser';
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
                            <div class="list__img" style={(item.photos.photoLarge && item.photos.photoLarge !== '') ?
                                { 'backgroundImage': 'url(' + item.photos.photoLarge + ')' }
                                : (item.placeCategory === 'Театры') ?
                                    { 'backgroundImage': 'url(https://avatars.mds.yandex.net/get-zen_doc/964926/pub_5e95cfdebe5bae634e20a1e3_5e95dac81fba7924e8001525/scale_1200)' }
                                    : (item.placeCategory === 'Галереи') ?
                                        { 'backgroundImage': 'url(https://ru.moscovery.com/wp-content/uploads/2016/03/header-92.jpg)' }
                                        : { 'backgroundImage': 'url(https://felicina.ru/wp-content/uploads/2018/05/main2-1.jpg)' }
                            }>
                            </div>
                        </div>
                    </NavLink>
                </li>)
            }
        </ul>
    );
}
let mapStateToPros = (state) => {
    return {
        searchedPage: state.search.searchedPage,
    }
}

export default connect(mapStateToPros, { setSearchedPage })(withRouter(SearchList));