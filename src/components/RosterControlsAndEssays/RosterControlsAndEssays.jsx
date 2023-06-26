import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios'

const RosterControlsAndEssays = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const posts = useSelector((posts) => store.posts);
    const members = useSelector((members) => store.members);



  return (
    
    <div>
      
    </div>
  )
}

export default RosterControlsAndEssays
