const SET_COUNTER = 'headerReuser/SET-COUNTER';
const SET_SEARCHED = 'infoReuser/SET-SEARCHED';
const SET_REDIRECT = 'infoReuser/SET-REDIRECT';
const CLOSE_LIST = 'infoReuser/CLOSE_LIST';

let init = {
    count: localStorage.getItem("count"),
    searched: [],
    searchRedirect: true,
    isClosed:true
};

const headerReduser = (state = init, action) => {
    switch (action.type) {
        case SET_COUNTER:
            return { ...state, count: action.count }
        case SET_SEARCHED:
            return { ...state, searched: action.searched }
        case SET_REDIRECT:
            return { ...state, searchRedirect: action.searchRedirect }
        case CLOSE_LIST:
            return { ...state, isClosed: action.isClosed }
        default:
            return state
    }
}

export const setCounter = (count) => ({ type: SET_COUNTER, count });
export const setSearched = (searched) => ({ type: SET_SEARCHED, searched })
export const setSearchRedirect = (searchRedirect) => ({ type: SET_REDIRECT, searchRedirect })
export const toggleList = (isClosed) => ({ type: CLOSE_LIST, isClosed })

export default headerReduser