export interface AuthUser {
  user_id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: number;
  image_url: string;
  created_at: string;
  activated_account: boolean;
  role: 'admin' | 'rh';
}
