import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../app/store';
import { logout, setCredentials } from '../features/auth/authSlice';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { FetchArgs, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { setUser } from '../features/user/userSlice';
const BASE_URL =
    import.meta.env.PROD
        ? import.meta.env.VITE_BASE_URL
        : 'https://api.joodi.in/api/v1';

const baseQuery = fetchBaseQuery({
    // baseUrl: 'http://localhost:5000/api/v1',
    credentials: 'include',
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).user.token;
        console.log('token', token)
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // try refreshing the token
        const refreshResult = await baseQuery(
            { url: '/auth/refresh-token', method: 'POST' },
            api,
            extraOptions
        );

        if (refreshResult.data) {
            const { user, accessToken } = refreshResult.data as any;

            // console.log('token', token);

            // const { user, accessToken } = data?.data || {}
            // dispatch(setUser({ user, token: accessToken }));

            api.dispatch(setUser({ user, token: accessToken }));

            // retry the original query with new token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Biodata-sheared'], // REGISTER your tag types here
    endpoints: () => ({}),
});