import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    user: any | null;
    token: string | null;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    user: null,
    token: null,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<{ user: any; token: string }>
        ) => {
            console.log("action.payload.user", action.payload)
            state.user = action.payload?.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
