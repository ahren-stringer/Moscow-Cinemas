import React from 'react';
import './App.css';
import Header from '../src/Components/Header/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import Liked from './Components/Liked/Liked';
import Navbar from './Components/Navbar/NavbarContainer';
import Info from './Components/Info/InfoContainer';
import 'materialize-css'
import Search from './Components/Search/Search';
import { connect } from 'react-redux';
import { setSearched } from './redux/headerReduser';
import Footer from './Components/Footer/Footer';
import Auth from './Components/Auth/Auth';
import Register from './Components/Auth/Register';

function App(props) {
  // const onCloseList=()=>{
  //   props.setSearched({ requestNumber:0,request:[] })
  // }
  return (
    <div className="App"
    //onClick={onCloseList}
    >
      <div className='Header'>
        <Header />
      </div>
      <Route exact path="/" children={<Navbar />} />
      <Route path='/cinema/:id' render={() => <Info />} />
      <div className='content'>
        <Route path='/search/:riched' render={() => <Search />} />
        <Route path='/liked/:id?' render={() => <Liked />} />
        <Route path='/auth' render={() => <Auth />}/>
        <Route path='/register' render={() => <Register />}/>
      </div>
      <Footer />
    </div>
  );
}

let mapStateToProps = (state) => {
  return { isClosed: state.header.isClosed }
}

export default connect(mapStateToProps, { setSearched })(App);

