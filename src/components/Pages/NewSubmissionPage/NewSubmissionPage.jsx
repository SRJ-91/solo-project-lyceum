import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NewSubmissionPage = ({badgeId, userId, userGroupId, onSubmit}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };


  const handleRowClick = (groupId) => {
    history.push(`/details/${groupId}`);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = () => {
    // Dispatch an action to create a new submission
    dispatch({
      type: 'CREATE_POST',
      payload: {
        title,
        body,
        userId,
        userGroupId,
        badgeId,
      },
    });

    // Redirect to the submissions page or any other desired page
    // history.push('/submissions');
    onSubmit(); 
  };

  return (
    <div>
      <h1>New Submission</h1>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea id="body" rows="5" value={body} onChange={handleBodyChange} />
        </div>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default NewSubmissionPage;
