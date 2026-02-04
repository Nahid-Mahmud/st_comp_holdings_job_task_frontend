export interface Service {
  id: string;
  name: string;
  price: number;
  purchases: number;
  duration: string;
  approvalStatus: 'Approved' | 'Under-Review' | 'Rejected';
  publishStatus: 'Published' | 'Not Published';
}
