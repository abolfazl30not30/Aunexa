import { apiSlice } from "../../../api/apiSlice";

export const IndividualSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    save: builder.mutation({
      query: (body) => ({
        url: "party/individual",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["individual"],
    }),
    update: builder.mutation({
      query: (body) => ({
        url: `party/individual`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["individual"],
    }),
    delete: builder.mutation({
      query: (id) => ({
        url: `party/individual${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["individual"],
    }),
  }),
});

export const { useSaveMutation, useUpdateMutation, useDeleteMutation } =
  IndividualSlice;
