import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import RosterControlsAndEssays from '../../RosterControlsAndEssays/RosterControlsAndEssays';
import Submissions from '../Submissions/Submissions';
import {
  Table,Thead,Tbody,Tr,Th,Td,TableCaption,TableContainer,Image,Input,Button,ButtonGroup,Flex,Textarea } 
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
    // window.location.reload();
  };

  const handleStatusClick = () => {
    // Determine the updated status based on the current status
    const updatedStatus = {
      id: groups[0]?.id,
      status: !groups[0]?.status, // Toggle the status value
    };

    dispatch({ type: 'UPDATE_STATUS', payload: updatedStatus });
    history.push('/archive')
  };




  return (
    <>
      {allowRefresh !== undefined ? (
        <Flex direction={'column'}>
          <Image 
          src={groups[0]?.cover} 
          alt="Cover"
          boxSize={'300px'}
          objectFit={'cover'} 
          />
          {editing && (
            <Input
              value={editedValues.cover || ''}
              onChange={(e) => setEditedValues({ ...editedValues, cover: e.target.value })}
            />
          )}

          <ButtonGroup>
          <Button onClick={() => history.push('/launch')}>Return to Lyceum</Button>
          <Button onClick={handleEditClick}>Edit</Button>
          {!groups[0]?.status ? (
            <Button onClick={handleStatusClick}>Mark Done</Button>
          ) : (
            <Button onClick={handleStatusClick}>Reactivate</Button>
          )}
          </ButtonGroup>

          <TableContainer>
          <Table>
          <TableCaption placement='top'>Group Info</TableCaption>
            <Thead>
              <Tr>
                <Th>
                  {editing ? (
                    <Input
                      value={editedValues.team_name || ''}
                      onChange={(e) => setEditedValues({ ...editedValues, team_name: e.target.value })}
                    />
                  ) : (
                    groups[0]?.team_name
                  )}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  {editing ? (
                    <Input
                      value={editedValues.book_name || ''}
                      onChange={(e) => setEditedValues({ ...editedValues, book_name: e.target.value })}
                    />
                  ) : (
                    groups[0]?.book_name
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  {editing ? (
                    <Input
                      value={editedValues.cohort || ''}
                      onChange={(e) => setEditedValues({ ...editedValues, cohort: e.target.value })}
                    />
                  ) : (
                    groups[0]?.cohort
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  {editing ? (
                    <Input
                      value={editedValues.region || ''}
                      onChange={(e) => setEditedValues({ ...editedValues, region: e.target.value })}
                    />
                  ) : (
                    groups[0]?.region
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  {editing ? (
                    <Input
                      value={editedValues.start_date || ''}
                      onChange={(e) => setEditedValues({ ...editedValues, start_date: e.target.value })}
                    />
                  ) : (
                    format(new Date(groups[0]?.start_date), 'MM/dd/yyyy')
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  {editing ? (
                    <Input
                      value={editedValues.end_date || ''}
                      onChange={(e) => setEditedValues({ ...editedValues, end_date: e.target.value })}
                    />
                  ) : (
                    format(new Date(groups[0]?.end_date), 'MM/dd/yyyy')
                  )}
                </Td>
              </Tr>
            </Tbody>
          </Table>
          </TableContainer>
          <Image 
          src={groups[0]?.logo} 
          alt="Logo"
          boxSize={'300px'}
          objectFit={'cover'} 
          />
          {editing && (
            <Input
              value={editedValues.logo || ''}
              onChange={(e) => setEditedValues({ ...editedValues, logo: e.target.value })}
            />
          )}
          <Textarea>
            {editing ? (
              <Input
                value={editedValues.details || ''}
                onChange={(e) => setEditedValues({ ...editedValues, details: e.target.value })}
              />
            ) : (
              groups[0]?.details
            )}
          </Textarea>

          <RosterControlsAndEssays groupId={groupId.groupId} />
          <Submissions
            badgeId={groups[0].badge_id}
            userId={user.id}
            userGroupId={userGroupId}
          />

          {editing && <button onClick={handleSaveClick}>Save</button>}
        </Flex>
      ) : (
        <p>Nothing</p>
      )}
    </>
  );
};

export default DetailsPage;