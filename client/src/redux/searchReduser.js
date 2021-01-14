import { SearchAPI } from '../API/api';

const SET_SEARCHED = 'headerReuser/SET-SEARCHED';
const SET_SEARCHED_PAGE = 'headerReuser/SET-SEARCHED-PAGE';
const SET_REDIRECT = 'headerReuser/SET-REDIRECT';
const CLOSE_LIST = 'headerReuser/CLOSE_LIST';
const LOAD_LIST = 'headerReuser/LOAD_LIST';
const SET_REQ_NUMBER = 'headerReuser/SET_REQ_NUMBER';
const SET_SEARCHED_ARR = 'headerReuser/SET_SEARCHED_ARR'
const SET_NEW_TEXT = 'categoryReuser/SET-NEW-TEXT';

let init = {
    requestNumber: 1,
    searched: { requestNumber: 0, request: [] },
    searchedArr: [],
    searchedPage: [],
    searchRedirect: true,
    isClosed: true,
    isListLoading: false,
    newSearchText: '',
}

const searchReduser = (state = init, action) => {
    switch (action.type) {
        case SET_SEARCHED:
            return { ...state, searched: { requestNumber: action.searched.requestNumber, request: action.searched.request } }
        case SET_SEARCHED_PAGE:
            return { ...state, searchedPage: action.searchedPage }
        case SET_REDIRECT:
            return { ...state, searchRedirect: action.searchRedirect }
        case CLOSE_LIST:
            return { ...state, isClosed: action.isClosed }
        case LOAD_LIST:
            return { ...state, isListLoading: action.isListLoading }
        case SET_REQ_NUMBER:
            return { ...state, requestNumber: action.requestNumber }
        case SET_NEW_TEXT:
            return { ...state, newSearchText: action.text }
        default:
            return state
    }
}

export const setSearched = (searched) => ({ type: SET_SEARCHED, searched })
export const setSearchedPage = (searchedPage) => ({ type: SET_SEARCHED_PAGE, searchedPage })
export const setSearchRedirect = (searchRedirect) => ({ type: SET_REDIRECT, searchRedirect })
export const toggleList = (isClosed) => ({ type: CLOSE_LIST, isClosed })
export const loadList = (isListLoading) => ({ type: LOAD_LIST, isListLoading })
export const setReqNumber = (requestNumber) => ({ type: SET_REQ_NUMBER, requestNumber })
export const setSearchedArr = (searchedArr) => ({ type: SET_SEARCHED_ARR, searchedArr})
export const SearchChange = (text) => ({ type: SET_NEW_TEXT, text })

export const searchThunk = (search, requestNumber) =>
    async (dispatch) => {
        dispatch(setReqNumber(+requestNumber + 1))
        dispatch(SearchChange(search))
        dispatch(toggleList(true))
        dispatch(loadList(true))

        let req = await SearchAPI.getSearchList(search)
        dispatch(setReqNumber(+requestNumber + 1))
        dispatch(setSearched({ requestNumber, request: req }))

        dispatch(loadList(false))
        //dispatch(toggleList(true))
    }

export const CloseListThunk = () =>
    async (dispatch) => {
        dispatch(setSearched({ requestNumber: 0, request: [] }))
    }

export default searchReduser