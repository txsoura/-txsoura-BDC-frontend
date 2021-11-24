export interface UserProps {
  id: number;
  name: string;
  email: string;
  status: string;
  fcm_token?: string;
  role: string;
  lang: string;
  email_verified_at?: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
