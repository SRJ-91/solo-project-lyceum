import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {Button, Heading, Input} from '@chakra-ui/react'


const CreateBadge = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    //Initial state is an OBJECT, with keys id and name
    let [newBadge, setBadge] = useState({ name: '', img: '', description: ''});

    //Function to create the bagde
    const addNewBadge = event => {
        event.preventDefault();
        dispatch({ type: 'CREATE_BADGE', payload: newBadge });
        history.push("all-badges");    
    }

  return (
    <div>
        <Heading>Create a badge</Heading>
        <Button onClick={() => history.push('/all-badges')}>Return to Badges</Button>
        <form onSubmit={addNewBadge}>
        <Input 
        type="text" 
        placeholder='Badge Name'
        value={newBadge.name}
        fontWeight={'extrabold'}
        onChange={(event) => setBadge({...newBadge, name: event.target.value})}
        />
         <Input 
        type="text" 
        placeholder='Badge Url'
        value={newBadge.img}
        fontWeight={'extrabold'}
        onChange={(event) => setBadge({...newBadge, img: event.target.value})}
        />
        <Input 
        type="text" 
        placeholder='Badge Description'
        value={newBadge.description}
        fontWeight={'extrabold'}
        onChange={(event) => setBadge({...newBadge, description: event.target.value})}
        />
        <Input 
        type='submit' 
        value='Add New Badge'
        fontWeight={'extrabold'} 
        />
        </form>
    </div>
  )
}

export default CreateBadge
