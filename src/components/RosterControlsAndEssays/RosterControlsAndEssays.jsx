import React, { useEffect, useState } from 'react';
import "./RosterControlsAndEssays.css";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react'
import {
  Table,Thead,Tbody,Tr,Th,Td,TableCaption,TableContainer,Image,Input, Avatar, Button,Select,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, } 
  from '@chakra-ui/react'

const RosterControlsAndEssays = ({groupId}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allUsers = useSelector((state) => state.allUsers);
  const members = useSelector((state) => state.members);
  console.log('members are', members);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedUser, setSelectedUser] = useState('');

  const handleAddMember = () => {
    // Dispatch an action to add the selectedUser to the userGroup
    dispatch({ type: 'ADD_MEMBERS', payload: {user_id: selectedUser, reading_group_id:groupId, role: 1 } });
    console.log('selected user is',selectedUser);
    setSelectedUser('');
  };

  const handleKickMember = () => {
    dispatch({ type: 'REMOVE_USER_FROM_GROUP', payload: member.id })
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_USERS'});
    dispatch({ type: 'FETCH_MEMBERS', payload: groupId });
  }, []);

  return (
    <div>
      <Button onClick={onOpen}>Add Member</Button>
      <div className='roster-table'>
      <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Avatar</Th>
            <Th>Region</Th>
            <Th>Username</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {members.map((member) => (
            <Tr key={member.id}>
              <Td>
                <Avatar src={member.avatar} alt="Avatar" />
              </Td>
              <Td>{member.region}</Td>
              <Td>{member.username}</Td>
              <Td>{member.role}</Td>
              <Td>
                {/* <Button>Edit Role</Button> */}
                <Button onClick={() => dispatch({ type: 'REMOVE_USER_FROM_GROUP', payload: {memberId:member.id, groupId }}) }>
                    Kick
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
        <ModalContent>
        <ModalHeader>Add Member to Group</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <Select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Select a user</option>
          {allUsers.map((user) => (
            <option key={user.id}
               value={user.id}>
              {user.username}
            </option>
          ))}
        </Select>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleAddMember}>Enlist</Button>
        </ModalFooter>
        </ModalContent>
      </Modal>
      </TableContainer>
      </div>
    </div>
  );
};

export default RosterControlsAndEssays;