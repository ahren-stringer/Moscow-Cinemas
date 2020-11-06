import infoReduser from "./infoReduser";
import navReduser from "./navReduser";
import headerReduser from "./headerReduser";
import thunkMiddleware from "redux-thunk"
//import { reducer as formReducer } from 'redux-form'

const { createStore, combineReducers, applyMiddleware } = require("redux");

let redusers= combineReducers({
    infoData: infoReduser,
    navData:navReduser,
    header: headerReduser,
    //form: formReducer
});

let store=createStore(redusers,applyMiddleware(thunkMiddleware));

export default store