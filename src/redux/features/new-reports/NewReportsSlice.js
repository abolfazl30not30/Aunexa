import { apiSlice } from "@/redux/api/apiSlice";

export const NewReportsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNewReports: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `golgohar/report/filter?page=${page - 1}&size=10&${filterItem}`,
      }),
      providesTags: ["new-reports"],
    }),

    getAllGPSPoint: builder.query({
      query: ({ filterItemForGps }) => ({
        url: `golgohar/gps/find-all/filter?${filterItemForGps}`,
      }),
      providesTags: ["new-reports"],
    }),

  }),
});

export const { useGetAllNewReportsQuery, useGetAllGPSPointQuery } = NewReportsSlice;
