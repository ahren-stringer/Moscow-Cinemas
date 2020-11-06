import React from 'react';
import Navbar from './Navbar';
import * as axios from 'axios';
import {setNavData} from '../../../redux/navReduser';
import { connect } from 'react-redux';

class NavbarContainer extends React.Component{
    componentDidMount(){
        
    }
  render(){
    return <Navbar {...this.props}/>
}
}

let mapStateToProps=(state)=>{
    return{
        navData: state.navData.navData
    }
}

export default connect(mapStateToProps,{setNavData})(NavbarContainer);