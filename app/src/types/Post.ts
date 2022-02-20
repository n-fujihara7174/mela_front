export interface Post {
  id: number;
  user_id: number;
  users_table_user_id: string;
  post_contents: string;
  post_image: string;
  is_delete: boolean;
  created_at: string;
}
