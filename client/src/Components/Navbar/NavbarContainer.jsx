import React from 'react';
import Navbar from './Navbar';
import * as axios from 'axios';
import { setNavData, setNames, SetTotalCount, SetPageCount, concatNavData, Setliked, SetTypeTitle } from '../../redux/navReduser';
import { setCounter } from '../../redux/headerReduser';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import Search from '../Search/Search';
import Preloader from '../Preloader/Preloader';

class NavbarContainer extends React.Component {
    componentDidMount() {
        let type = this.props.match.params.type;
        this.props.setNavData([
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
            },
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
                    photoLarge: "https://pushkinmuseum.art/museum/22_img_pc.jpg",
                    photosSlider: ["https://b1.m24.ru/c/1321540.580xp.jpg",
                        "https://www.mos.ru/upload/newsfeed/newsfeed/salut-sl2.jpg",
                        "https://www.osd.ru/photos/txt/3153_txt_0081.jpg"]
                },
                placeCategory: "Кинотеатры",
                categoryUrl: "cinemas"
            }
        ], [])
        //     axios.get(`http://localhost:8001/place_category/places/some/${type}/${this.props.onOnePage}/0`)
        //         .then(response => {
        //             this.props.setNavData(response.data,[])
        //             this.props.SetTypeTitle(response.data[0].placeCategory)
        //         })

    }
    onPageChange = (numberOfPage, type, prevNavData) => {
        axios.get(`http://localhost:8001/place_category/places/some/${type}/${this.props.onOnePage}/${numberOfPage - 6}`)
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
        typeTitle: state.navData.typeTitle
    }
}

export default connect(mapStateToProps, { setNavData, setCounter, setNames, SetTotalCount, SetPageCount, concatNavData, Setliked, SetTypeTitle })(withRouter(NavbarContainer));