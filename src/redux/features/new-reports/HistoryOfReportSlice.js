import { apiSlice } from "@/redux/api/apiSlice";

export const HistoryOfReportSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllHistoryOfReport: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `vehicle/report-history/filter?page=${
          page - 1
        }&size=10&sort=date,${sort}&sort=time,${sort}&${filterItem}`,
      }),
      providesTags: ["report-history"],
    }),
  }),
});

export const { useGetAllHistoryOfReportQuery } = HistoryOfReportSlice;
