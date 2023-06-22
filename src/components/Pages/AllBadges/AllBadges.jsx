import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

const AllBadges = () => {
    const history = useHistory();
    const store = useSelector(store => store.badges);
    const dispatch = useDispatch();


  return (
    <div>
      <h4>Viewing all Badges</h4>
      {/* Badges are mapped out */}
      


    </div>
  )
}

export default AllBadges
