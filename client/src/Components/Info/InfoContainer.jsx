import React from 'react';
import Info from './Info';
import * as axios from 'axios';
import { setInfoData, setFeatures, ComentChange, setComent,SetTotalCount,SetPageCount } from '../../redux/infoReduser';
import { Setliked } from '../../redux/navReduser';
import { setCounter } from '../../redux/headerReduser';
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
        if (id){
            axios.get(`http://localhost:8001/place_category/places/${id}`)
            .then(response => {
                this.props.setInfoData(response.data)
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id != this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                infoFlag: true
            })
            axios.get(`http://localhost:8001/place_category/places/${id}`)
                .then(response => {
                    this.props.setInfoData(response.data)
                    this.setState({
                        infoFlag: false
                    })
                })
        }
    }
    render() {
        debugger
        if (this.props.match.url=='/liked' && !this.props.infoData) return <div>Вам, пока что, ничего не нравится :)</div>
        if (!this.props.infoData||this.state.infoFlag) return <Preloader />
        return <Info {...this.props} id={this.props.match.params.id} />
    }
}

let mapStateToProps = (state) => {
    return {
        infoData: state.infoData.infoData,
        features: state.infoData.features,
        newComentText: state.infoData.newComentText,
        coment: state.infoData.coment,
        token: state.auth.token,
        liked: state.navData.liked,
        totalCount: state.infoData.totalCount,
        numberOfPage:state.infoData.numberOfPage,
        onOnePage:state.infoData.onOnePage,
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, { setInfoData, setFeatures, ComentChange, setComent,setCounter, Setliked,SetTotalCount,SetPageCount })
)(InfoContainer)
