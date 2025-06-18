import { baseApi } from '../../services/baseApi';
import { setUser } from '../user/userSlice';

export const biodataApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        shareBioData: builder.mutation({
            query: (data) => ({
                url: '/biodata/share',
                method: 'POST',
                body: data,
            }),
        }),

        getLikes: builder.query<any, string>({
            query: () => ({
                url: `/biodata/shared`,
                method: 'GET',
            }),
        }),
        // /shared
        register: builder.mutation<any, { mobile: string; password: string }>({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useShareBioDataMutation, useLazyGetLikesQuery, useRegisterMutation } = biodataApi;