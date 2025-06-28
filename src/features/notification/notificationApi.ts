import { baseApi } from '../../services/baseApi';

export const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sendProfileViewedNotification: builder.query({
            query: (profileId: string) => ({
                url: `/notifications/profile-viewed?profileId=${profileId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useLazySendProfileViewedNotificationQuery
} = notificationApi;
