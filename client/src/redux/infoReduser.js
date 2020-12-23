const SET_INFO_DATA = 'infoReuser/SET-INFO-DATA';
const SET_FEATURES = 'infoReuser/SET-FEATURES';
const SET_NEW_TEXT = 'infoReuser/SET-NEW-TEXT';
const SET_COMENT = 'infoReuser/SET-COMENT';
const TOTAL_COUNT='infoReuser/TOTAL-COUNT';
const SET_PAGE='infoReuser/SET-PAGE';

let init = {
    infoData: null,
    features: null,
    newComentText: '',
    coment: '',
    totalCount: 1,
    numberOfPage: 1,
    onOnePage: 5,
};

const infoReduser = (state = init, action) => {
    switch (action.type) {
        case SET_INFO_DATA:
            return { ...state, infoData: action.infoData }
        case SET_COMENT:
            return { ...state, coment: action.coment }
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
export const setComent = (coment) => ({ type: SET_COMENT, coment })
export const SetTotalCount=(totalCount)=> ({type: TOTAL_COUNT, totalCount})
export const SetPageCount=(numberOfPage)=> ({type: SET_PAGE, numberOfPage})

export default infoReduser