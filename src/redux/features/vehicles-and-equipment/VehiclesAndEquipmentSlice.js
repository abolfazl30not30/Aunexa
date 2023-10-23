
import { apiSlice } from "../../api/apiSlice";

export const VehiclesAndEquipmentSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAll: builder.query({
            query: ({page, sort ,filterItem}) => ({
                url:`vehicle/machine?page=${page - 1}&size=10&sort=date,${sort}&sort=time,${sort}&${filterItem}`,
            }),
            providesTags: ['vehicle-machine']
        }),
        save: builder.mutation({
            query: (body) => ({
                url: 'vehicle/machine',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['vehicle-machine']
        }),
        update: builder.mutation({
            query: (body) => ({
                url: `vehicle/machine`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['vehicle-machine']
        }),
        delete: builder.mutation({
            query: ( id ) => ({
                url: `vehicle/machine/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['vehicle-machine']
        }),
    })
})

export const {
    useGetAllQuery,
    useSaveMutation,
    useUpdateMutation,
    useDeleteMutation
} = VehiclesAndEquipmentSlice