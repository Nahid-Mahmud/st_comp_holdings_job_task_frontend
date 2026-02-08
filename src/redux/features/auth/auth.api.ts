import { baseApi } from '@/redux/baseApi';
import { tagTypes } from '@/redux/tagTypes';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        data: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        data: data,
      }),
      invalidatesTags: tagTypes,
    }),

    sendOtp: builder.mutation({
      query: (data) => ({
        url: '/otp/resend',
        method: 'POST',
        data: data,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'PATCH',
        data: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: '/otp/verify-user',
        method: 'POST',
        data: data,
      }),
    }),

    forgetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        data: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/auth/reset-password?id=${data.id}&token=${data.token}`,
        method: 'PATCH',
        data: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Reset entire API state to clear all cached data
          dispatch(baseApi.util.resetApiState());
        } catch (error) {
          // Even if logout fails, clear all cache
          dispatch(baseApi.util.resetApiState());
        }
      },
    }),

    contactUs: builder.mutation({
      query: (data) => ({
        url: '/contact-us',
        method: 'POST',
        data: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useForgetPasswordMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useContactUsMutation,
  useChangePasswordMutation,
} = authApi;
