import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import { api } from "./api/api";
import chatSlice from "./chat/chatSlice";

export const store = configureStore({
    reducer:{
        [api.reducerPath]: api.reducer,
        user: userSlice,
        chat: chatSlice
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(api.middleware), 
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch