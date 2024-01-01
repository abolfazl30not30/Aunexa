import { apiSlice } from "../../api/apiSlice";

export const VehiclesAndEquipmentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVehicles: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `party/machine/filter?page=${
          page - 1
        }&size=10&sort=purchaseDate,${sort}&${filterItem}`,
      }),
      providesTags: ["vehicle-machine"],
    }),
    saveVehicles: builder.mutation({
      query: (body) => ({
        url: "party/machine",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["vehicle-machine"],
    }),
    updateVehicles: builder.mutation({
      query: (body) => ({
        url: `party/machine`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["vehicle-machine"],
    }),
    deleteVehicles: builder.mutation({
      query: (id) => ({
        url: `party/machine/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["vehicle-machine"],
    }),
    getOneVehiclesByTag: builder.query({
      query: (tag) => ({
        url: `party/machine/tag/${tag}`,
      }),
      providesTags: ["vehicle-machine"],
    }),
    getOneVehiclesByCode: builder.query({
      query: (code) => ({
        url: `party/machine/code/${code}`,
      }),
      providesTags: ["vehicle-machine"],
    }),
  }),
});

export const {
  useGetAllVehiclesQuery,
  useSaveVehiclesMutation,
  useUpdateVehiclesMutation,
  useDeleteVehiclesMutation,
  useLazyGetOneVehiclesByTagQuery,
  useLazyGetOneVehiclesByCodeQuery,
} = VehiclesAndEquipmentSlice;
