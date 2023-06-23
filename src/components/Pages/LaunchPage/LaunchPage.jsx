import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const LaunchPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const store = useSelector(store => store.groups);

    useEffect(() => {
        // Fetch group data
        dispatch({ type: 'FETCH_GROUPS' });
      }, []);

      return (
        <div>
          <h1>Launch Page</h1>
            <img src={"/images/Lyceum-Image.webp"}
             alt="Lyceum" 
             width="500px" 
             />
            <button onClick={() => history.push('/create-group')}>Create Group</button>
            {/* <button onClick={() => history.push('/registration')}>Create Profile</button>  UNSURE???*/}
            <button onClick={() => history.push('/all-badges')}>Badges</button>
            <button>Go to Archive</button>

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
                <tr key={group.id}>
                  <td>{group.status ? 'DONE' : 'ACTIVE'}</td>
                  <td>{group.region}</td>
                  <td>{group.book_name}</td>
                  <td>{group.team_name}</td>
                  <td>{group.cohort}</td>
                  <td>{group.start_date}</td>
                  <td>{group.end_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      
}

export default LaunchPage
