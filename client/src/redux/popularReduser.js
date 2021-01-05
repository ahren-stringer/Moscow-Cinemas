const SET_POPULAR = 'popularReuser/SET_POPULAR';

let init = {
    popular:null
};

const popularReduser = (state = init, action) => {
    switch (action.type) {
        case SET_POPULAR:
            return { ...state, popular: action.popular }
        default:
            return state
    }
}

export const setPopular = (popular) => ({ type: SET_POPULAR, popular });

export default popularReduser