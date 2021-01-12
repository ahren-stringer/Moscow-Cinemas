import React from 'react';
import s from './Category.module.css'
import Introdaction from './Introdaction';
import CategoryCard from './CategoryCards';

function Category(props) {

  let onPageChange = (e) => {
    props.SetPageCount(props.numberOfPage + 1)
    props.setCategoryDataThunk(
      props.type,
      props.onOnePage*(props.numberOfPage+1),
      props.onOnePage*props.numberOfPage,
      props.categoryData
      )
  };
  return (
    <div>
      <Introdaction typeTitle={props.typeTitle} />
      <CategoryCard liked={props.liked}
        categoryData={props.categoryData}
        match={props.match}
        likedThunk={props.likedThunk}/>
      {props.categoryCount === props.categoryData.length ? null :
        <div onClick={onPageChange} className={s.pagination}>
          <h4>Загрузить еще</h4>
        </div>
        }
    </div>
  );
}

export default Category;