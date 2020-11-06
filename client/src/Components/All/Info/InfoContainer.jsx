import React from 'react';
import Info from './Info';
import * as axios from 'axios';
import {setInfoData,setFeatures} from '../../../redux/infoReduser';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
//this.props.infoData[0].Cells.geoData.coordinates[1], this.props.infoData[0].Cells.geoData.coordinates[0]
class InfoContainer extends React.Component{
    componentDidMount(){
        let id=this.props.match.params.id;
        axios.get(`https://apidata.mos.ru/v1/datasets/495/rows?$skip=${id}&$top=1&api_key=c70b711784b712cbe482f9701909fd97`)
        .then(response=>{
            console.log(response.data)
            this.props.setInfoData(response.data)
        })
    }
  render(){
    if (!this.props.infoData) return <div>!!!!!!!!!!!!</div>
    return <Info {...this.props}/>
}
}

let mapStateToProps=(state)=>{
    return{
        infoData: state.infoData.infoData,
        features: state.infoData.features
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps,{setInfoData,setFeatures})
)(InfoContainer)
