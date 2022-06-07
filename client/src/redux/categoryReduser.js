import {CategoryAPI} from '../API/api'

const SET_CATEGORY_DATA = 'categoryReuser/SET-CATEGORY-DATA';
const SET_NAMES = 'categoryReuser/SET-NAMES';
const TOTAL_COUNT = 'categoryReuser/TOTAL-COUNT';
const SET_PAGE = 'categoryReuser/SET-PAGE';
const SET_LIKED = 'categoryReuser/SET-LIKED';
const SET_TYPE_TITLE = "categoryReuser/SET_TYPE_TITLE"
const SET_CATEGORY_COUNT = 'infoReuser/SET_CATEGORY_COUNT'
const SET_COUNTER = 'infoReuser/SET-COUNTER';

let count;
if (localStorage.getItem('likedStore')){
    count=JSON.parse(localStorage.getItem('likedStore')).counter
}else{
    count=0
}

let init = {
    categoryData: [],
    names: [],
    liked: { ...JSON.parse(localStorage.getItem('likedStore')) },
    totalCount: 1,
    numberOfPage: 1,
    onOnePage: 12,
    request: true,
    typeTitle: '',
    categoryCount: 0,
    count,
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
export const setNames = (names) => ({ type: SET_NAMES, names });
export const SetTotalCount = (totalCount) => ({ type: TOTAL_COUNT, totalCount })
export const SetPageCount = (numberOfPage) => ({ type: SET_PAGE, numberOfPage })
export const Setliked = (liked) => ({ type: SET_LIKED, liked })
export const SetTypeTitle = (typeTitle) => ({ type: SET_TYPE_TITLE, typeTitle })
export const setCategoryCount = (categoryCount) => ({ type: SET_CATEGORY_COUNT, categoryCount })
export const setCounter = (count) => ({ type: SET_COUNTER, count });

export const setCategoryDataThunk = (type,limit,skip, prevCategoryData) =>
    async (dispatch) => {
        let req = await CategoryAPI.getCategoryData(type,limit,skip)
        if (skip==0){
            dispatch(setCategoryData(req, []))
        }else{
            dispatch(setCategoryData(req, prevCategoryData))
        }
        dispatch(SetTypeTitle(req[0].placeCategory))

    }

export const setCategoryCountThunk = (type) =>
    async (dispatch) => {
        let req = await CategoryAPI.getCategoryCount(type)
        dispatch(setCategoryCount(req))
    }
export const likedThunk = (name, item) =>
    async (dispatch) => {
        
        let likedStore=localStorage.getItem('likedStore');

        if(!likedStore){
            localStorage.setItem('likedStore',JSON.stringify({
                counter:0,
                places:{}
            }))
        }

        let counter = +JSON.parse(localStorage.getItem('likedStore')).counter;

        let places=JSON.parse(localStorage.getItem('likedStore')).places;


        if (name in places) {
            delete places[name]  //localStorage.removeItem(name)  
            counter = counter - 1
            localStorage.setItem('likedStore',JSON.stringify({
                counter,
                places
            }))
            dispatch(Setliked({ ...JSON.parse(localStorage.getItem('likedStore')) }))
        } else {
            //localStorage.setItem(name, JSON.stringify(item))
            counter = counter + 1
            //localStorage.setItem('count', counter)

            localStorage.setItem('likedStore',JSON.stringify({
                counter,
                places:{...places,[name]:item}
            }))

            dispatch(Setliked({ ...JSON.parse(localStorage.getItem('likedStore')) }))
        }
        dispatch(setCounter(counter))
    }

export default categoryReduser