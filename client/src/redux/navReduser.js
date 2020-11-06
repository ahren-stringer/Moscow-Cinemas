const SET_NAV_DATA = 'navReuser/SET-NAV-DATA';
const SET_NAMES = 'navReuser/SET-NAMES';
const SET_NEW_TEXT = 'navReuser/SET-NEW-TEXT';
const TOTAL_COUNT='navReuser/TOTAL-COUNT';
const SET_PAGE='navReuser/SET-PAGE';

let init = {
    navData: null,
    names: [],
    newSearchText: '',
    liked: { ...localStorage },
    totalCount: 1,
    numberOfPage: 0,
    onOnePage: 5,
};

const navReduser = (state = init, action) => {
    switch (action.type) {
        case SET_NAV_DATA:
            return { ...state, navData: action.navData }
        case SET_NAMES:
            return { ...state, names: action.names }
        case SET_NEW_TEXT:
            return { ...state, newSearchText: action.text }
        case TOTAL_COUNT:
            return { ...state, totalCount: action.totalCount }
        case SET_PAGE: 
            return { ...state, numberOfPage: action.numberOfPage }
        default:
            return state
    }
}

export const setNavData = (navData) => ({ type: SET_NAV_DATA, navData });
export const setNames = (names) => ({ type: SET_NAMES, names });
export const SearchChange = (text) => ({ type: SET_NEW_TEXT, text })
export const SetTotalCount=(totalCount)=> ({type: TOTAL_COUNT, totalCount})
export const SetPageCount=(numberOfPage)=> ({type: SET_PAGE, numberOfPage})

export default navReduser