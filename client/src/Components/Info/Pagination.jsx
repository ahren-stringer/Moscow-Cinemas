import React from 'react'

let Pagination = (props) => {
    debugger
    let pageCount = Math.ceil(props.totalCount / props.onOnePage);
    let arr = [];
    for (let i = 1; i <= pageCount; i++) {
        arr.push(i)
    }
    return <div>

        {/* //     <ul class="pagination">
            //     <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
        //     <li class="active"><a href="#!">1</a></li>
        //     <li class="waves-effect"><a href="#!">2</a></li>
        //     <li class="waves-effect"><a href="#!">3</a></li>
        //     <li class="waves-effect"><a href="#!">4</a></li>
        //     <li class="waves-effect"><a href="#!">5</a></li>
        //     <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
        //   </ul> */}
        <ul className="pagination">
        <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
            {
                arr.map(item => <li className={item === props.numberOfPage ? 'active' : 'waves-effect'}
                    onClick={(e) => { props.onPageChange(item) }}><a href="#!">{item}</a></li>)
            }
            <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
        </ul>

    </div>
};

export default Pagination