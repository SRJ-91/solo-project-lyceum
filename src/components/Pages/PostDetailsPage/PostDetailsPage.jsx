import React, { useEffect, useState } from 'react';
import "./PostDetailsPage.css";
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Heading, Box, Text, Container, Flex, Button, ButtonGroup, Input, Textarea } from '@chakra-ui/react'

const PostDetailsPage = () => {

  //hooks and state
  const { postId } = useParams();
  const posts = useSelector((store) => store.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedPost = posts.find((post) => post.id === Number(postId));
  const [editedPost, setEditedPost] = useState(selectedPost);
  const [editMode, setEditMode] = useState(false);

  console.log('selectedpost is', selectedPost);

  useEffect(() => {
    dispatch({ type: 'FETCH_POSTS' });
  }, []);

  if (!selectedPost) {
    return <div>Loading or Error...</div>; 
  }

  function handleSaveClick () {
    dispatch({ type: 'UPDATE_POST', payload: {data:editedPost,groupId: selectedPost.reading_group_id } })
    setEditMode(false);
  }

  function handleDeleteClick() {
    // Display a confirmation pop-up alert
    const confirmed = window.confirm('Are you sure you want to delete this post?');
  
    // Proceed with deleting the post if the user confirms
    if (confirmed) {
      dispatch({ type: 'DELETE_POST', payload: { id: selectedPost.id, groupId: selectedPost.reading_group_id } });
      history.goBack();
    }
  }
  

  return (
    <Box className='style-container'>
    <Flex className='the-content' direction={'column'} minH={'100vh'}>
    <Container my="30px" p="10px">

    <ButtonGroup spacing={'15px'}>
      {editMode ? (
        <Button onClick={handleSaveClick}>
          Save
        </Button>
      ) : (
        <Button variant={'outline'} color={'white'} _hover={blur} onClick={() => setEditMode(true)}>Edit</Button>
      )}
      <Button variant={'outline'} color={'white'} _hover={blur} onClick={handleDeleteClick}>
        Delete
      </Button>
      </ButtonGroup>

      <Heading textAlign={'center'} marginBottom={'30px'}>{selectedPost.title}</Heading>
      {editMode ? (
        <div>
          <Input
            type="text"
            value={editedPost.title}
            onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
          />
          <Textarea 
            value={editedPost.body}
            rows={'40'}
            onChange={(e) => setEditedPost({ ...editedPost, body: e.target.value })}
          />
        </div>
      ) : (
        <Textarea isReadOnly='true' rows={'40'}>{selectedPost.body}</Textarea>
      )}
    
      </Container>
      </Flex>
      </Box>
  );
};

export default PostDetailsPage;
