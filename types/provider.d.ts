import {ConstructionProps} from "./construction";

export interface ProviderProps {
    id: number;
    name: string;
    construction_id: number;
    construction: ConstructionProps;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}
