import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Header.css'
import SearchingForm from './SearchingForm';
import { SearchChange } from '../../redux/navReduser';
import { setSearched, toggleList, loadList, setReqNumber, setSearchedArr } from '../../redux/headerReduser';
import { logout } from '../../redux/authReduser';
import logo from '../../img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'

class Header extends React.Component {
  state = {
    counter: this.props.counter,
    favorteArr: Object.entries(this.props.liked).filter(item => item[0].slice(0, 4) === "Кино"),
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
  //   logoutReq=(e)=>{
  //     e.preventDefault()
  //     auth.logout()
  // }
  //favorteArr = Object.entries(this.props.liked).filter(item => item[0].slice(0, 4) === "Кино");
  render() {
    return (
      <div className='header'>
        <div className='__container'>
          <div className='header__wrapper'>
            <NavLink to='/' activeClassName='active'>
              <div>
                {/* <div>
                  <img src={logo}
                    className='img__logo' />
                </div> */}
                <span className='logo__title'>
                  MosCulture
                </span>
              </div>
            </NavLink>
            {/* <div className='counter'> */}
              <SearchingForm {...this.props} />
              <div className="liked">
                <NavLink to={'/liked' + (!this.state.favorteArr[0] ? '' : ('/' + this.state.favorteArr[0][0]))}>
                  <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
                </NavLink>
                {this.props.counter}
              </div>
              {!this.props.token ? <NavLink to='/auth' className='auth__btn'>Войти</NavLink> :
                <span className='auth__btn' href='/'
                  onClick={this.props.logout}
                >Выход</span>} 
             {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToPros = (state) => {
  return {
    counter: state.header.count,
    newSearchText: state.navData.newSearchText,
    navData: state.navData.navData,
    names: state.navData.names,
    searched: state.header.searched,
    isClosed: state.header.isClosed,
    isListLoading: state.header.isListLoading,
    liked: state.navData.liked,
    requestNumber: state.header.requestNumber,
    token: state.auth.token,
  }
}

export default connect(mapStateToPros, { SearchChange, setSearched, toggleList, loadList, setReqNumber, logout, setSearchedArr })(Header);