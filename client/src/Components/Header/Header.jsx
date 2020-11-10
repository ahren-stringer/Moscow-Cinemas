import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Header.css'
import SearchingForm from './SearchingForm';
import { SearchChange } from '../../redux/navReduser';
import { setSearched, toggleList } from '../../redux/headerReduser';

class Header extends React.Component {
  state = {
    counter: this.props.counter,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.counter !== this.props.counter) {
      this.setState({
        counter: this.props.counter
      })
    }
  };
  render() {
    console.log('render')
    return (<div className='header'>
      <NavLink to='/'>
      <div>
        <div>
          <img src='https://w7.pngwing.com/pngs/999/1016/png-transparent-film-cinema-logo-cinema-x-chin.png'
            className='img__logo' />
        </div>
        <span className='logo__title'>
          MosCinema
        </span>
      </div>
      </NavLink>
      <div className='counter'>
        <div className="liked">
          <NavLink to='/liked'>Избранное</NavLink>{this.props.counter}
        </div>
        <SearchingForm {...this.props} />
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
    isClosed: state.header.isClosed
  }
}

export default connect(mapStateToPros, { SearchChange, setSearched, toggleList })(Header);