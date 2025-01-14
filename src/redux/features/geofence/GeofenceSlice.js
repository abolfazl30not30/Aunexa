import { apiSlice } from "../../api/apiSlice";

export const GeofenceSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllGeofence: builder.query({
            query: ({ page, sort, filterItem }) => ({
                url: `golgohar/geo-fence/filter?page=${
                    page - 1
                }&size=10&sort=date,${sort}&sort=time,${sort}&${filterItem}`,
            }),
            providesTags: ["geofence"],
        }),
        getAllGeofenceList: builder.query({
            query: () => ({
                url: `golgohar/geo-fence/find-all`,
            }),
            providesTags: ["geofence"],
        }),
        saveGeofence: builder.mutation({
            query: (body) => ({
                url: "golgohar/geo-fence",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["geofence"],
        }),
        updateGeofence: builder.mutation({
            query: (body) => ({
                url: `golgohar/geo-fence`,
                method: "PUT",
                body: body,
            }),
            invalidatesTags: ["geofence"],
        }),
        deleteGeofence: builder.mutation({
            query: (id) => ({
                url: `golgohar/geo-fence/${id}`,
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ["geofence"],
        }),
    }),
});

export const {
    useGetAllGeofenceListQuery,
    useGetAllGeofenceQuery,
    useSaveGeofenceMutation,
    useUpdateGeofenceMutation,
    useDeleteGeofenceMutation,
} = GeofenceSlice;
