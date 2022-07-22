import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filterAdapter = createEntityAdapter({
    selectId: filter => filter.name
});
// const initialState = {
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     activeFilter: 'all'
// }

export const fetchFilter = createAsyncThunk(
    'filters/fetchFilter',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/filters");
    }
);

const initialState = filterAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
});

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filtersFetchingError: state => {state.filtersLoadingStatus = 'error'},
        activeFilterChanged: (state, action) => {state.activeFilter = action.payload}
    },
    extraReducers: (bulder) => {
        bulder
            .addCase(fetchFilter.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilter.fulfilled,  (state, action) => {
                state.filtersLoadingStatus = 'idle'
                filterAdapter.setAll(state, action.payload)})
            .addCase(fetchFilter.rejected, state => {state.filtersLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = filterSlice

export const {selectAll} = filterAdapter.getSelectors(state => state.filter);

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged
} = actions