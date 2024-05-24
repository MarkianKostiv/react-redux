import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import { fetchPosts } from "../../state/posts/postsSlice";
import { RootState, AppDispatch } from "../../state/store";

const User = () => {
  const { userId } = useParams<{ userId: string }>();
  const dispatch: AppDispatch = useDispatch();
  const userPosts = useSelector((state: RootState) => state.posts.posts);

  useEffect(() => {
    if (userId) {
      dispatch(fetchPosts(userId));
    }
  }, [userId, dispatch]);

  return (
    <div className='relative'>
      <h1 className=' text-xl font-semibold'>List Of Posts</h1>
      <div className='flex bg-slate-300 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-4/5'>
        <Outlet />
      </div>
      <div className='flex gap-10 pt-8 pb-8'>
        <Link to={`add/${userId}`}>
          <button className='font-semibold text-xl pt-4 pb-4 pr-6 pl-6 bg-[#8EE3F5] hover:bg-[#63ddf6] duration-300 rounded-xl transform active:scale-95 active:bg-[#b9ebf5] focus:outline-none shadow-md hover:shadow-lg active:shadow-none'>
            AddNew
          </button>
        </Link>
        <Link to='/'>
          <button className='font-semibold text-xl pt-4 pb-4 pr-6 pl-6 bg-[#D1F58E] hover:bg-[#c0f55f] duration-300 rounded-xl transform active:scale-95 active:bg-[#e1f6bb] focus:outline-none shadow-md hover:shadow-lg active:shadow-none'>
            Main
          </button>
        </Link>
      </div>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-green-600'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
              Number
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
              Title
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
              Body
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {userPosts.map((post) => (
            <tr
              key={post.id}
              className='hover:bg-gray-100'
            >
              <td className='px-6 py-4 '>{post.id}</td>
              <td className='px-6 py-4 '>{post.title}</td>
              <td className='px-6 py-4 '>{post.body}</td>
              <td className='px-6 py-4 '>
                <Link
                  to={`/post/details/${post.id}`}
                  className='text-green-600 hover:text-green-800 font-bold'
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
