import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const CreateGroup = () => {

    const history = useHistory();
    const store = useSelector(store => store.groups);
    const dispatch = useDispatch();


        // States for every input on form, naming is consistent with SQL database
        const [book_name, setBook_Name] = useState('');
        const [cover, setCover] = useState('');
        const [team_name, setTeam_Name] = useState('');
        const [logo, setLogo] = useState('');
        const [start_date, set_Start_Date] = useState('');
        const [end_date, set_End_Date] = useState('');
        const [cohort, setCohort] = useState('');
        const [region, setRegion] = useState('');
        const [details, setDetails] = useState('');

    function handleGroupLaunch() {
        
    }
    



  return (
    <div>
      
    </div>
  )
}

export default CreateGroup
