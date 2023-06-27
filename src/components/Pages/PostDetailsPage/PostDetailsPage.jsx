import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostDetailsPage = () => {

  //hooks and state
  const { postId } = useParams();
  const posts = useSelector((store) => store.posts);
  const dispatch = useDispatch();
  const selectedPost = posts.find((post) => post.id === Number(postId));
  const [editedPost, setEditedPost] = useState(selectedPost);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_POSTS' });
  }, []);

  if (!selectedPost) {
    return <div>Loading...</div>; 
  }


  return (
    <div>
      <h1>{selectedPost.title}</h1>
      {editMode ? (
        <div>
          <input
            type="text"
            value={editedPost.title}
            onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
          />
          <textarea
            value={editedPost.body}
            onChange={(e) => setEditedPost({ ...editedPost, body: e.target.value })}
          ></textarea>
        </div>
      ) : (
        <p>{selectedPost.body}</p>
      )}
      {editMode ? (
        <button onClick={() => dispatch({ type: 'UPDATE_POST', payload: editedPost })}>
          Save
        </button>
      ) : (
        <button onClick={() => setEditMode(true)}>Edit</button>
      )}
      <button onClick={() => dispatch({ type: 'DELETE_POST', payload: selectedPost.id })}>
        Delete
      </button>
    </div>
  );
};

export default PostDetailsPage;
