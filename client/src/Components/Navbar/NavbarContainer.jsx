import React from 'react';
import Navbar from './Navbar';
import * as axios from 'axios';
import { setNavData, setNames, SetTotalCount, SetPageCount, concatNavData, Setliked, SetTypeTitle, setCategoryCount } from '../../redux/navReduser';
import { setCounter } from '../../redux/headerReduser';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

class NavbarContainer extends React.Component {
    componentDidMount() {
        let type = this.props.match.params.type;
        axios.get(`http://localhost:8001/place_category/places/some/${type}/${this.props.onOnePage}/0`)
            .then(response => {
                this.props.setNavData(response.data, [])
                this.props.SetTypeTitle(response.data[0].placeCategory)
            })
        axios.get(`http://localhost:8001/place_category/places/category_count/${type}`)
            .then(res => {
                debugger
                this.props.setCategoryCount(res.data)
            })
    }
    onPageChange = (numberOfPage, type, prevNavData) => {
        axios.get(`http://localhost:8001/place_category/places/some/${type}/${this.props.onOnePage}/${numberOfPage - this.props.onOnePage}`)
            .then(response => {
                debugger
                this.props.setNavData(response.data, prevNavData)
            })
    };
    render() {
        if (this.props.navData.length == 0) return <Preloader />
        return <Navbar {...this.props} onPageChange={this.onPageChange} type={this.props.match.params.type} />
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
        typeTitle: state.navData.typeTitle,
        categoryCount: state.navData.categoryCount
    }
}

export default connect(
    mapStateToProps,
    {
        setNavData,
        setCounter,
        setNames,
        SetTotalCount,
        SetPageCount,
        concatNavData,
        Setliked,
        SetTypeTitle,
        setCategoryCount
    })(withRouter(NavbarContainer));