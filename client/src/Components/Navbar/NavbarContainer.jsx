import React from 'react';
import Navbar from './Navbar';
import * as axios from 'axios';
import { setNavData, setNames, SetTotalCount, SetPageCount } from '../../redux/navReduser';
import { setCounter } from '../../redux/headerReduser';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Search from '../Search/Search';

class NavbarContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://apidata.mos.ru/v1/datasets/495/rows?$skip=0&$top=${this.props.onOnePage}&api_key=c70b711784b712cbe482f9701909fd97`)
            .then(response => {
                this.props.setNavData(response.data)
                this.props.setNames(response.data.map(item => {
                    let name = item.Cells.CommonName.split(' ');
                    return name[1].slice(1, name[1].length - 1)
                }))
            })
    }
    onPageChange = (numberOfPage) => {
        axios.get(`https://apidata.mos.ru/v1/datasets/495/rows?$skip=0&$top=${numberOfPage}&api_key=c70b711784b712cbe482f9701909fd97`)
            .then(response => {
                debugger
                this.props.setNavData(response.data)
                console.log(response.data)
            })

    };
    render() {
        if (!this.props.navData) return <div>!!!!!!!!!!!!</div>
        //if (this.props.searchRedirect) return <Redirect to='/search'/>
        return <Navbar {...this.props} onPageChange={this.onPageChange} />
    }
}

let mapStateToProps = (state) => {
    return {
        navData: state.navData.navData,
        liked: state.navData.liked,
        name: state.navData.name,
        totalCount: state.navData.totalCount,
        numberOfPage: state.navData.numberOfPage,
        onOnePage: state.navData.onOnePage,
        searchRedirect: state.header.searchRedirect
    }
}

export default connect(mapStateToProps, { setNavData, setCounter, setNames, SetTotalCount, SetPageCount })(NavbarContainer);