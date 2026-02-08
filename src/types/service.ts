/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Service {
  id: string;
  name: string;
  price: number;
  purchases: number;
  duration: string;
  approvalStatus: 'Approved' | 'Under-Review' | 'Rejected';
  publishStatus: 'Published' | 'Not Published';
}

export interface Media {
  id: string;
  specialist_id: string;
  file_name: string;
  file_size: number;
  display_order: number;
  mime_type: 'image/jpeg' | 'image/png' | 'image/jpg';
  media_type: 'IMAGE' | 'VIDEO' | 'DOCUMENT';
  uploaded_at: string;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceOffering {
  id: string;
  specialist_id: string;
  service_offerings_master_list_id: string;
  created_at: string;
  updated_at: string;
  service_offerings_master_list?: ServiceOfferingMasterList;
}

export interface ServiceOfferingMasterList {
  id: string;
  title: string;
  description?: string;
  s3_key?: string;
  bucket_name: string;
  created_at: string;
  updated_at: string;
}

export interface Specialist {
  id: string;
  average_rating: number;
  is_draft: boolean;
  total_number_of_ratings: number;
  title: string;
  slug: string;
  description: string;
  base_price: number;
  platform_fee: number;
  final_price: number;
  verification_status: 'PENDING' | 'APPROVED' | 'REJECTED';
  is_verified: boolean;
  duration_days: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  media?: Media[];
  service_offerings?: ServiceOffering[];
}

export interface CreateSpecialistRequest {
  title: string;
  description: string;
  base_price: number;
  duration_days: number;
  is_draft?: boolean;
  service_offerings_master_list_ids?: string[];
  display_order?: number[];
}

export interface UpdateSpecialistRequest {
  title?: string;
  slug?: string;
  description?: string;
  base_price?: number;
  duration_days?: number;
  is_draft?: boolean;
  verification_status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  is_verified?: boolean;
  deleted_media_ids?: string[];
  display_order?: number[];
}

export interface SpecialistsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  is_draft?: boolean;
  verification_status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  is_verified?: boolean;
}

export interface PaginatedSpecialistsResponse {
  data: Specialist[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
