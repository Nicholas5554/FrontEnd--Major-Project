import { combineReducers, configureStore } from "@reduxjs/toolkit/react";
import userSlice from "./userSlice";
import searchSlice from "./SearchSlice";



const store = configureStore({
    reducer: { userSlice, searchSlice },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        });
    },
});

const rootReducer = combineReducers({ userSlice, searchSlice });
export type TRootState = ReturnType<typeof rootReducer>;
export default store;
