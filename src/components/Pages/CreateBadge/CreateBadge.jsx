import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Box, Button, Heading, Input } from '@chakra-ui/react';

const CreateBadge = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // Initial local state for the new badge
  const [newBadge, setNewBadge] = useState({
    name: '',
    img: '',
    description: '',
  });

  // Function to create the badge
  const addNewBadge = event => {
    event.preventDefault();
    dispatch({ type: 'CREATE_BADGE', payload: newBadge });
    history.push('/all-badges');
  };

  return (
    <Box className='badge-page'>
      <Button onClick={() => history.push('/all-badges')}>Return to Badges</Button>
      <Box className='badge-display'>
        <Heading color={'white'} textAlign={'center'} marginTop={'20px'} marginBottom={'20px'}>
          Create a badge
        </Heading>
        <div>
          <Input
            type="text"
            placeholder='Badge Name'
            textColor={'white'}
            value={newBadge.name}
            fontWeight={'extrabold'}
            onChange={event => setNewBadge({ ...newBadge, name: event.target.value })}
            isRequired={true}
          />
        </div>
        <div>
          <Input
            type="file"
            width='400px'
            textColor={'white'}
            onChange={event => setNewBadge({ ...newBadge, img: event.target.files[0] })}
            isRequired={true}
          />
        </div>
        <div className='badge-details'>
          <Input
            type="text"
            placeholder='Badge Description'
            value={newBadge.description}
            fontWeight={'extrabold'}
            onChange={event => setNewBadge({ ...newBadge, description: event.target.value })}
            isRequired={true}
          />
        </div>
        <div>
          <Button type='submit' fontWeight={'extrabold'} onClick={addNewBadge}>
            Add New Badge
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default CreateBadge;
