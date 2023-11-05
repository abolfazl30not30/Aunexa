import {apiAuthServerSlice} from "@/redux/api/apiAuthServerSlice";

export const RoleSlice = apiAuthServerSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query({
      query: ({ page,token }) => ({
        url: `roles/find-all/page?page=${page - 1}&size=20&Token=${token}`,
      }),
      providesTags: ["role"],
    }),
    saveRole: builder.mutation({
      query: (body) => ({
        url: "roles/create",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["role"],
    }),
    updateRole: builder.mutation({
      query: (body) => ({
        url: `roles/`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["role"],
    }),
    deleteRole: builder.mutation({
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
  useSaveRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = RoleSlice;
