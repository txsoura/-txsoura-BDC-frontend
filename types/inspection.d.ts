import { ConstructionProps } from './construction';

export interface InspectionProps {
  id: number;
  construction_id: number;
  construction: ConstructionProps;
  seem: string;
  report?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
