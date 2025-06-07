import { baseApi } from '../../services/baseApi';
import { setProfile } from './matrimonySlice';

export const matrimonyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // ✅ Create Matrimony Profile (with image upload)
        createMatrimonyProfile: builder.mutation<any, FormData>({
            query: (formData) => ({
                url: '/matrimony/create',
                method: 'POST',
                body: formData,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setProfile(data)); // from matrimonySlice
                } catch (err) {
                    console.log("getProfileByUserId, /matrimony/me", err);
                    // dispatch(setError("Failed to fetch profile"));
                }
            },

        }),

        // ✅ Update Profile with Image
        updateMatrimonyProfile: builder.mutation<any, { id: string; formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `/matrimony/update/${id}`,
                method: 'PUT',
                body: formData,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setProfile(data)); // from matrimonySlice
                } catch (err) {
                    console.log("getProfileByUserId, /matrimony/me", err);
                    // dispatch(setError("Failed to fetch profile"));
                }
            },
        }),

        // ✅ Get all profiles
        getAllProfiles: builder.query<any, void>({
            query: () => ({
                url: '/matrimony',
                method: 'GET',
            }),
        }),

        // ✅ Get single profile
        getProfileById: builder.query<any, string>({
            query: (id) => ({
                url: `/matrimony/${id}`,
                method: 'GET',
            }),
        }),


        getProfileByUserId: builder.mutation<any, string>({
            query: () => ({
                url: '/matrimony/me',
                method: 'GET',

            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setProfile(data)); // from matrimonySlice
                } catch (err) {
                    console.log("getProfileByUserId, /matrimony/me", err);
                    // dispatch(setError("Failed to fetch profile"));
                }
            },
        }),


        // ✅ Delete profile
        deleteProfile: builder.mutation<any, string>({
            query: (id) => ({
                url: `/matrimony/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useCreateMatrimonyProfileMutation,
    useUpdateMatrimonyProfileMutation,
    useGetProfileByUserIdMutation,
    useGetAllProfilesQuery,
    useGetProfileByIdQuery,
    useDeleteProfileMutation,
} = matrimonyApi;
