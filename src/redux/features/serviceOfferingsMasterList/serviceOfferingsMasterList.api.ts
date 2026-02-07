import { baseApi } from '@/redux/baseApi';

export const serviceOfferingsMasterListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createServiceOfferingMasterList: builder.mutation({
      query: (data) => ({
        url: '/service-offerings-master-list',
        method: 'POST',
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['serviceOfferingsMasterList'],
    }),

    getAllServiceOfferingMasterLists: builder.query({
      query: () => ({
        url: '/service-offerings-master-list',
        method: 'GET',
      }),
      providesTags: ['serviceOfferingsMasterList'],
    }),

    getServiceOfferingMasterListById: builder.query({
      query: (id) => ({
        url: `/service-offerings-master-list/${id}`,
        method: 'GET',
      }),
      providesTags: ['serviceOfferingsMasterList'],
    }),

    updateServiceOfferingMasterList: builder.mutation({
      query: ({ id, data }) => ({
        url: `/service-offerings-master-list/${id}`,
        method: 'PATCH',
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['serviceOfferingsMasterList'],
    }),

    deleteServiceOfferingMasterList: builder.mutation({
      query: (id) => ({
        url: `/service-offerings-master-list/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['serviceOfferingsMasterList'],
    }),
  }),
});

export const {
  useCreateServiceOfferingMasterListMutation,
  useGetAllServiceOfferingMasterListsQuery,
  useGetServiceOfferingMasterListByIdQuery,
  useUpdateServiceOfferingMasterListMutation,
  useDeleteServiceOfferingMasterListMutation,
} = serviceOfferingsMasterListApi;
