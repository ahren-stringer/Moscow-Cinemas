import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import './Header.css'
import PreloaderList from '../Preloader/PreloaderList';

const SearchingForm = (props) => {
    let [searched, setSearched] = useState(props.searched);
    let searchInput = React.createRef();

    useEffect(() => {
        if (searched.requestNumber < props.searched.requestNumber || props.searched.requestNumber == 0) setSearched(props.searched)
        console.log('searched:', searched)
    }, [props.searched])
    let onSearchChange = async () => {
        let searchAll=[];
        let count=0;
        let reqFlag = true;
        props.setReqNumber(+props.requestNumber + 1)
        let search = searchInput.current.value;
        console.log(search)
        props.SearchChange(search)
        props.toggleList(true)
        props.loadList(true)
        // const req = await 

        function zaebalsya() {
            function request(req) {
                debugger
                props.loadList(false)
                console.log(req.data)
                if (search == '') {
                    return []
                    //props.setSearched({ requestNumber: props.requestNumber, request: [] })
                } else {
                    return req.data
                    //props.setSearched({ requestNumber: props.requestNumber, request: req.data })
                }
            }
            axios.get(`https://apidata.mos.ru/v1/datasets/495/rows?&$filter=substringof(%27${search}%27,Cells/CommonName)&api_key=c70b711784b712cbe482f9701909fd97`)
                .then(req => {
                    searchAll = searchAll.concat(request(req))
                    console.log('Кинотеатры:', searchAll)
                    count++
                    debugger
                })
            axios.get(`https://apidata.mos.ru/v1/datasets/531/rows?&$filter=substringof(%27${search}%27,Cells/CommonName)&api_key=c70b711784b712cbe482f9701909fd97`)
                .then(req => {
                    searchAll = searchAll.concat(request(req))
                    console.log('Театры:', searchAll)
                    count++
                    debugger
                })
        }
        await zaebalsya()
        function ochen(){
        props.setSearched({ requestNumber: props.requestNumber, request: searchAll })
    }
        if(count%2==0 ||count!=0){
            ochen()
        }
        debugger
        console.log('взлом жопы')
        // .then((res)=> {
        //     debugger
        //     props.setSearched({ requestNumber: props.requestNumber, request: res })
        // })
    }
    const CloseList = () => {
        debugger
        props.setSearched({ requestNumber: 0, request: [] })
    }
    return (<div className="searching__form">
        <div className="search">
            <input type="text" value={props.newSearchText}
                onChange={onSearchChange}
                ref={searchInput}
                style={{ margin: 0, height: "2em" }} />
            {props.isListLoading ? <PreloaderList />
                : <ul className="collection">
                    {(props.isClosed && searched.length == 0) ? null :
                        Object.values(searched.request).map((item, index) => {
                            return <li className="collection-item">
                                <NavLink to={`/cinema/${item.Cells.CommonName}`}
                                    onClick={CloseList}>{item.Cells.CommonName}
                                </NavLink>
                            </li>
                        })
                    }
                </ul>
            }
        </div>
        <NavLink to={"/search/" + props.newSearchText} onClick={CloseList}>
            Найти
        </NavLink>
    </div>)
}

export default SearchingForm;