import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'materialize-css'
import { withRouter } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { setPopular } from '../../redux/popularReduser';
import { connect } from 'react-redux';
import '../Search/Search.css'
import SearchList from '../Search/SearchList';

function PopularPage(props) {
    let [popular, setPopular] = useState(props.popular);

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get(`/popular`);
            props.setPopular(req.data)
        }
        fetchData()
    }, [])

    useEffect(() => {
        setPopular(props.popular)
    }, [props.popular])

    if (!popular) return <Preloader />
    return (
        <div>
            <h4>Популярные места</h4>
            <SearchList
            list={popular}/>
        </div>
    );
}
let mapStateToPros = (state) => {
    return {
        popular: state.popularData.popular,
    }
}

export default connect(mapStateToPros, { setPopular })(withRouter(PopularPage));