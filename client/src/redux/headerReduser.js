const SET_COUNTER = 'headerReuser/SET-COUNTER';
const SET_SEARCHED = 'infoReuser/SET-SEARCHED';
const SET_SEARCHED_PAGE = 'infoReuser/SET-SEARCHED-PAGE';
const SET_REDIRECT = 'infoReuser/SET-REDIRECT';
const CLOSE_LIST = 'infoReuser/CLOSE_LIST';
const LOAD_LIST = 'infoReuser/LOAD_LIST';
const SET_REQ_NUMBER='infoReuser/SET_REQ_NUMBER'

let init = {
    count: localStorage.getItem("count"),
    requestNumber: 0,
    searched: { requestNumber: 0, request: [] },
    searchedPage: {},
    searchRedirect: true,
    isClosed: true,
    isListLoading: false
};

const headerReduser = (state = init, action) => {
    switch (action.type) {
        case SET_COUNTER:
            return { ...state, count: action.count }
        case SET_SEARCHED:
            let obj_1 = {};
            for (let i of action.searched.request) {
                obj_1[i.Cells.CommonName] = i
            }
            return { ...state, searched: { requestNumber: action.searched.requestNumber, request: obj_1 } }
        case SET_SEARCHED_PAGE:
            let obj_2 = {};
            for (let i of action.searchedPage) {
                obj_2[i.Cells.CommonName] = i
            }
            return { ...state, searchedPage: { ...obj_2 } }
        case SET_REDIRECT:
            return { ...state, searchRedirect: action.searchRedirect }
        case CLOSE_LIST:
            return { ...state, isClosed: action.isClosed }
        case LOAD_LIST:
            return { ...state, isListLoading: action.isListLoading }
        case SET_REQ_NUMBER:
            return { ...state, requestNumber: action.requestNumber }
        default:
            return state
    }
}

export const setCounter = (count) => ({ type: SET_COUNTER, count });
export const setSearched = (searched) => ({ type: SET_SEARCHED, searched })
export const setSearchedPage = (searchedPage) => ({ type: SET_SEARCHED_PAGE, searchedPage })
export const setSearchRedirect = (searchRedirect) => ({ type: SET_REDIRECT, searchRedirect })
export const toggleList = (isClosed) => ({ type: CLOSE_LIST, isClosed })
export const loadList = (isListLoading) => ({ type: LOAD_LIST, isListLoading })
export const setReqNumber = (requestNumber) => ({ type: SET_REQ_NUMBER, requestNumber })

export default headerReduser