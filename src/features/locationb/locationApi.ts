// services/apis/biodataApi.ts or similar

import { baseApi } from '../../services/baseApi';

export const biodataApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLocation: builder.query<any, { lat: number; lon: number }>({
            query: ({ lat, lon }) => ({
                url: `/location/update-location`,
                method: 'GET',
                params: {
                    format: 'json',
                    lat,
                    lon,
                },
            }),
        }),
    }),
});

export const { useGetLocationQuery } = biodataApi;
