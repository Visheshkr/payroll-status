
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'; 
import reducers from './reducers/index';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {  key: "root",  version: 1,storage,};
const persistedReducer = persistReducer(persistConfig, reducers);
// const store = createStore(reducers, applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__());
//const store = createStore(reducers, applyMiddleware(thunk));
const store = createStore(persistedReducer, applyMiddleware(thunk));
// console.log("List of reducers: ", store.getState());
export default store; 
