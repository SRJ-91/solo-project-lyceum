import React, { useEffect, useState } from 'react';
import "./LaunchPage.css";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { format } from 'date-fns';
import { Heading, Container, Image, Flex, Box, VStack, Button, ButtonGroup, Table,Thead,Tbody,Tr,Th,Td,TableCaption,TableContainer, } from '@chakra-ui/react'

const LaunchPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const store = useSelector(store => store.groups);

    useEffect(() => {
        // Fetch group data
        dispatch({ type: 'FETCH_ACTIVE' });
      }, []);

      const handleRowClick = (groupId) => {
        history.push(`/details/${groupId}`);
      };

      return (
        <Box className='dashboard'>
        <Container maxW={'1200px'}>
          <Flex direction={'column'}>
            
            <Heading textAlign={'center'} color={'white'} marginBottom={'15px'}>Welcome to the Lyceum</Heading>

            <VStack className='button-container'>
            <ButtonGroup spacing={'15px'}>
            <Button onClick={() => history.push('/create-group')}>Create Group</Button>
            <Button variant={'outline'} color={'white'} _hover={blur} onClick={() => history.push('/all-users')}>All Users</Button>
            <Button variant={'outline'} color={'white'} _hover={blur} onClick={() => history.push('/all-badges')}>Badges</Button>
            <Button variant={'outline'} color ={'white'} _hover={blur} onClick={() => history.push('/archive')}>Go to Archive</Button>
            </ButtonGroup>
            </VStack>
           
          <Box className='Table-Box'>
          <TableContainer className='The-Table'>  
          <Table variant="simple" colorScheme='whiteAlpha'>
          <TableCaption placement='top'>All Active Reading Groups</TableCaption>
            <Thead>
              <Tr>
                <Th>Status</Th>
                <Th>Region</Th>
                <Th>Book Name</Th>
                <Th>Team Name</Th>
                <Th>Cohort</Th>
                <Th>Start Date</Th>
                <Th>End Date</Th>
              </Tr>
              </Thead>
            <Tbody>
              {store.map((group) => (
                <Tr
                key={group.id}
                onClick={() => handleRowClick(group.id)}
                style={{ cursor: 'pointer' }}
              >
               <Td>{group.status ? 'DONE' : 'ACTIVE'}</Td>
               <Td>{group.region}</Td>
               <Td>{group.book_name}</Td>
               <Td>{group.team_name}</Td>
               <Td>{group.cohort}</Td>
               <Td>{format(new Date(group.start_date), 'MM/dd/yyyy')}</Td>
               <Td>{format(new Date(group.end_date), 'MM/dd/yyyy')}</Td>
             </Tr>
              ))}
            </Tbody>
            </Table>
            </TableContainer>
          </Box>
          </Flex>
          </Container>
          </Box>
      );
      
}

export default LaunchPage
