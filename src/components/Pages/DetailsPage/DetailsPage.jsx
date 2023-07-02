import React, { useEffect, useState } from 'react';
import "./DetailsPage.css";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import RosterControlsAndEssays from '../../RosterControlsAndEssays/RosterControlsAndEssays';
import Submissions from '../Submissions/Submissions';
import {
  Table,Thead,Tbody,Tr,Th,Td,TableCaption,TableContainer,Image, Text, Container,Input,Button,ButtonGroup,Flex,Textarea,Box, FormControl, FormLabel } 
  from '@chakra-ui/react'

const DetailsPage = () => {
  const groupId = useParams();
  const groups = useSelector((store) => store.groups);
  const user = useSelector((store) => store.user);
  const userGroupId = useSelector((store) => {
    const filteredMembers = store.members.filter(member => member.id === user.id);
    return filteredMembers.length > 0 ? filteredMembers[0].user_groups_id : '';
  });
  console.log('the value of userGroupId is', userGroupId);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // Fetch group data
    dispatch({ type: 'FETCH_SELECTED_GROUP', payload: groupId.groupId })
    dispatch({ type: 'FETCH_POSTS', payload: groupId.groupId });;
  }, []);

  // In case group doesn't render. Wraps whole return statement
  const allowRefresh = groups[0];
  console.log(allowRefresh);

  //state to handle editing
  const [editing, setEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({});

  const handleEditClick = () => {
    setEditing(true);
    // Initialize edited values with current group data
    setEditedValues({
      cover: groups[0]?.cover,
      logo: groups[0]?.logo,
      team_name: groups[0]?.team_name,
      book_name: groups[0]?.book_name,
      cohort: groups[0]?.cohort,
      region: groups[0]?.region,
      start_date: groups[0]?.start_date,
      end_date: groups[0]?.end_date,
      details: groups[0]?.details,
    });
  };

  const handleSaveClick = () => {
    // Send PUT request with editedValues to update group data
    const updatedGroup = {
      id: groups[0]?.id,
      cover: editedValues.cover,
      logo: editedValues.logo,
      team_name: editedValues.team_name,
      book_name: editedValues.book_name,
      cohort: editedValues.cohort,
      region: editedValues.region,
      start_date: editedValues.start_date,
      end_date: editedValues.end_date,
      details: editedValues.details,
    };

    dispatch({ type: 'UPDATE_GROUP', payload: updatedGroup });
    setEditing(false);
  };


  const handleStatusClick = () => {
    // Display a confirmation pop-up alert
    const confirmed = window.confirm('Are you sure you want to change this reading groups status?');
  
    // Proceed with updating the status if the user confirms
    if (confirmed) {
      // Determine the updated status based on the current status
      const updatedStatus = !groups[0]?.status; // Toggle the status value
  
      // Dispatch an action to update the status
      dispatch({ type: 'UPDATE_STATUS', payload: { id: groups[0]?.id, status: updatedStatus } });
  
      // Determine the target route based on the updated status
      const targetRoute = updatedStatus ? '/archive' : '/launch';
  
      // Redirect to the target route
      history.push(targetRoute);
    }
  };
  

  
  return (
    <>
      {allowRefresh !== undefined ? (
        <>
        <Box className={groups[0]?.status ? 'art-done' : 'details-art'}>
          <Container maxW={'1200px'}>
        <Flex direction={'column'}>
          <Flex justify={'space-between'}>
            <div>
          <Image
          className='portraits' 
          src={groups[0]?.cover} 
          alt="Cover"
          boxSize={'300px'}
          objectFit={'cover'} 
          />
          {editing && (
            <FormControl>
            <FormLabel color={'white'}> Book Cover URL</FormLabel>
            <Input
              value={editedValues.cover || ''}
              color={'white'}
              onChange={(e) => setEditedValues({ ...editedValues, cover: e.target.value })}
            />
            </FormControl>
          )}
            </div>
          
          <div>
          <Box className='details-table-wrap'>
          <TableContainer>
          <Table className='details-table-editing' alignContent={'center'}>
          <TableCaption placement='top'>Group Info</TableCaption>
            <Thead>
              <Tr>
                <Td>
                  {editing ? (
                    <FormControl>
                    <FormLabel color={'white'}> Team Name</FormLabel>
                    <Input
                      color={'white'}
                      value={editedValues.team_name || ''}
                      onChange={(e) => setEditedValues({ ...editedValues, team_name: e.target.value })}
                    />
                    </FormControl>
                  ) : (
                    groups[0]?.team_name
                  )}
                </Td>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  {editing ? (
                    <FormControl>
                    <FormLabel color={'white'}> Book Name</FormLabel>
                    <Input
                      color={'white'}
                      value={editedValues.book_name || ''}
                      onChange={(e) => setEditedValues({ ...editedValues, book_name: e.target.value })}
                    />
                    </FormControl>
                  ) : (
                    groups[0]?.book_name
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>
                    
                  {editing ? (
                    <FormControl>
                    <FormLabel color={'white'}> Cohort Number</FormLabel>
                    <Input
                    color={'white'}
                      value={editedValues.cohort || ''}
                      onChange={(e) => setEditedValues({ ...editedValues, cohort: e.target.value })}
                    />
                    </FormControl>
                  ) : (groups[0]?.cohort)}
                
                </Td>
              </Tr>
              <Tr>
                <Td>
                  {editing ? (
                    <FormControl>
                    <FormLabel color={'white'}>Region</FormLabel>
                    <Input
                    color={'white'}
                      value={editedValues.region || ''}
                      onChange={(e) => setEditedValues({ ...editedValues, region: e.target.value })}
                    />
                    </FormControl>
                  ) : (
                    groups[0]?.region
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  {editing ? (
                    <FormControl>
                    <FormLabel color={'white'}>Start Date</FormLabel>
                    <Input
                    color={'white'}
                      value={editedValues.start_date || ''}
                      onChange={(e) => setEditedValues({ ...editedValues, start_date: e.target.value })}
                    />
                    </FormControl>
                  ) : (
                    format(new Date(groups[0]?.start_date), 'MM/dd/yyyy')
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  {editing ? (
                    <FormControl>
                    <FormLabel color={'white'}>End Date</FormLabel>
                    <Input
                    color={'white'}
                      value={editedValues.end_date || ''}
                      onChange={(e) => setEditedValues({ ...editedValues, end_date: e.target.value })}
                    />
                    </FormControl>
                  ) : (
                    format(new Date(groups[0]?.end_date), 'MM/dd/yyyy')
                  )}
                </Td>
              </Tr>
            </Tbody>
          </Table>
          </TableContainer>
          </Box>

          <ButtonGroup>
          <Button variant={'outline'} color={'white'} _hover={blur} onClick={() => history.push('/launch')}>Return to Lyceum</Button>
          <Button variant={'outline'} color={'white'} _hover={blur} onClick={handleEditClick}>Edit</Button>
          {!groups[0]?.status ? (
            <Button onClick={handleStatusClick}>End Group</Button>
          ) : (
            <Button onClick={handleStatusClick}>Reactivate</Button>
          )}
          {editing && <Button onClick={handleSaveClick}>Save</Button>}
          </ButtonGroup>
            
          </div>
          
          <div>
          <Image
          className='portraits'  
          src={groups[0]?.logo} 
          alt="Logo"
          boxSize={'300px'}
          objectFit={'cover'} 
          />
          
          {editing && (
            <FormControl>
            <FormLabel color={'white'}>Team Logo Url</FormLabel>
            <Input
            color={'white'}
              value={editedValues.logo || ''}
              onChange={(e) => setEditedValues({ ...editedValues, logo: e.target.value })}
            />
            </FormControl>
          )}
          </div>
          </Flex>

          <div className='class-details'>
          <Text rows={'8'}>
            {editing ? (
              <FormControl>
              <FormLabel color={'white'}>Change Details Here</FormLabel>
              <Textarea
              rows={'8'}
                value={editedValues.details || ''}
                onChange={(e) => setEditedValues({ ...editedValues, details: e.target.value })}
              />
              </FormControl>
            ) : (
              groups[0]?.details
            )}
          </Text>
          </div>
          </Flex>
        </Container>
        
        <div className='roster-container'>
        <Container maxW={'1200px'}>
          <RosterControlsAndEssays groupId={groupId.groupId} />
          <Submissions
            badgeId={groups[0].badge_id}
            userId={user.id}
            userGroupId={userGroupId}
          />
          </Container>
          </div>
          </Box>
        </>
          
          
        
      ) : (
        <p>Nothing</p>
      )}
    </>
  );
};

export default DetailsPage;