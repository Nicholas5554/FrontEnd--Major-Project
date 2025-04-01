import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialSearch = {
    search: ""
}

const searchSlice = createSlice({
    name: "search",
    initialState: initialSearch,
    reducers: { //actions
        searchWord: (state: TSearchState, action: PayloadAction<string>) => {
            state.search = action.payload;
        }
    }
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
export type TSearchState = typeof initialSearch;