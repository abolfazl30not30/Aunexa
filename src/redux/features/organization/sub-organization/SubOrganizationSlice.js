import { apiSlice } from "../../../api/apiSlice";

export const SubOrganizationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    save: builder.mutation({
      query: (body) => ({
        url: "party/sub-organiztion",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["sub-organization"],
    }),
    update: builder.mutation({
      query: (body) => ({
        url: `party/sub-organization`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["sub-organization"],
    }),
    delete: builder.mutation({
      query: (id) => ({
        url: `party/sub-organization/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["sub-organization"],
    }),
  }),
});

export const { useSaveMutation, useUpdateMutation, useDeleteMutation } =
  SubOrganizationSlice;
