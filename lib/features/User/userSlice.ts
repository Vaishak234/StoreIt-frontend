'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserState {
    fullName: string;
    email: string;
    accessToken:string
}

const initialState: UserState = {
    fullName: '',
    email: '',
    accessToken:''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserState: (state, action: PayloadAction<UserState>) => {
            state.fullName = action.payload.fullName;
            state.email = action.payload.email;
            state.accessToken = action.payload.accessToken;
            
        },
        logoutUser: (state) => {
            state.fullName = '';
            state.email = '';
            state.accessToken = '';
        },
    },
});

export const selectUser = (state:RootState) => state.user;
export const { setUserState, logoutUser } = userSlice.actions;

export default userSlice.reducer;