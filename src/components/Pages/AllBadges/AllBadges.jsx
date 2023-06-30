import React, { useEffect, useState } from 'react';
import "./AllBadges.css";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {Button, ButtonGroup, Heading, Input, Text, Card, CardHeader, CardBody, CardFooter} from '@chakra-ui/react'

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
    <div>
    <Heading>Viewing all Badges</Heading>
    <ButtonGroup className='the-buttons'>
    <Button onClick={() => history.push('/launch')}>Return to Lyceum</Button>
    <Button onClick={() => history.push('/create-badge')}>Create a Badge</Button>
    </ButtonGroup>
    {/* Badges mapping */}
    {badges.map((badge) => (
      <div className='badge' key={badge.id} >
        <img 
        src={badge.img} 
        alt="Badge"
        width={'200px'}
        onClick={() => handleBadgeClick(badge.id)}
        />
        <div className='badge-description'>
        <Text 
        color={'black'}>  
          
        {badge.name}
        </Text>
        </div>
      </div>
    ))}
  </div>
);
};

export default AllBadges
