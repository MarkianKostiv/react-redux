import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { User } from "../../interfaces/Users/User";
const Users = () => {
  const [usersList, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = await response.data;
      setUsers(users);
      console.log(users);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1 className='font-semibold text-xl pt-6 pb-6 pl-5'>Users</h1>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-green-600'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
              Name
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
              Username
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
              Email
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {usersList.map((user) => (
            <tr
              key={user.id}
              className='hover:bg-gray-100'
            >
              <td className='px-6 py-4 whitespace-nowrap'>{user.name}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{user.username}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{user.email}</td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <Link
                  to={`user/posts/${user.id}`}
                  className='text-green-600 hover:text-green-800 font-bold'
                >
                  Posts
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Users;
