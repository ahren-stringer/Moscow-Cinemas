import React from 'react';
import Navbar from './Navbar';
import * as axios from 'axios';
import { setNavData, setNames, SetTotalCount, SetPageCount,concatNavData,Setliked, SetTypeTitle } from '../../redux/navReduser';
import { setCounter } from '../../redux/headerReduser';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import Search from '../Search/Search';
import Preloader from '../Preloader/Preloader';

class NavbarContainer extends React.Component {
    componentDidMount() {
        let type=this.props.match.params.type;
        let typeTitle='';
        if (type=='cinemas'){
            axios.get(`http://localhost:8001/place_category/places/category/cinemas`)
            .then(response => {
                debugger
                this.props.setNavData(response.data)
                this.props.SetTypeTitle(response.data[0].placeCategory)
            })
        }
        if (type=='theatres'){
            axios.get(`http://localhost:8001/place_category/places/category/theatres`)
            .then(response => {
                debugger
                this.props.setNavData(response.data)
                this.props.SetTypeTitle(response.data[0].placeCategory)
            })
        }
    }
    onPageChange = (numberOfPage) => {
        axios.get(`https://apidata.mos.ru/v1/datasets/495/rows?$skip=${numberOfPage-6}&$top=${this.props.onOnePage}&api_key=c70b711784b712cbe482f9701909fd97`)
            .then(response => {
                this.props.setNavData(response.data)
            })
    };
    render() {
        if (this.props.navData.length===0 && !this.props.typeTitle) return <Preloader/>
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
        searchRedirect: state.header.searchRedirect,
        typeTitle: state.navData.typeTitle
    }
}

export default connect(mapStateToProps, { setNavData, setCounter, setNames, SetTotalCount, SetPageCount,concatNavData,Setliked,SetTypeTitle })(withRouter(NavbarContainer));