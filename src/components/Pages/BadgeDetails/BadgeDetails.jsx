import React, { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

const BadgeDetailsPage = () => {
    //Hooks
  const { badgeId } = useParams();
  const badges = useSelector((store) => store.badges);
  const selectedBadge = badges.find((badge) => badge.id === Number(badgeId));
  const dispatch = useDispatch();
  const history = useHistory();
    //If nothing found
  if (!selectedBadge) {
    return <div>Badge not found! Do not refresh the page here!</div>;
  }

   // State for editing badge details
   const [editing, setEditing] = useState(false);
   const [editedImg, setEditedImg] = useState(selectedBadge?.img || '');
   const [editedName, setEditedName] = useState(selectedBadge.name);
   const [editedDescription, setEditedDescription] = useState(selectedBadge.description);
 
   const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    const updatedBadge = {
      id: selectedBadge.id,
      img: editedImg,
      name: editedName,
      description: editedDescription,
    };

    dispatch({ type: 'UPDATE_BADGE', payload: updatedBadge });
    setEditing(false);
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this badge?');
    if (confirmDelete) {
      dispatch({ type: 'DELETE_BADGE', payload: selectedBadge.id });
      console.log(selectedBadge.id);
      history.push('/all-badges');
    }
  };

  const { name, img, description } = selectedBadge;

  return (
    <div>
      {/* Render badge details */}
    <h2>{selectedBadge.name}</h2>
    {!editing && (
      <img
        src={selectedBadge.img}
        alt={selectedBadge.name}
        width="500px"
      />
    )}
    {editing && (
      <input
        value={editedImg}
        onChange={(e) => setEditedImg(e.target.value)}
      />
    )}
    <p>{selectedBadge.description}</p>

      {/* Render edit and delete buttons */}
      {!editing && (
        <div>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}

      {/* Render input fields for editing */}
      {editing && (
        <div>
          <input value={editedName} onChange={(e) => setEditedName(e.target.value)} />
          <textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)}></textarea>
          <button onClick={handleSaveClick}>Save</button>
        </div>
      )}
    </div>
  );
};

export default BadgeDetailsPage;
