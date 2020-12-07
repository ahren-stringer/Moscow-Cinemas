import React, { useCallback, useEffect, useState } from 'react';
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
import {setToken, setUserId, setLogin, setLoaded} from './redux/authReduser'
import MainPage from './Components/MainPage/MainPage';

function App(props) {
  // const [token, setToken] = useState(null);
  // const [userId, setUserId] = useState(null);
  // const [loaded, setLoaded] = useState(false);

  const login = useCallback((jwtToken, id) => {
    debugger
    props.setToken(jwtToken)
    props.setUserId(id)
    localStorage.setItem('userData', JSON.stringify({ userId: id, token: jwtToken }))
  }, []);

 props.setLogin(login)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'))
    if (data && data.token) {
      login(data.token, data.userId)
    }
    props.setLoaded(true)
  }, [login]);

  const onCloseList=()=>{
    props.setSearched({ requestNumber:0,request:[] })
  }
  return (
    <div className="App"
    onClick={onCloseList}
    >
      <div className='Header'>
        <Header />
      </div>
      <Route exact path="/" children={<MainPage />} />
      <Route exact path="/:type" children={<Navbar />} />
      <Route path='/cinemas/:id' render={() => <Info />} />
      <div className='content'>
        <Route path='/search/:riched' render={() => <Search />} />
        <Route path='/liked/:id?' render={() => <Liked />} />
        <Route path='/auth' render={() => <Auth />} />
        <Route path='/register' render={() => <Register />} />
      </div>
      <Footer />
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    isClosed: state.header.isClosed,
    loaded: state.auth.loaded,
    token: state.auth.token,
    userId: state.auth.userId,
    loaded: state.auth.loaded,
  }
}

export default connect(mapStateToProps, { setSearched, setToken, setUserId,setLogin,setLoaded})(App);

