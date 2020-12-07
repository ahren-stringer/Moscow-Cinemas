import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';


function MainPage(props) {

    let [categores, setCategores] = useState(null)

    useEffect(
        () => {
            async function fetchData() {
                const req = await axios.get('http://localhost:8001/place_category');
                setCategores(req.data)
                console.log(req.data)
            }
            fetchData()
        }
        , [])

    return (
        <div>
            {
                categores
                    ? categores.map(item =>
                        <div classNmae='place__type'>
                            <NavLink to={'/' + item.categoryUrl} className='place__type__link'>
                                {item.category}
                            </NavLink>
                        </div>)
                    : <Preloader />
            }
        </div>
    );
}

export default MainPage;