import React from 'react';
import Info from './Info';
import * as axios from 'axios';
import { setInfoData, setFeatures, ComentChange, setComents, SetTotalCount, SetPageCount, 
    setInfoDataThunk} from '../../redux/infoReduser';
import { likedThunk} from '../../redux/categoryReduser';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

class InfoContainer extends React.Component {
    state = {
        infoFlag: false
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        if (id) {
            this.props.setInfoDataThunk(id,this.props.onOnePage,this.props.token)
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id != this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                infoFlag: true
            })
            this.props.setInfoDataThunk(id,this.props.onOnePage,this.props.token)
        }
    }
    onPageChange = (name,onOnePage,page) => {
        axios.get(`/coments/some/${name}/${onOnePage}/${page*onOnePage}`)
            .then(req => {
                this.props.setComents(req.data)
            })
    };
    render() {
        if (!this.props.infoData || this.state.infoFlag) return <Preloader />
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
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, { setInfoData, setFeatures, ComentChange, setComents, SetTotalCount, SetPageCount,likedThunk,setInfoDataThunk })
)(InfoContainer)
