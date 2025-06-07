import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

interface MatrimonyProfile {
    personalDetails?: Record<string, any>;
    religiousDetails?: Record<string, any>;
    familyDetails?: Record<string, any>;
    educationDetails?: Record<string, any>;
    professionalDetails?: Record<string, any>;
    contactDetails?: Record<string, any>;
    lifestyleDetails?: Record<string, any>;
    expectation?: Record<string, any>;
    profilePhotos?: string[];
    verificationImage?: string;
    userId?: string;
}

interface MatrimonyState {
    profile: MatrimonyProfile | null;

}

const initialState: MatrimonyState = {
    profile: null,

};

const matrimonySlice = createSlice({
    name: 'matrimony',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<MatrimonyProfile>) => {
            state.profile = action.payload;
        },
        // clearProfile: (state) => {
        //     state.profile = null;
        //     state.error = null;
        // },

    },
});

const getMatrimony = () => {
    const matrimony = useSelector((state: any) => state.matrimony);
    return matrimony?.profile?.data || {};
}

export const { setProfile } = matrimonySlice.actions;
export { getMatrimony }
export default matrimonySlice.reducer;
