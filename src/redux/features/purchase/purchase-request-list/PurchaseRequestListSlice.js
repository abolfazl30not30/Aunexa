
import { apiSlice } from "../../api/apiSlice";

export const PurchaseRequestListSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        statusPurchaseRequest: builder.mutation({
            query: (body) => ({
                url: 'bill/bill-cycle/status',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['purchase-request']
        }),
    })
})

export const {
    useStatusPurchaseRequestMutation,
} = PurchaseRequestListSlice