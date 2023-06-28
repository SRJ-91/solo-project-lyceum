import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Heading, Text, Container } from '@chakra-ui/react'

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
    <Container my="30px" p="10px">
      <Heading>{selectedPost.title}</Heading>
      {editMode ? (
        <div>
          <input
            type="text"
            value={editedPost.title}
            onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
          />
          <Text marginLeft="30px"> 
            value={editedPost.body}
            onChange={(e) => setEditedPost({ ...editedPost, body: e.target.value })}
          </Text>
        </div>
      ) : (
        <p>{selectedPost.body}</p>
      )}
      {editMode ? (
        <button onClick={handleSaveClick}>
          Save
        </button>
      ) : (
        <button onClick={() => setEditMode(true)}>Edit</button>
      )}
      <button onClick={handleDeleteClick}>
        Delete
      </button>
      </Container>
  );
};

export default PostDetailsPage;
