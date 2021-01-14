import React from 'react';
import Info from './Info';
import * as axios from 'axios';
import {
    setInfoData, setFeatures, ComentChange, setComents, SetTotalCount, SetPageCount,
    setInfoDataThunk
} from '../../redux/infoReduser';
import { likedThunk } from '../../redux/categoryReduser';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { InfoAPI } from '../../API/api';

class InfoContainer extends React.Component {
    state = {
        infoFlag: false
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        if (id) {
            this.props.setInfoDataThunk(id, this.props.onOnePage, this.props.numberOfPage-1)
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id != this.props.match.params.id) {
            debugger
            let id = this.props.match.params.id;
            // this.setState({
            //     infoFlag: true
            // })
            this.props.SetPageCount(1)
            this.props.setInfoDataThunk(id, this.props.onOnePage, this.props.numberOfPage-1)
        }
    }
    componentWillUnmount(){
        this.props.SetPageCount(1)
    }
    onPageChange = async (name, onOnePage, numberOfPage) => {
        let req = await InfoAPI.getComents(name, onOnePage, numberOfPage)
        this.props.setComents(req)
    };
    render() {
        debugger
        if (!this.props.infoData 
            //&& !this.props.coments && !this.props.totalCount
            ) return <Preloader />
        return <Info {...this.props} id={this.props.match.params.id}
            onPageChange={this.onPageChange}
        />
    }
}

let mapStateToProps = (state) => {
    return {
        infoData: state.infoData.infoData,
        features: state.infoData.features,
        newComentText: state.infoData.newComentText,
        coments: state.infoData.coments,
        token: state.auth.token,
        liked: state.categoryData.liked,
        totalCount: state.infoData.totalCount,
        numberOfPage: state.infoData.numberOfPage,
        onOnePage: state.infoData.onOnePage,
        userId:state.auth.userId
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, { setInfoData, setFeatures, ComentChange, setComents, SetTotalCount, SetPageCount, likedThunk, setInfoDataThunk })
)(InfoContainer)
