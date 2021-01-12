import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'materialize-css'
import { withRouter } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { setSearchedPage } from '../../redux/searchReduser';
import { connect } from 'react-redux';
import './Search.css'
import SearchList from './SearchList';

function Search(props) {
    let [searched, setSearched] = useState(props.searchedPage);

    useEffect(() => {
        async function fetchData() {
            let riched = props.match.params.riched;
            const req = await axios.get(`/place_category/places/search_all/${riched}`);
            props.setSearchedPage(req.data)
        }
        fetchData()
    }, [props.match.params.riched])

    useEffect(() => {
        setSearched(props.searchedPage)
    }, [props.searchedPage])

    if (!searched) return <Preloader />
    return (
        <div>
            <h4>Возможно вы искали:</h4>
            <SearchList
            list={searched}/>
        </div>
    );
}
let mapStateToPros = (state) => {
    return {
        searchedPage: state.search.searchedPage,
    }
}

export default connect(mapStateToPros, { setSearchedPage })(withRouter(Search));


