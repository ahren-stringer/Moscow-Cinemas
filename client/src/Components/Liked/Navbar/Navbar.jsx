import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAmericanSignLanguageInterpreting, faFilm, faPalette, faArchway } from '@fortawesome/free-solid-svg-icons'
import '../Liked.css'

function Navbar(props) {
  let [ls, setLs] = useState(props.liked);
  let [redirect, setRedirect] = useState(false)

  useEffect(() => {
    setLs(props.liked)
  }, [props.liked])

  const Liked = (name) => {
    let counter = +localStorage.getItem('count');
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name)
      counter = counter - 1
      localStorage.setItem('count', counter)
      props.Setliked({ ...localStorage })
      setRedirect(true)
    } else {
      localStorage.setItem(name, name)
      counter = counter + 1
      localStorage.setItem('count', counter)
      props.Setliked({ ...localStorage })
    }
    props.setCounter(counter)
    console.log(localStorage)
  }
  let favorteArr = Object.entries(localStorage).filter(item => item[0] !== "count" && item[0] !== "userData")
  debugger
  return (
    <div>
        <ul className="collection">
       { Object.entries(ls)
          .filter(item => item[0] !== "count" && item[0] !== "userData")
          .map((item) =>
              <li className="collection-item avatar">
              {
              item[1]==='cinemas'?<FontAwesomeIcon icon={faFilm} className="material-icons circle red"/>:
              item[1]==='theatres'?<FontAwesomeIcon icon={faAmericanSignLanguageInterpreting} className="material-icons circle blue"/>:
              item[1]==='galleries'?<FontAwesomeIcon icon={faPalette} className="material-icons circle yellow"/>:
              item[1]==='museums'?<FontAwesomeIcon icon={faArchway} className="material-icons circle green"/>:
              null
              }
              <span>
                <NavLink to={`/liked/${item[0]}`}>
                  <div>
                    {item[0]}
                  </div>
                </NavLink>
              </span>
              <p onClick={() => { Liked(item[0]) }}>
                Удалить из избранного
            </p>
              {redirect ? <Redirect to={'/liked' + (!favorteArr[0] ? '' : '/' + favorteArr[0][0])} /> : null}
              </li>
          )}  
      </ul>
    </div>
  );
}

export default Navbar;