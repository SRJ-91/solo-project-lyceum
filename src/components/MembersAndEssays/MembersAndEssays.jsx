import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactModal from 'react-modal';


const MembersAndEssays = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const posts = useSelector((posts) => posts.posts);
    const users = useSelector((store) => store.user.allUsers);
    const members = useSelector((members) => members.members);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');

    console.log(users);

    const openModal = () => {
        setIsModalOpen(true);
      };

      const handleAddMember = () => {
        // Dispatch an action to add the selectedUser to the userGroup
        dispatch({ type: 'ADD_MEMBER', payload: selectedUser });
        setSelectedUser('');
      };
      
        useEffect(() => {
        dispatch({ type: 'FETCH_USERS' });    
        dispatch({ type: 'FETCH_MEMBERS' });
      },[]);  


      return (
        <div>
          <button onClick={openModal}>Add Member</button>
    
          {/* <table>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Region</th>
                <th>Username</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>
                    <img src={member.avatar} alt="Avatar" />
                  </td>
                  <td>{member.region}</td>
                  <td>{member.username}</td>
                  <td>{member.role}</td>
                  <td>
                    <button>Edit Role</button>
                    <button>Kick</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
    
          <ReactModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Add Member Modal"
          >
            <h2>Add Member</h2>
    
            <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
              <option value="">Select a user</option>
              {/* {Object.values(users).map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))} */}
            </select>
            <button onClick={handleAddMember}>Enlist</button>
          </ReactModal>
        </div>
      );
      
}

export default MembersAndEssays
