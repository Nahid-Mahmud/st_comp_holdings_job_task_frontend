import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        data: data,
      }),
    }),

    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getAllUsers: builder.query({
      query: (params) => ({
        url: "/user/get-all",
        method: "GET",
        params,
      }),
      providesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ data, id }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["User"],
    }),

    setPin: builder.mutation({
      query: (data) => ({
        url: "/user/set-pin",
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: ["User"],
    }),

    getPublicInstructorProfile: builder.query({
      query: (uid) => ({
        url: `/user/public-profile/${uid}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useUserInfoQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useSetPinMutation,
  useGetPublicInstructorProfileQuery,
} = userApi;
