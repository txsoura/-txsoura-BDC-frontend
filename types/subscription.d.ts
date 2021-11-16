import {CompanyProps} from "./company";

export interface SubscriptionProps {
    id: number;
    title: string;
    status: string;
    billing_method: string;
    valid_until: Date;
    amount: number;
    company_id: number;
    company: CompanyProps;
    currency: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}
