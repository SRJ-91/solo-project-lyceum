import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Table,Thead,Tbody,Tr,Th,Td,TableCaption,TableContainer,Image, Text, Heading,Container,Input,Button,ButtonGroup,Flex,Textarea,Box } 
  from '@chakra-ui/react'

const NewSubmissionPage = ({ badgeId, userId, userGroupId, onSubmit }) => {
  const members = useSelector((store) => store.members);
  const currentUser = useSelector((store) => store.user)
  const groupId = useSelector((state) => state.groups[0].id)
  const currentmember = members.filter((member) => member.username === currentUser.username)[0];
  console.log('current member is', currentmember);
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  console.log('badgeId is', badgeId, 'userId is', userId, 'userGroupId is', userGroupId);
  console.log('members are', members);

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
        data: {
          title,
          body,
          userId,
          userGroupId: currentmember.user_groups_id,
          badgeId,
        }, groupId: groupId
      },
    });

    // Redirect to the submissions page or any other desired page
    // history.push('/submissions');
    onSubmit();
  };

  return (
    <Flex direction={'column'} marginY={4}>
      <Heading size={'md'} marginBottom={'3'}>New Submission</Heading>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <Input type="text" id="title" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <Textarea id="body" rows="10" value={body} onChange={handleBodyChange} />
        </div>
        <div>
        <Button type="button" marginTop={'3'} onClick={handleSubmit}>Submit</Button>
        </div>
      </form>
    </Flex>
  );
};

export default NewSubmissionPage;
