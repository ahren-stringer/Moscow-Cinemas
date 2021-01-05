import React from 'react';
import Info from './Info';
import * as axios from 'axios';
import { setInfoData, setFeatures, ComentChange, setComents, SetTotalCount, SetPageCount } from '../../redux/infoReduser';
import { Setliked,likedThunk} from '../../redux/navReduser';
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
        if (id) {
            axios.get(`http://localhost:8001/place_category/places/${id}`)
                .then(response => {
                    this.props.setInfoData(response.data)
                    let pop = +response.data[0].popular + 1;
                    axios.put(`http://localhost:8001/place_category/places/${response.data[0]._id}`, { popular: pop })
                    // Коменты
                    axios.get(`http://localhost:8001/cinema/coments/some/${response.data[0].name}/${this.props.onOnePage}/0`, {
                        headers: {
                            "Authorization": ('Bearer ' + this.props.token)
                        }
                    })
                        .then(req => {
                            this.props.setComents(req.data)
                        });
                    // Количество коментов
                    axios.get(`http://localhost:8001/cinema/coments_count/${response.data[0].name}`, {
                        headers: {
                            "Authorization": ('Bearer ' + this.props.token)
                        }
                    }).then(count => {
                        this.props.SetTotalCount(count.data)
                    });
                })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id != this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                infoFlag: true
            })
            //место
            axios.get(`http://localhost:8001/place_category/places/${id}`)
                .then(response => {
                    this.props.setInfoData(response.data)
                    this.setState({
                        infoFlag: false
                    })
                    // Коменты
                    axios.get(`http://localhost:8001/cinema/coments/some/${response.data[0].name}/${this.props.onOnePage}/0`, {
                        headers: {
                            "Authorization": ('Bearer ' + this.props.token)
                        }
                    })
                        .then(req => {
                            this.props.setComents(req.data)
                        });
                    //Количество коментов
                    axios.get(`http://localhost:8001/cinema/coments_count/${response.data[0].name}`, {
                        headers: {
                            "Authorization": ('Bearer ' + this.props.token)
                        }
                    }).then(count => {
                        this.props.SetTotalCount(count.data)
                    });
                })
        }
    }
    onPageChange = (name,onOnePage,page) => {
        axios.get(`http://localhost:8001/cinema/coments/some/${name}/${onOnePage}/${page*onOnePage}`)
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
        liked: state.navData.liked,
        totalCount: state.infoData.totalCount,
        numberOfPage: state.infoData.numberOfPage,
        onOnePage: state.infoData.onOnePage,
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, { setInfoData, setFeatures, ComentChange, setComents, setCounter, Setliked, SetTotalCount, SetPageCount,likedThunk })
)(InfoContainer)
