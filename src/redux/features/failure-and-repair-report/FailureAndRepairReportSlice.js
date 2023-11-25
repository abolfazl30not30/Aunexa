import { apiSlice } from "../../api/apiSlice";

export const FailureAndRepairReportSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFailureVehicles: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `vehicle/machine/filter?status=DESTROYED&page=${
          page - 1
        }&size=10&sort=purchaseDate,${sort}&${filterItem}`,
      }),
      providesTags: ["failure-vehicle"],
    }),
    saveFailureVehicles: builder.mutation({
      query: (body) => ({
        url: "vehicle/machine-report",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["failure-vehicle"],
    }),
  }),
});

export const { useGetAllFailureVehiclesQuery, useSaveFailureVehiclesMutation } =
  FailureAndRepairReportSlice;
