import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    shearedBio: string[];
}

const initialState: UserState = {
    shearedBio: [],
};

const userSlice = createSlice({
    name: 'shearedBio',
    initialState,
    reducers: {
        addShearedBio: (state, action: PayloadAction<string>) => {
            state.shearedBio = [...action.payload];
        },
        removeShearedBio: (state, action: PayloadAction<string>) => {
            state.shearedBio = state.shearedBio.filter(bio => bio !== action.payload);
        },
    },
});

export const { addShearedBio, removeShearedBio } = userSlice.actions;
export const selectShearedBio = (state: { shearedBio: UserState }) => state.shearedBio.shearedBio;
export default userSlice.reducer;
