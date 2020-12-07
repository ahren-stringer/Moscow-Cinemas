import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'materialize-css'
import { NavLink, withRouter } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { setSearchedPage} from '../../redux/headerReduser';
import { connect } from 'react-redux';

function Search(props) {
    let [searched, setSearched] = useState(props.searchedPage);

    useEffect(() => {
        async function fetchData() {
            let riched = props.match.params.riched;
            const req = await axios.get(`http://localhost:8001/place_category/places/search/${riched}`);
            debugger
            props.setSearchedPage(req.data)
            console.log(req.data)
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
            {
                Object.values(searched).map((item) => <div><NavLink to={`/cinemas/${item.name}`}>{item.name}</NavLink></div>)
            }
        </div>
    );
}
let mapStateToPros = (state) => {
    return {
      searchedPage: state.header.searchedPage,
    }
  }
  
export default connect(mapStateToPros, { setSearchedPage })(withRouter(Search));


