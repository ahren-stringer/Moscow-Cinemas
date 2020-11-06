import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from '../All.module.css'

//localStorage.clear()

function Navbar(props) {
  let [follow, followFlag]=useState(props.liked)

  useEffect(()=>{
    followFlag(props.liked)
  },[props.liked])

  const Liked=(name,index)=>{
    let counter=+localStorage.getItem('count');
    if (localStorage.getItem(name)){
      localStorage.removeItem(name)
      counter=counter-1
      localStorage.setItem('count',counter)
      followFlag(false)
    }else{
      localStorage.setItem(name,index)
      counter=counter+1
      localStorage.setItem('count',counter)
      followFlag(false)
    }
    props.setCounter(counter)
    console.log(localStorage)
  }

  let pageCount = Math.ceil(props.totalCount / props.onOnePage);
    let arr = [];
    for (let i = 1; i <= pageCount; i++) {
        arr.push(i)
    }
  let onPageChange=(numberOfPage)=>{
      props.onPageChange(numberOfPage)
  };
debugger
  return (
    <div>
      {
        props.navData.map((item, index, array) => {
          return <div>
            <NavLink to={`/all/${index}`}>
              <div>
                {item.Cells.CommonName}
              </div>
            </NavLink>
            <div className={s.liked} onClick={()=>{Liked(item.Cells.CommonName
              ,index)}}>
              Добавить в избранное {
               !!localStorage.getItem(item.Cells.CommonName) && <span>+</span>
              }
            </div>
          </div>
        })
      }
      <div>
        {
            arr.map((item, index) => <span className={item === props.numberOfPage ? s.active : ''}
                onClick={() => {debugger
                  onPageChange(index) }}>{item}</span>)
        }
    </div>
    </div>
  );
}

export default Navbar;