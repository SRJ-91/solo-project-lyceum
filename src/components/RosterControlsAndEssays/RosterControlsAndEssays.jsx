import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactModal from 'react-modal';

const RosterControlsAndEssays = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allUsers = useSelector((state) => state.allUsers);
  const members = useSelector((state) => state.members);
  console.log('members are', members);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleAddMember = () => {
    // Dispatch an action to add the selectedUser to the userGroup
    dispatch({ type: 'ADD_MEMBERS', payload: selectedUser });
    console.log('selected user is',selectedUser);
    setSelectedUser('');
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_USERS' });
    dispatch({ type: 'FETCH_MEMBERS' });
  }, []);

  return (
    <div>
      <button onClick={openModal}>Add Member</button>

      <table>
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
      </table>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add Member Modal"
      >
        <h2>Add Member</h2>

        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Select a user</option>
          {allUsers.map((user) => (
            <option key={user.id} value={user}>
              {user.username}
            </option>
          ))}
        </select>
        <button onClick={handleAddMember}>Enlist</button>
      </ReactModal>
    </div>
  );
};

export default RosterControlsAndEssays;
