// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mern-backend-api-6y85.onrender.com/',}),
  tagTypes:['Blog'],
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => `allblog`,
      transformResponse: (response) => {
        return response.reverse();
   },
      providesTags: ['Blog'],
    }),
    Blog: builder.query({
      query: (id) => `blog/${id}`,
      providesTags: ['Blog'],
    }),
    DeleteBlog: builder.mutation({
      query: (id) => ({
        url: `deleteblog/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
    addBlog: builder.mutation({
      query: (formData) => ({
        url: `addblog`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Blog'],
    }),
    editBlog: builder.mutation({
      query: ({id,formData}) => ({
        url: `editblog/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBlogsQuery, useBlogQuery, useDeleteBlogMutation, useAddBlogMutation, useEditBlogMutation } = blogApi
