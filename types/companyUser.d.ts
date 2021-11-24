import { UserProps } from './user';
import { CompanyProps } from './company';

export interface CompanyUserProps {
  id: number;
  role: string;
  user_id: number;
  user: UserProps;
  company_id: number;
  company: CompanyProps;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
