import { configureStore } from '@reduxjs/toolkit';
// import filter from '../reducers/filter';
import filter from '../components/heroesFilters/filterSlice'
import heroes from '../components/heroesList/heroesSlice';
const stringMiddleWare = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    } 
    return next(action)
}
// const store = createStore(combineReducers({heroes, filter}), 
// compose(applyMiddleware(ReduxThunk ,stringMiddleWare), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// );
const store = configureStore({
    reducer: {heroes, filter},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare),
    devTools: process.env.NODE_ENV !== 'production'
})
export default store;