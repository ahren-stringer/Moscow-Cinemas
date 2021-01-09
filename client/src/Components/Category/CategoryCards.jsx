import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import s from './Category.module.css'
import SingleCard from './SingleCard';

function CategoryCard(props) {
  let [ls, setLs] = useState(props.liked);

  useEffect(() => {
    setLs(props.liked)
  }, [props.liked])

  return (
    <div>
      <div className={s.category__wrapper}>
        <div className={s.category}>
          {
            props.categoryData.map((item) => {
              return <div className={s.card__wrapper}>
                <SingleCard item={item}
                  ls={ls}
                  match={props.match}
                  likedThunk={props.likedThunk} />
              </div>
            })
          }
        </div>
      </div>
    </div >
  );
}

export default CategoryCard;