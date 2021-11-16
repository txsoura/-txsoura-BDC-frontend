import {ConstructionProps} from "./construction";

export interface ProductProps {
    id: number;
    name: string;
    type: string;
    notify_when_stock_below: number;
    available: number;
    construction_id: number;
    construction: ConstructionProps;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}
