import React from 'react'
import s from './Info.module.css'

let Pagination = (props) => {
    let pageCount = Math.ceil(props.totalCount / props.onOnePage);
    let arr = [];
    for (let i = 1; i <= pageCount; i++) {
        arr.push(i)
    }
    return <div className={s.pagination__wrapper}>
        <ul className="pagination">
            <li className={props.numberOfPage == arr[0] ? "disabled" : 'waves-effect'}
                onClick={()=>{
                    props.SetPageCount(props.numberOfPage - 1)
                    props.onPageChange(props.infoData[0].name, props.onOnePage, props.numberOfPage - 2)
                    }}><a><i className="material-icons">chevron_left</i></a></li>
            {
                arr.map((item, index) => <li className={item === props.numberOfPage ? 'active' : 'waves-effect'}
                    onClick={(e) => {
                        props.SetPageCount(item)
                        props.onPageChange(props.infoData[0].name, props.onOnePage, index)
                    }}><a>{item}</a></li>)
            }
            <li className={props.numberOfPage == arr[arr.length - 1] ? "disabled" : 'waves-effect'}
                onClick={()=>{
                    props.SetPageCount(props.numberOfPage + 1)
                    props.onPageChange(props.infoData[0].name, props.onOnePage, props.numberOfPage)
                    }}><a><i className="material-icons">chevron_right</i></a></li>
        </ul>

    </div>
};

export default Pagination