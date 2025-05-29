import { baseApi } from '../../services/baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<any, { email: string; password: string }>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation } = authApi;