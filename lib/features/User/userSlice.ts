'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserState {
    fullName: string;
    email: string;
    accessToken:string,
    storageLimit:number
    storageUsed:number
}

const initialState: UserState = {
    fullName: '',
    email: '',
    accessToken:'',
    storageLimit:0,
    storageUsed:0
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserState: (state, action: PayloadAction<UserState>) => {
            
            state.fullName = action.payload.fullName;
            state.email = action.payload.email;
            state.accessToken = action.payload.accessToken;
            state.storageLimit = action.payload.storageLimit;
            state.storageUsed = action.payload.storageUsed; 
        },
        updateUserStorage:(state , action:PayloadAction<{size:number}>)=>{
            console.log(action.payload.size);
            
            state.storageUsed += action.payload.size;
        },
        logoutUser: (state) => {
            state.fullName = '';
            state.email = '';
            state.accessToken = '';
        },
    },
});

export const selectUser = (state:RootState) => state.user;
export const storageLimit = (state:RootState) => state.user.storageLimit;
export const storageUsed = (state:RootState) => state.user.storageUsed;
export const { setUserState, logoutUser,updateUserStorage } = userSlice.actions;

export default userSlice.reducer;