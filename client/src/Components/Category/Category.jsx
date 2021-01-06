import React from 'react';
import s from './Category.module.css'
import Introdaction from './Introdaction';
import CategoryCard from './CategoryCards';

function Category(props) {

  let onPageChange = (e) => {
    props.SetPageCount(props.numberOfPage + 1)
    props.onPageChange(props.numberOfPage * props.onOnePage, props.type, props.navData)
  };
  return (
    <div>
      <Introdaction typeTitle={props.typeTitle} />
      <CategoryCard liked={props.liked}
        navData={props.navData}
        Setliked={props.Setliked}
        setCounter={props.setCounter}
        match={props.match}
        likedThunk={props.likedThunk}/>
      {props.categoryCount === props.navData.length ? null :
        <div onClick={onPageChange} className={s.pagination}>
          <h4>Загрузить еще</h4>
        </div>
        }
    </div>
  );
}

export default Category;