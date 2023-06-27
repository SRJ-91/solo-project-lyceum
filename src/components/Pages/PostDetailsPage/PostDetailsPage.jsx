import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostDetailsPage = () => {

   //Hooks
   const { postId } = useParams();
   const posts = useSelector((store) => store.posts);
   const dispatch = useDispatch();
   const selectedPost = posts.find((post) => post.id === Number(postId));
   console.log('posts are', posts);

   useEffect(() => {
    // Fetch group data
    dispatch({ type: 'FETCH_POSTS' });
  }, []);



  return (
    <div>
      <h1>{selectedPost.title}</h1>
      <p>{selectedPost.body}</p>
    </div>
  )
}

export default PostDetailsPage
