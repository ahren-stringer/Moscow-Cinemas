import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar(props) {

  const Liked = (name) => {
    let counter = +localStorage.getItem('count');
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name)
      counter = counter - 1
      localStorage.setItem('count', counter)
    } else {
      localStorage.setItem(name, name)
      counter = counter + 1
      localStorage.setItem('count', counter)
    }
    console.log(localStorage)
  }

  return (
    <div>
      {
        Object.entries(localStorage)
          .filter(item => item[0] !== "count")
          .map((item) =>
            <NavLink to={`/liked/${item[1]}`}>
              <div>
                {item[0]}
              </div>
            </NavLink>)
      }
    </div>
  );
}

export default Navbar;