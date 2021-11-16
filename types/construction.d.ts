import {CompanyProps} from "./company";

export interface ConstructionProps {
    id: number;
    name: string;
    start_date: Date;
    end_date: Date;
    status: string;
    budget: number;
    project?: string;
    canceled_at?: Date;
    started_at?: Date;
    finalized_at?: Date;
    abandoned_at?: Date;
    company_id: number;
    company: CompanyProps;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}
