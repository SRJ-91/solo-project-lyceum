import React, { useEffect } from 'react';
import "./AllUsers.css";
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { Avatar, AvatarBadge, AvatarGroup, Heading, Box, Img, VStack, Button, ButtonGroup, Table,Thead,Tbody,Tr,Th,Td,TableCaption,TableContainer } from '@chakra-ui/react'

const AllUsers = () => {
    const dispatch = useDispatch();
    const store = useSelector(store => store.allUsers);
    console.log('users is', store);



    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_USERS' });
      }, []);

    return (
        <Box className='user-page'>
            <Heading color={'white'} textAlign={'center'} marginBottom={'30px'}>All Members</Heading>
            <Box className='user-table'>
          <Table variant="simple" colorScheme='whiteAlpha'>
            <Thead>
              <Tr>
                <Th>Avatar</Th>
                <Th>Region</Th>
                <Th>Username</Th>
                <Th>Role</Th>
                <Th>Date Joined</Th>
              </Tr>
            </Thead>
            <Tbody>
            {store && store.map((user) => (
                <Tr key={user.id}>
                  <Td><Img src={user.avatar} alt="Avatar" /></Td>
                  <Td>{user.region}</Td>
                  <Td>{user.username}</Td>
                  <Td>{user.role}</Td>
                  <Td>{format(new Date(user.created_at), 'MM/dd/yyyy')}</Td>
                </Tr>
              ))}
              {/* <Td>{format(new Date(group.start_date), 'MM/dd/yyyy')}</Td> */}
            </Tbody>
          </Table>
          </Box>
        </Box>
      );
}

export default AllUsers
