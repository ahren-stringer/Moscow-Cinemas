import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'materialize-css'
import { withRouter } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { setSearchedPage } from '../../redux/searchReduser';
import { connect } from 'react-redux';
import './Search.css'
import SearchList from './SearchList';
import { SearchAPI } from '../../API/api';

function Search(props) {
    let [searched, setSearched] = useState(props.searchedPage);

    useEffect(() => {
        async function fetchData() {
            let riched = props.match.params.riched;
            const req = await SearchAPI.getSearchPage(riched);
            props.setSearchedPage(req)
        }
        fetchData()
    }, [props.match.params.riched])

    useEffect(() => {
        setSearched(props.searchedPage)
    }, [props.searchedPage])

    if (!searched) return <Preloader />
    if (searched.length === 0) return <div className='searhed__nothing'>
        <h3>Ничего не найдено</h3>
    </div>
    return (
        <div>
            <h4>Возможно вы искали:</h4>
            <SearchList
            list={searched}
            searchedPage={props.searchedPage}/>
        </div>
    );
}
let mapStateToPros = (state) => {
    return {
        searchedPage: state.search.searchedPage,
    }
}

export default connect(mapStateToPros, { setSearchedPage })(withRouter(Search));


