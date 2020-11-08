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
      <div className='counter'>
        <div className="liked">
          <NavLink to='/liked'>Liked</NavLink>{this.props.counter}
        </div>
        <NavLink to='/all'>All</NavLink>
      </div>
      <SearchingForm {...this.props} />
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

export default connect(mapStateToPros, { SearchChange,setSearched,toggleList})(Header);