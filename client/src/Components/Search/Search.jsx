import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'materialize-css'
import { NavLink, withRouter } from 'react-router-dom';

function Search(props) {
    let [searched, setSearched] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let riched = this.props.match.params.riched;
            const req = await axios.get(`https://apidata.mos.ru/v1/datasets/495/rows?&$filter=substringof(%27${riched}%27,Cells/CommonName)&api_key=c70b711784b712cbe482f9701909fd97`);
            setSearched(req.data)
            console.log(req.data)
        }
        fetchData()
    }, [])
  return (
    <div>
        {
            searched.map((item)=> <div><NavLink to={`/cinema/${item.Cells.CommonName}`}>{item.Cells.CommonName}</NavLink></div>)
        }
    </div>
  );
}

export default withRouter(Search);

