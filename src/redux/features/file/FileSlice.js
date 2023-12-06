import { apiSlice } from "../../api/apiSlice";

export const FileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFileCloud: builder.mutation({
      query: (body) => ({
        url: "file/ftp-upload",
        method: "POST",
        body: body,
        formData: true,
      }),
      invalidatesTags: ["file"],
    }),
    uploadFileMinio: builder.mutation({
      query: (body) => ({
        url: "file/upload",
        method: "POST",
        body: body,
        formData: true,
      }),
      invalidatesTags: ["file"],
    }),
  }),
});

export const { useUploadFileCloudMutation, useUploadFileMinioMutation } =
  FileSlice;
