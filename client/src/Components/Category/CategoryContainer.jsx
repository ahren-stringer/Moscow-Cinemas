import React from 'react';
import Category from './Category';
import { setCategoryData, setNames, SetTotalCount, SetPageCount, SetTypeTitle, setCategoryCount,
    likedThunk,
    setCategoryDataThunk,
    setCategoryCountThunk } from '../../redux/categoryReduser';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

class CategoryContainer extends React.Component {
    componentDidMount() {
        let type = this.props.match.params.type;
        this.props.setCategoryDataThunk(
            type,
            this.props.onOnePage*this.props.numberOfPage,
            this.props.onOnePage*(this.props.numberOfPage-1)
            )
        this.props.setCategoryCountThunk(type)
    }
    componentWillUnmount(){
        this.props.SetPageCount(1)
    }
    render() {
        if (this.props.categoryData.length === 0) return <Preloader />
        return <Category {...this.props} onPageChange={this.onPageChange} type={this.props.match.params.type} />
    }
}

let mapStateToProps = (state) => {
    return {
        categoryData: state.categoryData.categoryData,
        liked: state.categoryData.liked,
        name: state.categoryData.name,
        totalCount: state.categoryData.totalCount,
        numberOfPage: state.categoryData.numberOfPage,
        onOnePage: state.categoryData.onOnePage,
        searchRedirect: state.search.searchRedirect,
        typeTitle: state.categoryData.typeTitle,
        categoryCount: state.categoryData.categoryCount
    }
}

export default connect(
    mapStateToProps,
    {
        setCategoryData,
        setNames,
        SetTotalCount,
        SetPageCount,
        SetTypeTitle,
        setCategoryCount,
        likedThunk,
        setCategoryDataThunk,
        setCategoryCountThunk,
    })(withRouter(CategoryContainer));