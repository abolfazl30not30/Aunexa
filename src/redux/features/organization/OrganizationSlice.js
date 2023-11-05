import { apiSlice } from "@/redux/api/apiSlice";

export const OrganizationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrganization: builder.query({
      query: ({ filterItem, filter }) => ({
        url: `party/organization/find-all`,
      }),
      providesTags: ["organization"],
    }),
    saveOrganization: builder.mutation({
      query: (body) => ({
        url: "party/organization",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["organization"],
    }),
  }),
});

export const { useGetAllOrganizationQuery, useSaveOrganizationMutation } =
  OrganizationSlice;
