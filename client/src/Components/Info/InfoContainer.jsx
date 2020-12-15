import React from 'react';
import Info from './Info';
import * as axios from 'axios';
import { setInfoData, setFeatures, ComentChange, setComent } from '../../redux/infoReduser';
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
        this.props.setInfoData([
            {
                phones: ["(499) 125-04-48", "(499) 125-01-35"],
                coordinates: [37.571298748323, 55.682806921335],
                name: "Государственный музей имени Пушкина",
                address: "г. Москва, улица Нелидовская, д. 10, стр. 1",
                email: "salut-cinema@mail.ru",
                workHours:
                    [{
                        DayWeek: "понедельник",
                        WorkHours: "10:00-23:00"
                    },
                    {
                        DayWeek: "понедельник",
                        WorkHours: "10:00-23:00"
                    }, {
                        DayWeek: "понедельник",
                        WorkHours: "10:00-23:00"
                    }, {
                        DayWeek: "понедельник",
                        WorkHours: "10:00-23:00"
                    }, {
                        DayWeek: "понедельник",
                        WorkHours: "10:00-23:00"
                    }, {
                        DayWeek: "понедельник",
                        WorkHours: "10:00-23:00"
                    }, {
                        DayWeek: "понедельник",
                        WorkHours: "10:00-23:00"
                    },
                ],
                numberOfHalls: 2,
                webSite: "salut-cinema.ru",
                photos: {
                    photoLarge: "https://www.mobrep.ru/b/c/28427.jpg",
                    photosSlider: ["https://b1.m24.ru/c/1321540.580xp.jpg",
                        "https://www.mos.ru/upload/newsfeed/newsfeed/salut-sl2.jpg",
                        "https://www.osd.ru/photos/txt/3153_txt_0081.jpg"]
                },
                placeCategory: "Кинотеатры",
                categoryUrl: "cinemas"
            }
        ])
        // let id = this.props.match.params.id;
        // if (id){
        //     axios.get(`http://localhost:8001/place_category/places/${id}`)
        //     .then(response => {
        //         this.props.setInfoData(response.data)
        //     })
        // }
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
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, { setInfoData, setFeatures, ComentChange, setComent,setCounter, Setliked })
)(InfoContainer)
