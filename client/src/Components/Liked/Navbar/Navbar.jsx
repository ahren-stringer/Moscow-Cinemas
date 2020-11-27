import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar(props) {
  let [ls, setLs] = useState(props.liked);
 
  useEffect(() => {
    debugger
    setLs(props.liked)
  }, [props.liked])

  const Liked = (name) => {
    let counter = +localStorage.getItem('count');
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name)
      counter = counter - 1
      localStorage.setItem('count', counter)
      props.Setliked({ ...localStorage })
    } else {
      localStorage.setItem(name, name)
      counter = counter + 1
      localStorage.setItem('count', counter)
      props.Setliked({ ...localStorage })
    }
    console.log(localStorage)
  }

  return (
    <div>
      {
        Object.entries(ls)
          .filter(item => item[0].slice(0,4) === "Кино")
          .map((item) =>
          <div>
            <NavLink to={`/liked/${item[1]}`}>
              <div>
                {item[0]}
              </div>
            </NavLink>
            <div onClick={()=>{Liked(item[0])}}>
              Удалить из избранного
            </div>
            </div>
            )
      }
    </div>
  );
}

export default Navbar;