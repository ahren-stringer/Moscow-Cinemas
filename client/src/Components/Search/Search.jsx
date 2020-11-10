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
            const req = await axios.get(`https://apidata.mos.ru/v1/datasets/495/rows?&$filter=substringof(%27${riched}%27,Cells/CommonName)&api_key=c70b711784b712cbe482f9701909fd97`);
            props.setSearchedPage(req.data)
            console.log(req.data)
        }
        fetchData()
    }, [])

    useEffect(() => {
        setSearched(props.searchedPage)
    }, [props.searchedPage])

    if (!searched) return <Preloader />
    return (
        <div>
            <h4>Возможно вы искали:</h4>
            {
                Object.values(searched).map((item) => <div><NavLink to={`/cinema/${item.Cells.CommonName}`}>{item.Cells.CommonName}</NavLink></div>)
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


