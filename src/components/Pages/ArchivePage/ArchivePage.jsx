import React, { useEffect, useState } from 'react';
import "./ArchivePage.css";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { format } from 'date-fns';
import { Heading, Container, Image, Flex, Box, VStack, Button, ButtonGroup, Table,Thead,Tbody,Tr,Th,Td,TableCaption,TableContainer, } from '@chakra-ui/react'

const ArchivePage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const store = useSelector(store => store.groups);

    useEffect(() => {
        // Fetch group data IF STATUS IS DONE/TRUE
        dispatch({ type: 'FETCH_DONE' });
      }, []);

      const handleRowClick = (groupId) => {
        history.push(`/details/${groupId}`);
      };

  return (
<Box className='archive-dashboard'>
<Container maxW={'1200px'}>
    <Flex direction={'column'}>
      
    <Heading textAlign={'center'} color={'white'} marginBottom={'15px'}>Lyceum Archive</Heading>
       <VStack className='button-container'>
        <ButtonGroup>
        <Button onClick={() => history.push('/all-users')}>All Users</Button>
        <Button onClick={() => history.push('/all-badges')}>Badges</Button>
        <Button onClick={() => history.push('/launch')}>Go to Active</Button>
        </ButtonGroup>
        </VStack>

    <Box className='Archive-Table-Box'>
    <TableContainer className='The-Archive-Table'>  
    <Table variant="simple" colorScheme='whiteAlpha'>
    <TableCaption placement='top'>All Archived Reading Groups</TableCaption>
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
  )
}

export default ArchivePage
