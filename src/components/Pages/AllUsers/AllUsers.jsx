import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const AllUsers = () => {
    const dispatch = useDispatch();
    const store = useSelector(store => store.allUsers);
    console.log('users is', store);



    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_USERS' });
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
            {store && store.map((user) => (
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
