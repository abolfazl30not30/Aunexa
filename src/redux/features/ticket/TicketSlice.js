import { apiSlice } from "@/redux/api/apiSlice";

export const ticketSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTickets: builder.query({
      query: ({ page }) => ({
        url: `tickets/find-all/?page=${page - 1}&size=20`,
      }),
      providesTags: ["ticket"],
    }),
    save: builder.mutation({
      query: (body) => ({
        url: "tickets/create",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["ticket"],
    }),
  }),
});

export const { useGetAllTicketsQuery, useSaveMutation } = ticketSlice;
