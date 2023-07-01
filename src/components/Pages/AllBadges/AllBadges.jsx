import React, { useEffect, useState } from 'react';
import "./AllBadges.css";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {Button, Box, SimpleGrid, Img, ButtonGroup, Heading, Input, Text, Card, CardHeader, CardBody, CardFooter} from '@chakra-ui/react'

const AllBadges = () => {
    const history = useHistory();
    const badges = useSelector(store => store.badges);
    const dispatch = useDispatch();

    useEffect(() => {
      // Fetch badge data
      dispatch({ type: 'FETCH_BADGES' });
    }, []);


    const handleBadgeClick = (badgeId) => {
      history.push(`/badge-details/${badgeId}`);
    };

    console.log('BADGES!',badges);

  return (
    <Box className='badge-page'>
    <Heading color={'white'} textAlign={'center'} marginTop={'20px'} marginBottom={'20px'}>Viewing all Badges</Heading>
    <ButtonGroup className='the-buttons'>
    <Button onClick={() => history.push('/launch')}>Return to Lyceum</Button>
    <Button onClick={() => history.push('/create-badge')}>Create a Badge</Button>
    </ButtonGroup>
    {/* Badges mapping */}
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
    {badges.map((badge) => (
      
      <Card variant={'elevated'} maxW={'md'} align={'center'} className='badge-card' key={badge.id} >
        <CardBody>
        <Img
        className='badge-picture'
        src={badge.img} 
        alt="Badge"
        width={'200px'}
        onClick={() => handleBadgeClick(badge.id)}
        />
        </CardBody>
        <Text className='badge-name' decoration='whitesmoke'>
        <CardFooter
        color={'black'}>  
        {badge.name}
        </CardFooter>
        </Text>
      </Card>
    ))}
    </SimpleGrid>
  </Box>
);
};

export default AllBadges
