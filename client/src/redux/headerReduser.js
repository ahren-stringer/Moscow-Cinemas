const SET_COUNTER='headerReuser/SET-COUNTER';

let init={
    count:localStorage.getItem("count"),
};

const headerReduser=(state=init,action)=>{
    switch(action.type){
        case SET_COUNTER:
            return {...state, count:action.count}
        default:
            return state
    }
}

export const setCounter=(count)=>({type:SET_COUNTER, count});

export default headerReduser