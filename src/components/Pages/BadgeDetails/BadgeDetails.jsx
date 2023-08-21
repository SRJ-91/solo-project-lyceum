import React, { useState } from 'react';
import "./BadgeDetails.css";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, ButtonGroup, Container, Heading, Input, Text, Box, Center } from '@chakra-ui/react';

const BadgeDetailsPage = () => {
  const { badgeId } = useParams();
  const badges = useSelector((store) => store.badges);
  const selectedBadge = badges.find((badge) => badge.id === Number(badgeId));
  const dispatch = useDispatch();
  const history = useHistory();

  const [editing, setEditing] = useState(false);
  const [editedBadge, setEditedBadge] = useState({
    img: selectedBadge.img || '',
    name: selectedBadge.name,
    description: selectedBadge.description,
  });

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    dispatch({ type: 'UPDATE_BADGE', payload: editedBadge });
    setEditing(false);
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this badge?');
    if (confirmDelete) {
      dispatch({ type: 'DELETE_BADGE', payload: selectedBadge.id });
      history.push('/all-badges');
    }
  };

  return (
    <Box className='badge-page'>
      <ButtonGroup>
        <Button onClick={() => history.push('/all-badges')}>Return to Badges</Button>
        {!editing && (
          <>
            <Button onClick={handleEditClick}>Edit</Button>
            <Button onClick={handleDeleteClick}>Delete</Button>
          </>
        )}
        {editing && (
          <Button onClick={handleSaveClick}>Save</Button>
        )}
      </ButtonGroup>

      <Box className='badge-display'>
      <Heading color={'white'} textAlign={'center'} marginTop={'20px'} marginBottom={'20px'}>{editing ? (
        <Input
          type="text"
          value={editedBadge.name}
          onChange={(e) => setEditedBadge({ ...editedBadge, name: e.target.value })}
        />
      ) : (
        selectedBadge.name
      )}</Heading>

      
      {!editing && (
        <img
        className='badge-picture'
          src={selectedBadge.img}
          alt={selectedBadge.name}
          width="500px"
        />
      )}
      {editing && (
        <Input
          type="file"
          htmlSize={4} 
          width='auto'
          textColor={'white'}
          onChange={(e) => setEditedBadge({ ...editedBadge, img: e.target.files[0] })}
        />
      )}
      </Box>

      <div className='badge-details'>
        <Text>{editing ? (
          <Input
            type="text"
            value={editedBadge.description}
            onChange={(e) => setEditedBadge({ ...editedBadge, description: e.target.value })}
          />
        ) : (
          selectedBadge.description
        )}</Text>
      </div>

    </Box>
  );
};

export default BadgeDetailsPage;
