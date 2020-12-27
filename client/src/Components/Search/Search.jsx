import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'materialize-css'
import { NavLink, withRouter } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { setSearchedPage } from '../../redux/headerReduser';
import { connect } from 'react-redux';
import './Search.css'

function Search(props) {
    let [searched, setSearched] = useState(props.searchedPage);

    useEffect(() => {
        async function fetchData() {
            let riched = props.match.params.riched;
            const req = await axios.get(`http://localhost:8001/place_category/places/search_all/${riched}`);
            debugger
            props.setSearchedPage(req.data)
            console.log(req.data)
        }
        fetchData()
    }, [props.match.params.riched])

    useEffect(() => {
        setSearched(props.searchedPage)
        debugger
    }, [props.searchedPage])
debugger
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


