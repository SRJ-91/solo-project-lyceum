import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';





const AllUsers = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);



    useEffect(() => {
        dispatch({ type: 'FETCH_USERS' });
      }, []);

    return (
        <div>
            <h1>Showing all Users</h1>
          <table>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Region</th>
                <th>Username</th>
                <th>Role</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
            {users && users.map((user) => (
                <tr key={user.id}>
                  <td><img src={user.avatar} alt="Avatar" /></td>
                  <td>{user.region}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>{user.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default AllUsers
