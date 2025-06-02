import { baseApi } from '../../services/baseApi';

export const matrimonyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // ✅ Create Matrimony Profile (with image upload)
        createMatrimonyProfile: builder.mutation<any, FormData>({
            query: (formData) => ({
                url: '/matrimony/create',
                method: 'POST',
                body: formData,
            }),
        }),

        // ✅ Update Profile with Image
        updateMatrimonyProfile: builder.mutation<any, { id: string; data: FormData }>({
            query: ({ id, data }) => ({
                url: `/matrimony/${id}`,
                method: 'PUT',
                body: data,
            }),
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
    useGetAllProfilesQuery,
    useGetProfileByIdQuery,
    useDeleteProfileMutation,
} = matrimonyApi;
