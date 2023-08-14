import React, { useEffect, useState } from 'react';
import "./CreateGroup.css";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { format } from 'date-fns';
import { Button, Container, Text, Flex, Heading, Box, FormControl, FormLabel, Input, FormHelperText, Textarea, Checkbox, Select } from "@chakra-ui/react"

const CreateGroup = () => {

  const history = useHistory();
  const dispatch = useDispatch();


  // States for every input on form, naming is consistent with SQL database
  const [book_name, setBook_Name] = useState('');
  const [cover, setCover] = useState('');
  const [team_name, setTeam_Name] = useState('');
  const [logo, setLogo] = useState('');
  const [start_date, setStart_Date] = useState('');
  const [end_date, setEnd_Date] = useState('');
  const [cohort, setCohort] = useState('');
  const [region, setRegion] = useState('');
  const [details, setDetails] = useState('');

  const [selectedBadgeId, setSelectedBadgeId] = useState('');

  useEffect(() => {
    // Fetch badge data
    dispatch({ type: 'FETCH_BADGES' });
  }, []);

  const badges = useSelector(store => store.badges);


  function handleGroupLaunch() {
    event.preventDefault();
    // Create a new group object with the input values
    const newGroup = {
      badge_id: selectedBadgeId, // Include the selected badge ID
      book_name,
      cover,
      team_name,
      logo,
      start_date,
      end_date,
      cohort,
      region,
      details,
    };

    // Dispatch the CREATE_GROUP action with the new group object
    dispatch({ type: 'CREATE_GROUP', payload: newGroup });

    console.log('The group sent was', newGroup);

    // Navigate to the "/launch" screen
    history.push('/launch');
  }


  // onSubmit={handleGroupLaunch}>

  return (
    <Box className='create-page'>
    <Container className='create-container' centerContent maxW={'xl'}>
      <Heading marginBottom={'15px'}>Create a Reading Group</Heading>
      <Text fontSize={'xs'} marginBottom={'20px'}>Team Name and Logo is not required and can be chosen later</Text>
      <Button marginBottom={'20px'} onClick={() => history.push('/launch')}>Go Back</Button>
      <form
        onSubmit={handleGroupLaunch}>

        <label htmlFor="badge">Badge:</label>
        <Select
          id="badge"
          marginBottom={'10px'}
          value={selectedBadgeId}
          onChange={(e) => setSelectedBadgeId(e.target.value)}>
          <option value="">Select Badge</option>{badges.map((badge) => (
            <option key={badge.id} value={badge.id}>
              {badge.name}
            </option>
          ))}
        </Select>

        <label htmlFor="cover">Cover:</label>
        <Input
          type="file"
          id="cover"
          marginBottom={'10px'}
          // placeholder='IMG URL'
          // _placeholder={{ opacity: 1, color: 'black' }}
          value={cover}
          onChange={(e) => setCover(e.target.value)}
          isRequired={true}
        />

        <label htmlFor="logo">Logo:</label>
        <Input
          type="file"
          id="logo"
          marginBottom={'10px'}
          // placeholder='IMG URL'
          // _placeholder={{ opacity: 1, color: 'black' }}
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
        />

        <label htmlFor="book_name">Book Name:</label>
        <Input
          type="text"
          id="book_name"
          marginBottom={'10px'}
          value={book_name}
          onChange={(e) => setBook_Name(e.target.value)}
          isRequired={true}
        />

        <label htmlFor="team_name">Team Name:</label>
        <Input
          type="text"
          id="team_name"
          marginBottom={'10px'}
          value={team_name}
          onChange={(e) => setTeam_Name(e.target.value)}
        />

        <label htmlFor="start_date">Start Date:</label>
        <Input
          type="date"
          id="start_date"
          marginBottom={'10px'}
          value={start_date}
          onChange={(e) => setStart_Date(e.target.value)}
          isRequired={true}
        />

        <label htmlFor="end_date">End Date:</label>
        <Input
          type="date"
          id="end_date"
          marginBottom={'10px'}
          value={end_date}
          onChange={(e) => setEnd_Date(e.target.value)}
          isRequired={true}
        />

        <label htmlFor="cohort">Cohort:</label>
        <Select
          id="cohort"
          value={cohort}
          marginBottom={'10px'}
          onChange={(e) => setCohort(e.target.value)}
          isRequired={true}
        >
          {/* Options for cohort */}
          <option value="">Select Cohort</option>
          <option value="1">Cohort 1</option>
          <option value="2">Cohort 2</option>
          <option value="3">Cohort 3</option>
          {/* Add more options as needed */}
        </Select>

        <label htmlFor="region">Region:</label>
        <Input
          type="text"
          id="region"
          marginBottom={'10px'}
          placeholder='Continent-Timezone'
          _placeholder={{ opacity: 1, color: 'black' }}
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          isRequired={true}
        />

        <label htmlFor="details">Details:</label>
        <Textarea
          id="details"
          value={details}
          rows={'8'}
          placeholder='Put the welcome message and/or first assignment here'
          _placeholder={{ opacity: 1, color: 'black' }}
          onChange={(e) => setDetails(e.target.value)}
          isRequired={true}
        ></Textarea>
        <div><Button type="submit" marginLeft={'90px'} marginTop={'15px'}> Launch Group</Button></div>
      </form>
    </Container>
    </Box>
  )
}

export default CreateGroup