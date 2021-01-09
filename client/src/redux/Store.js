import infoReduser from "./infoReduser";
import categoryReduser from "./categoryReduser";
import searchReduser from "./searchReduser";
import thunkMiddleware from "redux-thunk"
import authReduser from "./authReduser";
import { reducer as formReducer } from 'redux-form'
import popularReduser from "./popularReduser";

const { createStore, combineReducers, applyMiddleware } = require("redux");

let redusers= combineReducers({
    infoData: infoReduser,
    categoryData:categoryReduser,
    search: searchReduser,
    auth: authReduser,
    form: formReducer,
    popularData:popularReduser
});

let store=createStore(redusers,applyMiddleware(thunkMiddleware));

export default store