import { apiSlice } from "@/redux/api/apiSlice";

export const NewReportsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNewReports: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `vehicle/report/filter?page=${page - 1}&size=10&${filterItem}`,
      }),
      providesTags: ["new-reports"],
    }),
    getAllGPSPoint: builder.query({
      query: ({ filterItem }) => ({
        url: `vehicle/gps/filter?${filterItem}`,
      }),
      providesTags: ["new-reports"],
    }),
    saveNewReports: builder.mutation({
      query: (body) => ({
        url: "vehicle/report-history",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["new-reports"],
    }),
  }),
});

export const { useGetAllNewReportsQuery, useSaveNewReportsMutation, useLazyGetAllGPSPointQuery } = NewReportsSlice;
