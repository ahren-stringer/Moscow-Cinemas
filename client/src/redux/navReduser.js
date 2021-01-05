const SET_NAV_DATA = 'navReuser/SET-NAV-DATA';
const SET_NAMES = 'navReuser/SET-NAMES';
const SET_NEW_TEXT = 'navReuser/SET-NEW-TEXT';
const TOTAL_COUNT = 'navReuser/TOTAL-COUNT';
const SET_PAGE = 'navReuser/SET-PAGE';
const SET_LIKED = 'navReuser/SET-LIKED';
const CONCAT_NAV_DATA = "navReuser/CONCAT_NAV_DATA";
const SET_TYPE_TITLE = "navReuser/SET_TYPE_TITLE"
const SET_POPULAR = "navReuser/SET_POPULAR"
const SET_CATEGORY_COUNT='infoReuser/SET_CATEGORY_COUNT'
const SET_COUNTER = 'infoReuser/SET-COUNTER';

let init = {
    navData: [],
    names: [],
    newSearchText: '',
    liked: { ...localStorage },
    totalCount: 1,
    numberOfPage: 2,
    onOnePage: 12,
    request: true,
    typeTitle: '',
    popular: null,
    categoryCount:0,
    count: localStorage.getItem("count"),
};

const navReduser = (state = init, action) => {
    switch (action.type) {
        case SET_NAV_DATA:
            return { ...state, navData: action.prevNanData.concat(action.navData) }
        case SET_NAMES:
            return { ...state, names: action.names }
        case SET_NEW_TEXT:
            return { ...state, newSearchText: action.text }
        case TOTAL_COUNT:
            return { ...state, totalCount: action.totalCount }
        case SET_PAGE:
            return { ...state, numberOfPage: action.numberOfPage }
        case SET_LIKED:
            return { ...state, liked: action.liked }
        case SET_TYPE_TITLE:
            return { ...state, typeTitle: action.typeTitle }
        case SET_POPULAR:
            return { ...state, popular: action.popular }
        case SET_CATEGORY_COUNT: {
            return { ...state, categoryCount: action.categoryCount }
        }
        case SET_COUNTER:
            return { ...state, count: action.count }
        default:
            return state
    }
}

export const setNavData = (navData, prevNanData) => ({ type: SET_NAV_DATA, navData, prevNanData });
export const concatNavData = (navData) => ({ type: CONCAT_NAV_DATA, navData });
export const setNames = (names) => ({ type: SET_NAMES, names });
export const SearchChange = (text) => ({ type: SET_NEW_TEXT, text })
export const SetTotalCount = (totalCount) => ({ type: TOTAL_COUNT, totalCount })
export const SetPageCount = (numberOfPage) => ({ type: SET_PAGE, numberOfPage })
export const Setliked = (liked) => ({ type: SET_LIKED, liked })
export const SetTypeTitle = (typeTitle) => ({ type: SET_TYPE_TITLE, typeTitle })
export const SetPopular = (popular) => ({ type: SET_POPULAR, popular })
export const setCategoryCount = (categoryCount) => ({ type: SET_CATEGORY_COUNT, categoryCount })
export const setCounter = (count) => ({ type: SET_COUNTER, count });

export const likedThunk=(name, item)=>
    async (dispatch)=>{
        let counter = +localStorage.getItem('count');
        if (localStorage.getItem(name)) {
            localStorage.removeItem(name)
            counter = counter - 1
            localStorage.setItem('count', counter)
            dispatch(Setliked({ ...localStorage }))
        } else {
            localStorage.setItem(name, JSON.stringify(item))
            counter = counter + 1
            localStorage.setItem('count', counter)
            dispatch(Setliked({ ...localStorage }))
        }
        dispatch(setCounter(counter))
  }

export default navReduser