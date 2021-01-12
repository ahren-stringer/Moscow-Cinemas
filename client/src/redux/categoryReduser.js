import * as axios from 'axios';

const SET_CATEGORY_DATA = 'categoryReuser/SET-CATEGORY-DATA';
const SET_NAMES = 'categoryReuser/SET-NAMES';
const TOTAL_COUNT = 'categoryReuser/TOTAL-COUNT';
const SET_PAGE = 'categoryReuser/SET-PAGE';
const SET_LIKED = 'categoryReuser/SET-LIKED';
//const CONCAT_CATEGORY_DATA = "categoryReuser/CONCAT_CATEGORY_DATA";
const SET_TYPE_TITLE = "categoryReuser/SET_TYPE_TITLE"
const SET_CATEGORY_COUNT = 'infoReuser/SET_CATEGORY_COUNT'
const SET_COUNTER = 'infoReuser/SET-COUNTER';

let init = {
    categoryData: [],
    names: [],
    liked: { ...localStorage },
    totalCount: 1,
    numberOfPage: 1,
    onOnePage: 12,
    request: true,
    typeTitle: '',
    categoryCount: 0,
    count: localStorage.getItem("count"),
};

const categoryReduser = (state = init, action) => {
    switch (action.type) {
        case SET_CATEGORY_DATA:
            return { ...state, categoryData: action.prevCategoryData.concat(action.categoryData) }
        case SET_NAMES:
            return { ...state, names: action.names }
        case TOTAL_COUNT:
            return { ...state, totalCount: action.totalCount }
        case SET_PAGE:
            return { ...state, numberOfPage: action.numberOfPage }
        case SET_LIKED:
            return { ...state, liked: action.liked }
        case SET_TYPE_TITLE:
            return { ...state, typeTitle: action.typeTitle }
        case SET_CATEGORY_COUNT: {
            return { ...state, categoryCount: action.categoryCount }
        }
        case SET_COUNTER:
            return { ...state, count: action.count }
        default:
            return state
    }
}

export const setCategoryData = (categoryData, prevCategoryData) => ({ type: SET_CATEGORY_DATA, categoryData, prevCategoryData });
// export const concatcategoryData = (categoryData) => ({ type: CONCAT_CATEGORY_DATA, categoryData });
export const setNames = (names) => ({ type: SET_NAMES, names });
export const SetTotalCount = (totalCount) => ({ type: TOTAL_COUNT, totalCount })
export const SetPageCount = (numberOfPage) => ({ type: SET_PAGE, numberOfPage })
export const Setliked = (liked) => ({ type: SET_LIKED, liked })
export const SetTypeTitle = (typeTitle) => ({ type: SET_TYPE_TITLE, typeTitle })
export const setCategoryCount = (categoryCount) => ({ type: SET_CATEGORY_COUNT, categoryCount })
export const setCounter = (count) => ({ type: SET_COUNTER, count });

export const setCategoryDataThunk = (type,limit,skip, prevCategoryData) =>
    async (dispatch) => {
        let req = await axios.get(`/place_category/places/some/${type}/${limit}/${skip}`)
        debugger
        if (skip==0){
            dispatch(setCategoryData(req.data, []))
        }else{
            dispatch(setCategoryData(req.data, prevCategoryData))
        }
        dispatch(SetTypeTitle(req.data[0].placeCategory))

    }

export const setCategoryCountThunk = (type) =>
    async (dispatch) => {
        let req = await axios.get(`/place_category/places/category_count/${type}`)
        dispatch(setCategoryCount(req.data))
    }

export const likedThunk = (name, item) =>
    async (dispatch) => {
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

export default categoryReduser