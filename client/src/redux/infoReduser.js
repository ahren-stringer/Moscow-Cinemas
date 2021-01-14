import { InfoAPI } from '../API/api';

const SET_INFO_DATA = 'infoReuser/SET-INFO-DATA';
const SET_FEATURES = 'infoReuser/SET-FEATURES';
const SET_NEW_TEXT = 'infoReuser/SET-NEW-TEXT';
const SET_COMENT = 'infoReuser/SET-COMENT';
const TOTAL_COUNT = 'infoReuser/TOTAL-COUNT';
const SET_PAGE = 'infoReuser/SET-PAGE';

let init = {
    infoData: null,
    features: null,
    newComentText: '',
    coments: null,
    totalCount: null,
    numberOfPage: 1,
    onOnePage: 5,
};

const infoReduser = (state = init, action) => {
    switch (action.type) {
        case SET_INFO_DATA:
            return { ...state, infoData: action.infoData }
        case SET_COMENT:
            return { ...state, coments: action.coments }
        case SET_FEATURES:
            return { ...state, features: action.features }
        case SET_NEW_TEXT:
            return { ...state, newComentText: action.text }
        case TOTAL_COUNT: {
            return { ...state, totalCount: action.totalCount }
        }
        case SET_PAGE: {
            return { ...state, numberOfPage: action.numberOfPage }
        }
        default:
            return state
    }
}

export const setInfoData = (infoData) => ({ type: SET_INFO_DATA, infoData });
export const setFeatures = (features) => ({ type: SET_FEATURES, features });
export const ComentChange = (text) => ({ type: SET_NEW_TEXT, text })
export const setComents = (coments) => ({ type: SET_COMENT, coments })
export const SetTotalCount = (totalCount) => ({ type: TOTAL_COUNT, totalCount })
export const SetPageCount = (numberOfPage) => ({ type: SET_PAGE, numberOfPage })

export const setInfoDataThunk = (id,onOnePage,numberOfPage) =>
    async (dispatch) => {
        let placesReq = await InfoAPI.getPlaces(id)
        dispatch(setInfoData(placesReq))
        let pop = +placesReq[0].popular + 1;
        await InfoAPI.putPopular(placesReq,pop)
        // Коменты
        let comentsReq = await InfoAPI.getComents(placesReq[0].name,onOnePage,numberOfPage)
        dispatch(setComents(comentsReq))
        // Количество коментов
        let comentsCountReq = await InfoAPI.getComentsCount(placesReq)
        dispatch(SetTotalCount(comentsCountReq))
    }

export default infoReduser