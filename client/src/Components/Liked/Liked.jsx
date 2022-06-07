import React, { useState,useEffect } from 'react';
import './Liked.css'
import { connect } from 'react-redux';
import Popular from '../MainPage/Popular';
import CategoryCards from '../Category/CategoryCards';
import { Setliked,setCounter,likedThunk } from '../../redux/categoryReduser';
import { withRouter } from 'react-router-dom';


function Liked(props) {
  let [ls, setLs] = useState(props.liked);

  let categoryData;
  let places=[];

  if (ls.places){
    debugger
    categoryData=Object.entries(ls.places).map(item => item[1]) 
    places=Object.keys(ls.places)
}else{
  categoryData=[]
  places=[]
}
  useEffect(()=>{
    setLs(props.liked)
  },[props.liked])
debugger
  if (places.length === 0) return <div className='liked__nothing'>
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