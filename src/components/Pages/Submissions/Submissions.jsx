import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NewSubmissionPage from '../NewSubmissionPage/NewSubmissionPage';

const Submissions = ({badgeId, userId, userGroupId}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const posts = useSelector((state) => state.posts);
    console.log('PROPS ARE',badgeId, userId, userGroupId);

    const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Dispatch an action to fetch the posts data
    dispatch({ type: 'FETCH_POSTS' });
  }, []);

  const handleCreateSubmission = () => {
    // Handle the create submission button click
    // history.push('/submission');
    setShowForm(true);
  };

  const handleRowClick = (postId) => {
    history.push(`/posts/${postId}`);
  };

  return (
    <div>
      <button onClick={handleCreateSubmission}>Create Submission</button>
      {showForm && <NewSubmissionPage badgeId={badgeId}
                 userId={userId}
                 userGroupId={userGroupId}
                 onSubmit={() => setShowForm(false)}
                 />}

      <table>
        <thead>
          <tr>
            {/* <th>Avatar</th> */}
            <th>Title</th>
            {/* <th>Status</th> */}
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}
            onClick={() => handleRowClick(post.id)}
            style={{ cursor: 'pointer' }}
          >
              {/* <td>
                <img src={post.user.avatar} alt="Avatar" />
              </td> */}
              <td>{post.title}</td>
              {/* <td>{post.status}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Submissions;
