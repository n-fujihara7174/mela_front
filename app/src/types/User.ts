
export interface User {
  id: number;
  user_name: string;
  user_id: string;
  self_introduction: string;
  email: string;
  phone_number: number;
  birthday: Date;
  image: string;
  post_count: number;
  can_like_notification: boolean;
  can_comment_notification: boolean;
  can_message_notification: boolean;
  can_calender_notification: boolean;
  is_delete: boolean;
  created_at: Date;
  updated_at: Date;
}