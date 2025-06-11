import { baseApi } from '../../services/baseApi';
import { setUser } from '../user/userSlice';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<any, { mobile: string; password: string }>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data)); // from matrimonySlice
                } catch (err) {
                    console.log("getProfileByUserId, /matrimony/me", err);
                    // dispatch(setError("Failed to fetch profile"));
                }
            },
        }),
        register: builder.mutation<any, { mobile: string; password: string }>({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;