"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import queryString from "query-string";

let base64encodedData = Buffer.from(
  "client1" + ":" + "myClientSecretValue"
).toString("base64");

const baseQuery = fetchBaseQuery({
  baseUrl: "http://auth.vipsoftware1.com",
});

export const getAccessSlice = createApi({
  reducerPath: "getAccess",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAccess: builder.mutation({
      query: (credentials) => ({
        url: "/roles/validate",
        method: "POST",
        body: new URLSearchParams(credentials),
      }),
    }),
  }),
});

export const { useGetAccessMutation } = getAccessSlice;
