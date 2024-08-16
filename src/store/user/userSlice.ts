import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IAuth, USerState, User } from "../../types/types"
import axios, { AxiosError } from "axios"
import { jwtDecode } from "jwt-decode"

export interface CustomError {
    response?: {
        data?: {
            message?: string
        }
    }
}

export const loginUser = createAsyncThunk<User, IAuth, {rejectValue: AxiosError}>('user/login', 
    async (payload, {rejectWithValue}) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}auth/login`, payload);
            localStorage.setItem('token', res.data.token);
            return jwtDecode(res.data.token)
        } catch (error: unknown) {
            console.log(error)
            return rejectWithValue((error as AxiosError));           
        }
    }
)

export const checkUser = createAsyncThunk('user/check', 
    async (_, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem('token')
            if(!token){
                return null;
            }            
            const res = await axios(`${import.meta.env.VITE_BASE_URL}auth/check`, {
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            localStorage.setItem('token', res.data.token)
            return jwtDecode(res.data.token)
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

const initialState: USerState = {
    currentUser: null,
    isAuth: false,
    status: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        logOut:(state)=>{
            state.currentUser = null,
            state.isAuth = false,
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.status = 'resolved';
            state.currentUser = action.payload;
            state.isAuth = true;
        })
        .addCase(loginUser.rejected, (state)=>{
            state.status = 'resolved';
        })
        .addCase(checkUser.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(checkUser.fulfilled, (state, action)=>{
            state.currentUser = action.payload;
            state.isAuth = true;
            if (action.payload) {
                state.status = 'resolved';
                state.currentUser = action.payload;
                state.isAuth = true;
            } else {
            state.status = 'resolved';
            state.isAuth = false;
            }
        })
        .addCase(checkUser.rejected, (state)=>{
            state.status = 'resolved';
            state.isAuth = false;
        })
    }
});

export const {logOut} = userSlice.actions;

export default userSlice.reducer;

