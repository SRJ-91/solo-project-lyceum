import React, { useEffect, useState } from 'react';
import "./Submissions.css";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NewSubmissionPage from '../NewSubmissionPage/NewSubmissionPage';
import {
  Table,Thead,Tbody,Tr,Th,Td,TableCaption,TableContainer,Image, Text, Heading,Container,Input,Button,ButtonGroup,Flex,Textarea,Box } 
  from '@chakra-ui/react'

const Submissions = ({badgeId, userId, userGroupId}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const posts = useSelector((state) => state.posts);
  const groupId = useSelector((state) => state.groups[0].id)
    console.log('PROPS ARE badgeId is',badgeId, 'userId is', userId, 'userGroupId is', userGroupId);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Dispatch an action to fetch the posts data
    dispatch({ type: 'FETCH_POSTS', payload: groupId });
  },[]);

  const handleCreateSubmission = () => {
    // Handle the create submission button click
    setShowForm(true);
  };

  const handleRowClick = (postId) => {
    history.push(`/posts/${postId}`);
  };

  return (
    <div className='submission-container'>
    <Flex justify={'space-between'} marginBottom={"2"}>
      <Heading>Submissions</Heading>
      {showForm ? (
        <Button onClick={() => setShowForm(false)}>Close</Button>
      ) : (
        <Button onClick={handleCreateSubmission}>Create Submission</Button>
      )}
    </Flex>
    {showForm && (
      <NewSubmissionPage
        badgeId={badgeId}
        userId={userId}
        userGroupId={userGroupId}
        onSubmit={() => setShowForm(false)}
      />
    )}
      <table>
        <thead>
          <tr>
            {/* <th>Avatar</th> */}
            {/* <th>Title</th> */}
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
