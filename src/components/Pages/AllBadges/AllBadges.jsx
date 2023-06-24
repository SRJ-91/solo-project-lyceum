import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

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
    <h1>Viewing all Badges</h1>
    <button onClick={() => history.push('/launch')}>Return to Lyceum</button>
    <button onClick={() => history.push('/create-badge')}>Create a Badge</button>
    {/* Badges mapping */}
    {badges.map((badge) => (
      <div className='badge' key={badge.id} >
        <img 
        src={badge.img} 
        alt="Badge"
        width={'200px'}
        onClick={() => handleBadgeClick(badge.id)}
        />
        <p>{badge.name}</p>
      </div>
    ))}
  </div>
);
};

export default AllBadges
