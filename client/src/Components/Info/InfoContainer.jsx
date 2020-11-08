import React from 'react';
import Info from './Info';
import * as axios from 'axios';
import { setInfoData, setFeatures,ComentChange,setComent} from '../../redux/infoReduser';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

class InfoContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get(`https://apidata.mos.ru/v1/datasets/495/rows?&$filter=substringof(%27${id}%27,Cells/CommonName)&api_key=c70b711784b712cbe482f9701909fd97`)
            .then(response => {
                console.log(response.data)
                this.props.setInfoData(response.data)
            })
        // axios.get('http://localhost:8001/cinema/coments')
        //     .then(req=> console.log(req))
    }
    render() {
        if (!this.props.infoData) return <div>!!!!!!!!!!!!</div>
        return <Info {...this.props} />
    }
}

let mapStateToProps = (state) => {
    return {
        infoData: state.infoData.infoData,
        features: state.infoData.features,
        newComentText: state.infoData.newComentText,
        coment: state.infoData.coment
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, { setInfoData, setFeatures,ComentChange,setComent })
)(InfoContainer)
