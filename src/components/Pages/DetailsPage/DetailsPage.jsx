import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const DetailsPage = () => {
  const  groupId  = useParams();
  const groups = useSelector((store) => store.groups);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // Fetch group data
    dispatch({ type: 'FETCH_SELECTED_GROUP', payload: groupId.groupId });
  }, []);

  let test = groups[0];
  console.log(test);

  return (
    <>
    {test !== undefined ? 
    <div>
      <img src={groups[0].cover} alt="Cover" />
      <img src={groups[0].logo} alt="Logo" />
      <button onClick={() => history.push('/launch')}>Return to Lyceum</button>

      <table>
        <thead>
          <tr>
            <th>{groups[0].team_name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{groups[0].book_name}</td>
          </tr>
          <tr>
            <td>{groups[0].cohort}</td>
          </tr>
          <tr>
            <td>{groups[0].region}</td>
          </tr>
          <tr>
            <td>{format(new Date(groups[0].start_date), 'MM/dd/yyyy')}</td>
          </tr>
          <tr>
            <td>{format(new Date(groups[0].end_date), 'MM/dd/yyyy')}</td>
          </tr>
        </tbody>
      </table>
      <p>{groups[0].details}</p>

        <textarea name="" id="" cols="30" rows="10"></textarea>


    </div>
: <><p>nothing</p></>}
</>
  );
};

export default DetailsPage;
