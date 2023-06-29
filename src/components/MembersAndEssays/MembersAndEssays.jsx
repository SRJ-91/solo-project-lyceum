import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Table,Thead,Tbody,Tr,Th,Td,TableCaption,TableContainer,Image,Input,Select,Option, Button, Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, } 
  from '@chakra-ui/react'


const MembersAndEssays = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const posts = useSelector((posts) => posts.posts);
    const users = useSelector((store) => store.user.allUsers);
    const members = useSelector((members) => members.members);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');

    console.log(users);

    const openModal = () => {
        setIsModalOpen(true);
      };

      const handleAddMember = () => {
        // Dispatch an action to add the selectedUser to the userGroup
        dispatch({ type: 'ADD_MEMBER', payload: selectedUser });
        setSelectedUser('');
      };
      
        useEffect(() => {
        dispatch({ type: 'FETCH_USERS' });    
        dispatch({ type: 'FETCH_MEMBERS' });
      },[]);  


      return (
        <div>
          <Button onClick={openModal}>Add Member</Button>
    
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
                    <img src={member.avatar} alt="Avatar" />
                  </Td>
                  <Td>{member.region}</Td>
                  <Td>{member.username}</Td>
                  <Td>{member.role}</Td>
                  <Td>
                    <Button>Edit Role</Button>
                    <Button>Kick</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          </TableContainer>
    
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Add Member Modal"
            >
            <Heading>Add Member</Heading>
    
            <Select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
              <Option value="">Select a user</Option>
              {Object.values(users).map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.username}
                </Option>
              ))}
            </Select>
            <Button onClick={handleAddMember}>Enlist</Button>
            <Button onClick={setIsModalOpen(false)}>Close</Button>
          </Modal>
        </div>
      );
      
}

export default MembersAndEssays
