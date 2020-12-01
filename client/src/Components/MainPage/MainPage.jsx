import React from 'react';
import { NavLink } from 'react-router-dom';


function MainPage(props) {

    return (
        <div>
            <div classNmae='place__type'>
                <NavLink className='place__type__link'>
                    Кинотеатры
                </NavLink>
            </div>
            <div classNmae='place__type'>
                <NavLink className='place__type__link'>
                    Театры
                </NavLink>
            </div>
            <div classNmae='place__type'>
                <NavLink className='place__type__link'>
                    Кинотеатры
                </NavLink>
            </div>
            <div classNmae='place__type'>
                <NavLink className='place__type__link'>
                    Кинотеатры
                </NavLink>
            </div>
        </div>
    );
}

export default MainPage;