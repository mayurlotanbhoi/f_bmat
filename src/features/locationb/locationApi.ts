// services/apis/biodataApi.ts or similar

import { baseApi } from '../../services/baseApi';

export const biodataApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLocation: builder.query<any, { lat: number; lon: number }>({
            query: ({ lat, lon }) => ({
                url: `/location/get-location`,
                method: 'GET',
                params: {
                    format: 'json',
                    lat,
                    lon,
                },
            }),
        }),

        updateInitialdetails: builder.mutation({
            query: (data) => ({
                url: `/location/update-initial-details`,
                method: 'POST',
                body: data,

            }),
        })
    }),
});

export const { useGetLocationQuery, useUpdateInitialdetailsMutation } = biodataApi;
