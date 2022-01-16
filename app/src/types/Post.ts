
export interface Post {
  id: number;
  user_id: number;
  post_contents: string;
  post_image: string;
  is_delete: boolean;
  created_at: string;
}