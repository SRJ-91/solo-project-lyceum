import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const CreateGroup = () => {

    const history = useHistory();
    const dispatch = useDispatch();


        // States for every input on form, naming is consistent with SQL database
        const [book_name, setBook_Name] = useState('');
        const [cover, setCover] = useState('');
        const [team_name, setTeam_Name] = useState('');
        const [logo, setLogo] = useState('');
        const [start_date, setStart_Date] = useState('');
        const [end_date, setEnd_Date] = useState('');
        const [cohort, setCohort] = useState('');
        const [region, setRegion] = useState('');
        const [details, setDetails] = useState('');

        const [selectedBadgeId, setSelectedBadgeId] = useState('');

        useEffect(() => {
          // Fetch badge data
          dispatch({ type: 'FETCH_BADGES' });
        }, []);

        const badges = useSelector(store => store.badges);


        function handleGroupLaunch() {
          // Create a new group object with the input values
          const newGroup = {
            badge_id: selectedBadgeId, // Include the selected badge ID
            book_name,
            cover,
            team_name,
            logo,
            start_date,
            end_date,
            cohort,
            region,
            details,
          };
        
          // Dispatch the CREATE_GROUP action with the new group object
          dispatch({ type: 'CREATE_GROUP', payload: newGroup });

          console.log('The group sent was', newGroup);
        
          // Navigate to the "/launch" screen
          history.push('/launch');
        }
    



  return (
    <div>
      <h1>Create Group</h1>
      <form 
      onSubmit={handleGroupLaunch}>

        <label htmlFor="badge">Badge:</label>
          <select
            id="badge"
            value={selectedBadgeId}
            onChange={(e) => setSelectedBadgeId(e.target.value)}>
            <option value="">Select Badge</option>{badges.map((badge) => (
            <option key={badge.id} value={badge.id}>
            {badge.name}
            </option>
              ))}
            </select>

        <label htmlFor="book_name">Book Name:</label>
        <input
          type="text"
          id="book_name"
          value={book_name}
          onChange={(e) => setBook_Name(e.target.value)}
        />

        <label htmlFor="cover">Cover:</label>
        <input
          type="text"
          id="cover"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />

        <label htmlFor="team_name">Team Name:</label>
        <input
          type="text"
          id="team_name"
          value={team_name}
          onChange={(e) => setTeam_Name(e.target.value)}
        />

        <label htmlFor="logo">Logo:</label>
        <input
          type="text"
          id="logo"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
        />

        <label htmlFor="start_date">Start Date:</label>
        <input
          type="date"
          id="start_date"
          value={start_date}
          onChange={(e) => setStart_Date(e.target.value)}
        />

        <label htmlFor="end_date">End Date:</label>
        <input
          type="date"
          id="end_date"
          value={end_date}
          onChange={(e) => setEnd_Date(e.target.value)}
        />

        <label htmlFor="cohort">Cohort:</label>
        <select
          id="cohort"
          value={cohort}
          onChange={(e) => setCohort(e.target.value)}
        >
          {/* Options for cohort */}
          <option value="">Select Cohort</option>
          <option value="1">Cohort 1</option>
          <option value="2">Cohort 2</option>
          <option value="3">Cohort 3</option>
          {/* Add more options as needed */}
        </select>

        <label htmlFor="region">Region:</label>
        <input
          type="text"
          id="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />

        <label htmlFor="details">Details:</label>
        <textarea
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>

        <button type="submit">Launch Group</button>
      </form>
    </div>
  )
}

export default CreateGroup
