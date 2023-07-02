import React, { useEffect } from 'react';
import "./AllUsers.css";
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { Avatar, AvatarBadge, AvatarGroup, Container, Heading, Box, Img, VStack, Button, ButtonGroup, Table,Thead,Tbody,Tr,Th,Td,TableCaption,TableContainer } from '@chakra-ui/react'

const AllUsers = () => {
    const dispatch = useDispatch();
    const store = useSelector(store => store.allUsers);
    console.log('users is', store);



    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_USERS' });
      }, []);

    return (
        <Box className='user-page'>
          <Container maxW={'1200px'}>
            <Heading color={'white'} textAlign={'center'} marginBottom={'20px'}>All Members</Heading>
            <Box className='user-table'>
          <Table variant="simple" colorScheme='whiteAlpha' overflowX={'auto'} overflowY={'scroll'}>
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
                  <Td><Avatar 
                  src={user.avatar} 
                  alt="Avatar" 
                  /></Td>
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
          </Container>
        </Box>
      );
}

export default AllUsers
