import { PostType } from "./PostType";
export interface PostsState {
  posts: PostType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
