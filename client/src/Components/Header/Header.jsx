import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Header.css'
import SearchingForm from './SearchingForm';
import {
  setSearched, toggleList, loadList, setReqNumber, setSearchedArr, SearchChange,
  searchThunk,
  CloseListThunk
} from '../../redux/searchReduser';
import { logout } from '../../redux/authReduser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

class Header extends React.Component {
  state = {
    counter: this.props.counter,
    favorteArr: Object.entries(this.props.liked).filter(item => item[0].slice(0, 4) === "Кино"),
    menuBtn: false
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.counter !== this.props.counter) {
      this.setState({
        counter: this.props.counter
      })
    }
    if (prevProps.liked !== this.props.liked) {
      this.setState({
        favorteArr: Object.entries(this.props.liked).filter(item => item[0].slice(0, 4) === "Кино")
      })
    }
  };

  closeMenu = (event) => {
    if (event.target.nodeName === 'A') {
      let menu=event.currentTarget;
      menu.style.right = '-283px'
      this.setState({
        menuBtn: false
      })
    }
  }
  render() {
    return (
      <div className='header'>
        <div className='__container'>
          <div className='header__wrapper'>
            <NavLink to='/' className='logo' activeClassName='active' style={this.state.menuBtn ? { display: 'none' } : {}}>

              <span className='logo__title'>
                MosCulture
                </span>

            </NavLink>
            <div className='menu__wrapper' onClick={this.closeMenu}
            style={!this.state.menuBtn?{right:'-283px'}:{right:'0'}}
            >
              <span className="menu-btn">
                {
                  !this.state.menuBtn ?
                    <span onClick={(e) => {
                      this.setState({
                        menuBtn: true
                      })
                    }}>
                      <FontAwesomeIcon icon={faBars} />
                    </span>
                    : <span onClick={(e) => {
                      this.props.SearchChange('')
                      this.setState({
                        menuBtn: false
                      })
                    }}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                }
              </span>
              {
                this.state.menuBtn && <NavLink to='/' className='logo logo__title' activeClassName='active'>
                    {/* <span className='logo__title'> */}
                      MosCulture
                  {/* </span> */}
                </NavLink>
              }
              <div className='header__inner'>

                {/* Поиск */}
                <SearchingForm {...this.props} />

                {/* Избранное */}
                <div className="liked inner-item">
                  <span class="collection-item">
                    {!this.state.menuBtn || <span class="new badge" style={!this.props.counter?{'display':'none'}:{}}>
                      {this.state.counter}
                    </span>}
                    {this.state.menuBtn ? <NavLink to='/liked'>
                      Избранное
                    </NavLink>
                      : <NavLink to='/liked'>
                        <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
                      </NavLink>}
                    {this.state.menuBtn ||
                      this.state.counter
                    }
                  </span>
                </div>

                {/* Авторизация */}
                {!this.props.token ? <NavLink to='/auth' className='auth__btn inner-item'>Войти</NavLink> :
                  <span className='auth__btn inner-item'
                    onClick={this.props.logout}
                  >Выход</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToPros = (state) => {
  return {
    counter: state.categoryData.count,
    newSearchText: state.search.newSearchText,
    searched: state.search.searched,
    isClosed: state.search.isClosed,
    isListLoading: state.search.isListLoading,
    liked: state.categoryData.liked,
    requestNumber: state.search.requestNumber,
    token: state.auth.token,
  }
}

export default connect(mapStateToPros, {
  SearchChange, setSearched, toggleList, loadList, setReqNumber, logout, setSearchedArr,
  searchThunk,
  CloseListThunk
})(Header);