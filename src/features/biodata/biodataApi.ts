import { baseApi } from '../../services/baseApi';
import { setUser } from '../user/userSlice';
import { addShearedBio } from './shearedSlice';

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
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log("getLikes, /biodata/shared", data?.success, data?.data?.sent);

                    if (data?.success){
                        dispatch(addShearedBio(data?.data?.sent || []));
                    }
                    // dispatch(setUser(data)); // from userSlice
                    // dispatch(addShearedBio(data));
                } catch (err) {
                    console.log("getLikes, /biodata/shared", err);
                    // dispatch(setError("Failed to fetch likes"));
                }
            },
        }),

        viewLikes: builder.query({
            query: (viewrprofileid) => ({
                url: `/biodata/view/${viewrprofileid}`,
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
        getBiodata: builder.query<any, string>({
            query: (id) => ({
                url: `/biodata/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useShareBioDataMutation, useLazyGetLikesQuery, useLazyViewLikesQuery, useRegisterMutation, useLazyGetBiodataQuery } = biodataApi;