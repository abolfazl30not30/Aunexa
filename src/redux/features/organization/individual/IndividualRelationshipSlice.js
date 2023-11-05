import { apiSlice } from "../../../api/apiSlice";

export const IndividualRelationshipSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    save: builder.mutation({
      query: (body) => ({
        url: "party/relationship-information",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["individualRelationship"],
    }),
    update: builder.mutation({
      query: (body) => ({
        url: `party/relationship-information`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["individualRelationship"],
    }),
    delete: builder.mutation({
      query: (id) => ({
        url: `party/relationship-information${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["individualRelationship"],
    }),
  }),
});

export const { useSaveMutation, useUpdateMutation, useDeleteMutation } =
  IndividualRelationshipSlice;
