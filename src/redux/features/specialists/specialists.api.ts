import { baseApi } from '../../baseApi';
import {
  Specialist,
  CreateSpecialistRequest,
  UpdateSpecialistRequest,
  SpecialistsQueryParams,
  PaginatedSpecialistsResponse,
  ApiResponse,
} from '../../../types/service';

export const specialistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new specialist
    createSpecialist: builder.mutation<
      ApiResponse<Specialist>,
      { data: CreateSpecialistRequest; photos: File[] }
    >({
      query: ({ data, photos }) => {
        console.log('=== CREATE SPECIALIST API CALL ===');
        console.log('Input data:', data);
        console.log('Input photos:', photos);

        const formData = new FormData();

        // Send data as JSON string in 'data' field (backend expects this)
        const jsonData = JSON.stringify(data);
        formData.append('data', jsonData);
        console.log('JSON stringified data:', jsonData);

        // Append photos
        photos.forEach((photo) => {
          formData.append('photos', photo);
        });

        // Debug log
        console.log('FormData entries:');
        formData.forEach((value, key) => {
          if (value instanceof File) {
            console.log(`${key}: [File] ${value.name}`);
          } else {
            console.log(`${key}:`, value);
          }
        });

        return {
          url: '/specialists',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [{ type: 'specialists', id: 'LIST' }],
    }),

    // Get all specialists with pagination and filters
    getAllSpecialists: builder.query<
      ApiResponse<PaginatedSpecialistsResponse>,
      SpecialistsQueryParams
    >({
      query: (params) => ({
        url: '/specialists',
        params,
      }),
      providesTags: (result) =>
        result?.data?.data
          ? [
              ...result.data.data.map(({ id }) => ({
                type: 'specialists' as const,
                id,
              })),
              { type: 'specialists', id: 'LIST' },
            ]
          : [{ type: 'specialists', id: 'LIST' }],
    }),

    // Get a single specialist by ID
    getSpecialistById: builder.query<ApiResponse<Specialist>, string>({
      query: (id) => ({
        url: `/specialists/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: 'specialists', id }],
    }),

    // Get a single specialist by slug
    getSpecialistBySlug: builder.query<ApiResponse<Specialist>, string>({
      query: (slug) => ({
        url: `/specialists/slug/${slug}`,
      }),
      providesTags: (result, error, slug) => [{ type: 'specialists', slug }],
    }),

    // Update a specialist
    updateSpecialist: builder.mutation<
      ApiResponse<Specialist>,
      {
        id: string;
        data: UpdateSpecialistRequest;
        photos?: File[];
      }
    >({
      query: ({ id, data, photos }) => {
        const formData = new FormData();

        // Send data as JSON string in 'data' field (backend expects this)
        formData.append('data', JSON.stringify(data));

        // Append photos if provided
        if (photos) {
          photos.forEach((photo) => {
            formData.append('photos', photo);
          });
        }

        return {
          url: `/specialists/${id}`,
          method: 'PATCH',
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'specialists', id },
        { type: 'specialists', id: 'LIST' },
      ],
    }),

    // Delete a specialist (soft delete)
    deleteSpecialist: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/specialists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'specialists', id },
        { type: 'specialists', id: 'LIST' },
      ],
    }),

    // Add service offerings to a specialist
    addServiceOfferings: builder.mutation<
      ApiResponse<Specialist>,
      { id: string; serviceOfferingIds: string[] }
    >({
      query: ({ id, serviceOfferingIds }) => ({
        url: `/specialists/${id}/service-offerings`,
        method: 'POST',
        body: { service_offerings_master_list_ids: serviceOfferingIds },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'specialists', id },
        { type: 'specialists', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useCreateSpecialistMutation,
  useGetAllSpecialistsQuery,
  useGetSpecialistByIdQuery,
  useGetSpecialistBySlugQuery,
  useUpdateSpecialistMutation,
  useDeleteSpecialistMutation,
  useAddServiceOfferingsMutation,
  useLazyGetAllSpecialistsQuery,
  useLazyGetSpecialistByIdQuery,
  useLazyGetSpecialistBySlugQuery,
} = specialistsApi;

export default specialistsApi;
