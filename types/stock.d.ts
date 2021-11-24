import { ConstructionProps } from './construction';
import { ProductProps } from './product';
import { ProviderProps } from './provider';

export interface StockProps {
  id: number;
  quantity: number;
  price: number;
  construction_id: number;
  construction: ConstructionProps;
  provider_id: number;
  provider: ProviderProps;
  product_id: number;
  product: ProductProps;
  flow: string;
  status: string;
  outgoing_receiver?: string;
  receipt?: string;
  canceled_at?: Date;
  received_at?: Date;
  withdrawn_at?: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
