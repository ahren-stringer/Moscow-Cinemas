import React from 'react';
import Info from './Info';
import * as axios from 'axios';
import {setInfoData} from '../../../redux/infoReduser';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

class InfoContainer extends React.Component{
    componentDidMount(){
        console.log('mount')
        debugger
        let id=this.props.match.params.id;
        axios.get(`https://apidata.mos.ru/v1/datasets/495/rows?$skip=${id}&$top=1&api_key=c70b711784b712cbe482f9701909fd97`,{
            withCredentials:false,
            headers:{
                'Access-Control-Allow-Origin': '*'
            }
        }).then(response=>{
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
        infoData: state.infoData.infoData
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps,{setInfoData})
)(InfoContainer)
