import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import RosterControlsAndEssays from '../../RosterControlsAndEssays/RosterControlsAndEssays';

const DetailsPage = () => {
  const  groupId  = useParams();
  const groups = useSelector((store) => store.groups);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // Fetch group data
    dispatch({ type: 'FETCH_SELECTED_GROUP', payload: groupId.groupId });
  }, []);

  // In case group doesn't render. Wraps whole return statement
  const allowRefresh = groups[0];
  console.log(allowRefresh);

  //state to handle editing
  const [editing, setEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({});

  const handleEditClick = () => {
    setEditing(true);
    // Initialize edited values with current group data
    setEditedValues({
      cover: groups[0]?.cover,
      logo: groups[0]?.logo,
      team_name: groups[0]?.team_name,
      book_name: groups[0]?.book_name,
      cohort: groups[0]?.cohort,
      region: groups[0]?.region,
      start_date: groups[0]?.start_date,
      end_date: groups[0]?.end_date,
      details: groups[0]?.details,
    });
  };
  
  const handleSaveClick = () => {
    // Send PUT request with editedValues to update group data
    const updatedGroup = {
      id: groups[0]?.id,
      cover: editedValues.cover,
      logo: editedValues.logo,
      team_name: editedValues.team_name,
      book_name: editedValues.book_name,
      cohort: editedValues.cohort,
      region: editedValues.region,
      start_date: editedValues.start_date,
      end_date: editedValues.end_date,
      details: editedValues.details,
    };
  
    dispatch({ type: 'UPDATE_GROUP', payload: updatedGroup });
    setEditing(false);
    window.location.reload();
  };


  return (
    <>
      {allowRefresh !== undefined ? (
        <div>
          <img src={groups[0]?.cover} alt="Cover" />
          {editing && (
            <input
              value={editedValues.cover || ''}
              onChange={(e) => setEditedValues({ ...editedValues, cover: e.target.value })}
            />
          )}
          <button onClick={handleEditClick}>Edit</button>
          <img src={groups[0]?.logo} alt="Logo" />
          {editing && (
            <input
              value={editedValues.logo || ''}
              onChange={(e) => setEditedValues({ ...editedValues, logo: e.target.value })}
            />
          )}
          <button onClick={() => history.push('/launch')}>Return to Lyceum</button>
  
          <table>
            <thead>
              <tr>
                <th>
                  {editing ? (
                    <input
                      value={editedValues.team_name || ''}
                      onChange={(e) => setEditedValues({ ...editedValues, team_name: e.target.value })}
                    />
                  ) : (
                    groups[0]?.team_name
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {editing ? (
                    <input
                      value={editedValues.book_name || ''}
                      onChange={(e) => setEditedValues({ ...editedValues, book_name: e.target.value })}
                    />
                  ) : (
                    groups[0]?.book_name
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {editing ? (
                    <input
                      value={editedValues.cohort || ''}
                      onChange={(e) => setEditedValues({ ...editedValues, cohort: e.target.value })}
                    />
                  ) : (
                    groups[0]?.cohort
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {editing ? (
                    <input
                      value={editedValues.region || ''}
                      onChange={(e) => setEditedValues({ ...editedValues, region: e.target.value })}
                    />
                  ) : (
                    groups[0]?.region
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {editing ? (
                    <input
                      value={editedValues.start_date || ''}
                      onChange={(e) => setEditedValues({ ...editedValues, start_date: e.target.value })}
                    />
                  ) : (
                    format(new Date(groups[0]?.start_date), 'MM/dd/yyyy')
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {editing ? (
                    <input
                      value={editedValues.end_date || ''}
                      onChange={(e) => setEditedValues({ ...editedValues, end_date: e.target.value })}
                    />
                  ) : (
                    format(new Date(groups[0]?.end_date), 'MM/dd/yyyy')
                  )}
                </td>
                  </tr>
              </tbody>
              </table>
                <p>
                  {editing ? (
                    <input
                      value={editedValues.details || ''}
                      onChange={(e) => setEditedValues({ ...editedValues, details: e.target.value })}
                    />
                    ) : (
                      groups[0]?.details
                      )}
                 </p>

                 <RosterControlsAndEssays groupId={groupId.groupId}/>
  
          {editing && <button onClick={handleSaveClick}>Save</button>}
        </div>
      ) : (
        <p>Nothing</p>
      )}
    </>
  );
};

export default DetailsPage;