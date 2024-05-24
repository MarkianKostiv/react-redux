import axios from "axios";
import { AppDispatch } from "../state/store";
import { deletePost } from "../state/posts/postsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const handleDelete = (
  url: string,
  deleteState: any,
  id: string | undefined,
  dispatch: AppDispatch
) => {
  dispatch(deletePost(Number(id)));
  axios
    .delete(url)
    .then((response) => {
      console.log("Post deleted successfully", response.data);
      toast.success("Post deleted successfully!");
      deleteState(true);
    })
    .catch((error) => {
      console.log("Post delete failed", error);
      toast.error("Post delete failed. Please try again.");
    });
};
