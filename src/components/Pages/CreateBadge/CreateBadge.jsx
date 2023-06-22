import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const CreateBadge = () => {

    const history = useHistory();
    const store = useSelector(store => store.groups);
    const dispatch = useDispatch();

    //Initial state is an OBJECT, with keys id and name
    let [newBadge, setBadge] = useState({ name: '', img: ''});

    //Function to create the bagde
    const addNewBadge = event => {
        event.preventDefault();
        dispatch({ type: 'CREATE_BADGE', payload: newBadge });
        history.push({/*The badges screen*/})    
    }

  return (
    <div>
        <h2>Create a badge</h2>
        <form onSubmit={addNewBadge}>
        <input 
        type="text" 
        placeholder='Badge Name'
        value={newBadge.name}
        onChange={(event) => setBadge({...newBadge, name: event.target.value})}
        />
         <input 
        type="text" 
        placeholder='Badge Url'
        value={newBadge.img}
        onChange={(event) => setBadge({...newBadge, img: event.target.value})}
        />
        <input type='submit' value='Add New Badge' />
        </form>
    </div>
  )
}

export default CreateBadge
