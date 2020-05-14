import { createStore, combineReducers } from "redux";
import shopReducer from './shopReducer';

// с заделом на расширение функционала сразу беру комбайнер редьюсеров
let reducers = combineReducers({
    shopPage: shopReducer
});

let store = createStore(reducers);

export default store;

window.store = store