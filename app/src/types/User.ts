
export interface User {
  id: number;
  user_name: string;
  user_id: string;
  password_digest: string;
  self_introduction: string;
  email: string;
  phone_number: number;
  birthday: string;
  image: string;
  post_count: number;
  can_like_notification: boolean;
  can_comment_notification: boolean;
  can_message_notification: boolean;
  can_calender_notification: boolean;
  is_delete: boolean;
  created_at: string;
  updated_at: string;
}