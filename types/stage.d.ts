import { ConstructionProps } from './construction';

export interface StageProps {
  id: number;
  name: string;
  construction_id: number;
  construction: ConstructionProps;
  budget: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
