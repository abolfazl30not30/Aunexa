import { apiSlice } from "@/redux/api/apiSlice";

export const ticketSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTickets: builder.query({
      query: ({ page }) => ({
        url: `party/ticket?page=${page - 1}&size=10`,
      }),
      providesTags: ["ticket"],
    }),
    saveTicket: builder.mutation({
      query: (body) => ({
        url: "party/ticket",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["ticket"],
    }),
    updateTicket: builder.mutation({
      query: (body) => ({
        url: "party/ticket",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["ticket"],
    }),
  }),
});

export const {
  useGetAllTicketsQuery,
  useSaveTicketMutation,
  useUpdateTicketMutation,
} = ticketSlice;
