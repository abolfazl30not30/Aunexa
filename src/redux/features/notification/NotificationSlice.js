import { apiSlice } from "../../api/apiSlice";

export const NotificationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotificationList: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `notification/filter?page=${
          page - 1
        }&size=10&sort=date,${sort}&sort=time,${sort}&${filterItem}&${window.sessionStorage.getItem(
          "subOrganizationId"
        )}`,
      }),
      providesTags: ["notification"],
    }),
    getCheckAllNotificationList: builder.query({
      query: () => ({
        url: `notification/check-all`,
      }),
      providesTags: ["notification"],
    }),
  }),
});

export const {
  useGetAllNotificationListQuery,
  useGetCheckAllNotificationListQuery,
} = NotificationSlice;
