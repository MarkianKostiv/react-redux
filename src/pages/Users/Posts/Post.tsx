import { useParams, Link, useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { RootState, AppDispatch } from "../../../state/store";
import { fetchPostById } from "../../../state/posts/postsSlice";
import { PostComments } from "../../../interfaces/Posts/PostComments/PostComments";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleDelete } from "../../../functions/handleDelete";

const Post = () => {
  const { postId } = useParams<{ postId: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector((state: RootState) =>
    state.posts.posts.find((p) => p.id === Number(postId))
  );
  const [postCom, setPostCom] = useState<PostComments[]>([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (!post && !isDeleted) {
      dispatch(fetchPostById(postId!));
    }
  }, [post, postId, dispatch, isDeleted]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
        );
        const PostData = await response.data;
        setPostCom(PostData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchData();
  }, [postId]);

  return (
    <div className={isDeleted ? `w-full ` : `w-full p-4`}>
      <ToastContainer />
      <div className='flex bg-slate-300 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-4/5'>
        <Outlet />
      </div>
      {isDeleted ? (
        <div className='flex flex-col w-full justify-center items-center gap-4 h-screen'>
          <p>Post deleted successfully. You can return to the main page.</p>
          <Link
            to={`/`}
            className='bg-blue-500 text-white py-1 px-2 rounded-md'
          >
            Go to Main Page
          </Link>
        </div>
      ) : (
        <>
          {post ? (
            <div>
              <h2 className='text-center font-semibold text-xl'>
                Post Title: {post.title}
              </h2>
              <p>Post Body: {post.body}</p>
              <div className='w-full pt-5 pb-5 flex gap-5'>
                <Link to={`update/${postId}`}>
                  <button className='bg-blue-500 text-white py-1 px-2 rounded-md'>
                    Update
                  </button>
                </Link>

                <button
                  className='bg-red-500 text-white py-1 px-2 rounded-md'
                  onClick={() => {
                    handleDelete(
                      `https://jsonplaceholder.typicode.com/posts/${postId}`,
                      setIsDeleted,
                      postId,
                      dispatch
                    );
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className='bg-blue-500 text-white py-1 px-2 rounded-md'
                >
                  Return
                </button>
              </div>
            </div>
          ) : (
            <p>Post not found</p>
          )}
          <h2>Comments</h2>
          <ul className='flex flex-col gap-3 justify-center items-center p-6'>
            {postCom.map((comment) => (
              <li
                className='bg-[#578EA6] p-4 rounded-md shadow-md'
                key={comment.id}
              >
                <div className='flex w-full gap-4'>
                  <h2>Name: {comment.name}</h2>
                  <h3>Email: {comment.email}</h3>
                </div>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Post;
