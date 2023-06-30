import React, { useEffect, useState } from 'react';
import "./PostDetailsPage.css";
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Heading, Text, Container, Flex, Button, ButtonGroup, Input } from '@chakra-ui/react'

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

  function handleDeleteClick () {
    dispatch({ type: 'DELETE_POST', payload: {id:selectedPost.id, groupId: selectedPost.reading_group_id }})
    history.goBack();
  }

  return (
    <Flex className='the-content' direction={'column'} minH={'100vh'}>
    <Container my="30px" p="10px">

    <ButtonGroup>
      {editMode ? (
        <Button onClick={handleSaveClick}>
          Save
        </Button>
      ) : (
        <Button onClick={() => setEditMode(true)}>Edit</Button>
      )}
      <Button onClick={handleDeleteClick}>
        Delete
      </Button>
      </ButtonGroup>

      <Heading>{selectedPost.title}</Heading>
      {editMode ? (
        <div>
          <Input
            type="text"
            value={editedPost.title}
            onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
          />
          <Input 
            value={editedPost.body}
            onChange={(e) => setEditedPost({ ...editedPost, body: e.target.value })}
          />
        </div>
      ) : (
        <p>{selectedPost.body}</p>
      )}
    
      </Container>
      </Flex>
  );
};

export default PostDetailsPage;
