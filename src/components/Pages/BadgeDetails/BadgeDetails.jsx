import React, { useState} from 'react';
import "./BadgeDetails.css";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {Button, Heading, Input, Text} from '@chakra-ui/react'

const BadgeDetailsPage = () => {
    //Hooks
  const { badgeId } = useParams();
  const badges = useSelector((store) => store.badges);
  const selectedBadge = badges.find((badge) => badge.id === Number(badgeId));
  const dispatch = useDispatch();
  const history = useHistory();
    //If nothing found
  if (!selectedBadge) {
    return <div>Badge not found! Do not refresh the page here!</div>;
  }

   // State for editing badge details
   const [editing, setEditing] = useState(false);
   const [editedImg, setEditedImg] = useState(selectedBadge?.img || '');
   const [editedName, setEditedName] = useState(selectedBadge.name);
   const [editedDescription, setEditedDescription] = useState(selectedBadge.description);
 
   const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    const updatedBadge = {
      id: selectedBadge.id,
      img: editedImg,
      name: editedName,
      description: editedDescription,
    };

    dispatch({ type: 'UPDATE_BADGE', payload: updatedBadge });
    setEditing(false);
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this badge?');
    if (confirmDelete) {
      dispatch({ type: 'DELETE_BADGE', payload: selectedBadge.id });
      console.log(selectedBadge.id);
      history.push('/all-badges');
    }
  };

  const { name, img, description } = selectedBadge;

  return (
    <div>
        <Button onClick={() => history.push('/all-badges')}>Return to Badges</Button>
      {/* Render badge details */}
    <Heading>{selectedBadge.name}</Heading>
    {!editing && (
      <img
        src={selectedBadge.img}
        alt={selectedBadge.name}
        width="500px"
      />
    )}
    {editing && (
      <Input
        value={editedImg}
        onChange={(e) => setEditedImg(e.target.value)}
      />
    )}

    <div className='badge-details'>
    <Text>{selectedBadge.description}</Text>
    </div> 

      {/* Render edit and delete Buttons */}
      {!editing && (
        <div>
          <Button onClick={handleEditClick}>Edit</Button>
          <Button onClick={handleDeleteClick}>Delete</Button>
        </div>
      )}

      {/* Render input fields for editing */}
      {editing && (
        <div>
          <Input value={editedName} onChange={(e) => setEditedName(e.target.value)} />
          <Text value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)}></Text>
          <Button onClick={handleSaveClick}>Save</Button>
        </div>
      )}
    </div>
  );
};

export default BadgeDetailsPage;
