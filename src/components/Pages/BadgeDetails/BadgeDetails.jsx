import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, ButtonGroup, Image, Heading, Input, Text, Box, VStack } from '@chakra-ui/react';

const BadgeDetailsPage = () => {
  const { badgeId } = useParams();
  const badges = useSelector((store) => store.badges);
  const selectedBadge = badges.find((badge) => badge.id === Number(badgeId));
  const dispatch = useDispatch();
  const history = useHistory();

  const [editing, setEditing] = useState(false);
  const [editedBadge, setEditedBadge] = useState({
    id: selectedBadge.id,
    img: selectedBadge.img,
    name: selectedBadge.name,
    description: selectedBadge.description,
  });

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    dispatch({ type: 'UPDATE_BADGE', payload: editedBadge });
    setEditing(false);
    history.push('/all-badges');
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
  {!editing && (
    <>
      <Button onClick={() => history.push('/all-badges')}>Return to Badges</Button>
      <Button variant={'outline'} color={'white'} _hover={blur} onClick={handleEditClick}>Edit</Button>
      <Button variant={'outline'} color={'white'} _hover={blur} onClick={handleDeleteClick}>Delete</Button>
    </>
  )}
  {editing && (
    <>
      <Button variant={'outline'} color={'white'} _hover={blur} onClick={handleSaveClick}>Save</Button>
      <Button variant={'outline'} color={'white'} _hover={blur} onClick={() => setEditing(false)}>Back</Button>
    </>
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
        <Image
        className='badge-picture'
          src={selectedBadge.img}
          alt={selectedBadge.name}
          width="500px"
          height="500px"
        />
      )}
      {editing && (
  <Input
    type="file"
    htmlSize={4} 
    width='auto'
    textColor={'white'}
    onChange={(e) => {
      setEditedBadge({ ...editedBadge, img: e.target.files[0] });
    }}
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
