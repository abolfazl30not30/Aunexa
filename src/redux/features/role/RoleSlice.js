import { apiSlice } from "@/redux/api/apiSlice";

export const RoleSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query({
      query: ({ page, searchRole }) => ({
        url: `roles/find-all/?page=${page - 1}&size=20`,
      }),
      providesTags: ["role"],
    }),
    save: builder.mutation({
      query: (body) => ({
        url: "roles/create",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["role"],
    }),
    update: builder.mutation({
      query: (body) => ({
        url: `roles/`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["role"],
    }),
    delete: builder.mutation({
      query: (id) => ({
        url: `roles/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["role"],
    }),
  }),
});

export const {
  useGetAllRolesQuery,
  useSaveMutation,
  useUpdateMutation,
  useDeleteMutation,
} = RoleSlice;
