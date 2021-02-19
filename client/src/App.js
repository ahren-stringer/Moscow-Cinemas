import React, { useCallback, useEffect } from 'react';
import './App.css';
import Header from '../src/Components/Header/Header';
import { Route, withRouter } from 'react-router-dom';
import Liked from './Components/Liked/Liked';
import Category from './Components/Category/CategoryContainer';
import Info from './Components/Info/InfoContainer';
import 'materialize-css'
import Search from './Components/Search/Search';
import { connect } from 'react-redux';
import { setSearched,
  CloseListThunk } from './redux/searchReduser';
import Footer from './Components/Footer/Footer';
import Auth from './Components/Auth/Auth';
import Register from './Components/Auth/Register';
import { setToken, setUserId, setLogin, setLoaded } from './redux/authReduser'
import MainPage from './Components/MainPage/MainPage';
import PopularPage from './Components/Popular/PopularPage';

function App(props) {

  const login = useCallback((jwtToken, id) => {
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

  return (
    <div className="App"
      onClick={(event)=>{
        let list =event.target.parentNode.className;
        if (list !=='collection') props.CloseListThunk()
      }}
    >
      <div className='Header'
        style={props.location.pathname === '/' ? {
          position: 'absolute',
          width: '100%',
          zIndex: '1',
          background: 'none'
        }
          : {}
        }
      >
        <Header />
      </div>
      <Route exact path="/" render={() => <MainPage />} />
      <div className='main'>
        <div className='__container'>
          <Route exact path="/category/:type?" render={() => <Category />} />
          <Route path='/places/:id?' render={() => <Info />} />
          <Route path='/search/:riched?' render={() => <Search />} />
          <Route path='/liked/:id?' render={() => <Liked />} />
          <Route path='/auth' render={() => <Auth />} />
          <Route path='/register' render={() => <Register />} />
          <Route path='/popular' render={() => <PopularPage />} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    isClosed: state.search.isClosed,
    loaded: state.auth.loaded,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

export default connect(mapStateToProps, { setSearched, setToken, setUserId, setLogin, setLoaded,
  CloseListThunk })(withRouter(App));

