import React, { useState,useEffect } from 'react';
import './Liked.css'
import { connect } from 'react-redux';
import Popular from '../MainPage/Popular';
import CategoryCards from '../Category/CategoryCards';
import { Setliked,setCounter,likedThunk } from '../../redux/categoryReduser';
import { withRouter } from 'react-router-dom';


function Liked(props) {
  let [ls, setLs] = useState(props.liked);
  let categoryData = Object.entries(ls).filter(item => item[0] !== "count" && item[0] !== "userData")
  .map(item => JSON.parse(item[1])) 

  useEffect(()=>{
    setLs(props.liked)
  },[props.liked])
debugger
  if (Object.entries(props.liked).filter(item => item[0] !== "count" && item[0] !== "userData").length === 0) return <div className='liked__nothing'>
    <h4 className='liked__nothing-title'>Вам, пока что, ничего не нравится :)</h4>
    <Popular 
    likedThunk={props.likedThunk}/>
  </div>

  return <div>
    <div>
      <h3 className='favorite__title'>
        Избранное
      </h3>
    </div>
<CategoryCards liked={ls}
    categoryData={categoryData}
    match={props.match}
    likedThunk={props.likedThunk}/>
  </div>
  

}

let mapStateToProps = (state) => {
  return {
    liked: state.categoryData.liked,
    categoryData: state.categoryData.categoryData
  }
}

export default connect(mapStateToProps, { Setliked, setCounter,likedThunk })(withRouter(Liked));