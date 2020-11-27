const SET_INFO_DATA = 'infoReuser/SET-INFO-DATA';
const SET_FEATURES = 'infoReuser/SET-FEATURES';
const SET_NEW_TEXT = 'infoReuser/SET-NEW-TEXT';
const SET_COMENT = 'infoReuser/SET-COMENT';

let init = {
    infoData: null,
    features: null,
    newComentText: '',
    coment: '',
};

const infoReduser = (state = init, action) => {
    debugger
    switch (action.type) {
        case SET_INFO_DATA:
            return { ...state, infoData: action.infoData }
        case SET_COMENT:
            return { ...state, coment: action.coment }
        case SET_FEATURES:
            return { ...state, features: action.features }
        case SET_NEW_TEXT:
            return { ...state, newComentText: action.text }
        default:
            return state
    }
}

export const setInfoData = (infoData) => ({ type: SET_INFO_DATA, infoData });
export const setFeatures = (features) => ({ type: SET_FEATURES, features });
export const ComentChange = (text) => ({ type: SET_NEW_TEXT, text })
export const setComent = (coment) => ({ type: SET_COMENT, coment })

export default infoReduser