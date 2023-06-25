import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { format } from 'date-fns';


const LaunchPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const store = useSelector(store => store.groups);

    useEffect(() => {
        // Fetch group data
        dispatch({ type: 'FETCH_ACTIVE' });
      }, []);

      const handleRowClick = (groupId) => {
        history.push(`/details/${groupId}`);
      };

      return (
        <div>
          <h1>Welcome to the Lyceum</h1>
            <img src={"/images/Lyceum-Image.webp"}
             alt="Lyceum" 
             width="500px" 
             />
            <button onClick={() => history.push('/create-group')}>Create Group</button>
            <button onClick={() => history.push('/all-users')}>All Users</button>
            <button onClick={() => history.push('/all-badges')}>Badges</button>
            <button onClick={() => history.push('/archive')}>Go to Archive</button>

          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Region</th>
                <th>Book Name</th>
                <th>Team Name</th>
                <th>Cohort</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {store.map((group) => (
                <tr
                key={group.id}
                onClick={() => handleRowClick(group.id)}
                style={{ cursor: 'pointer' }}
              >
               <td>{group.status ? 'DONE' : 'ACTIVE'}</td>
               <td>{group.region}</td>
               <td>{group.book_name}</td>
               <td>{group.team_name}</td>
               <td>{group.cohort}</td>
               <td>{format(new Date(group.start_date), 'MM/dd/yyyy')}</td>
               <td>{format(new Date(group.end_date), 'MM/dd/yyyy')}</td>
             </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      
}

export default LaunchPage
