import { ConstructionProps } from './construction';
import { CompanyUserProps } from './companyUser';

export interface ConstructionUserProps {
  id: number;
  role: string;
  construction_id: number;
  construction: ConstructionProps;
  company_user_id: number;
  company_user: CompanyUserProps;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
