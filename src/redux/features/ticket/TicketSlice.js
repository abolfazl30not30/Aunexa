import { apiSlice } from "@/redux/api/apiSlice";

export const ticketSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTickets: builder.query({
      query: ({ page }) => ({
        url: `party/ticket/find-all/?page=${page - 1}&size=20`,
      }),
      providesTags: ["ticket"],
    }),
    save: builder.mutation({
      query: (body) => ({
        url: "party/ticket/create",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["ticket"],
    }),
  }),
});

export const { useGetAllTicketsQuery, useSaveMutation } = ticketSlice;
