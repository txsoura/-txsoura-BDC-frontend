export interface CompanyProps {
  id: number;
  name: string;
  tax: string;
  type: string;
  workspace: string;
  cellphone?: number;
  email: string;
  street?: string;
  postcode?: string;
  number?: string;
  complement?: string;
  city?: string;
  state?: string;
  country?: string;
  district?: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
