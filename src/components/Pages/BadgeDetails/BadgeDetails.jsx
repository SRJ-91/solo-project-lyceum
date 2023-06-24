import React, { useState} from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

const BadgeDetailsPage = () => {
  const { badgeId } = useParams();
  const badges = useSelector((store) => store.badges);
  const selectedBadge = badges.find((badge) => badge.id === Number(badgeId));

  const history = useHistory();

  if (!selectedBadge) {
    return <div>Badge not found</div>;
  }

   // State for editing badge details
   const [editing, setEditing] = useState(false);
   const [updatedName, setUpdatedName] = useState(selectedBadge?.name || '');
   const [updatedImg, setUpdatedImg] = useState(selectedBadge?.img || '');
   const [updatedDescription, setUpdatedDescription] = useState(selectedBadge?.description || '');
 
   const handleEdit = () => {
     setEditing(true);
   };

  const handleEditClick = () => {
 // Dispatch an action to update the badge
 dispatch(
    updateBadge({
      id: selectedBadge.id,
      name: updatedName,
      img: updatedImg,
      description: updatedDescription,
    })
  );
  setEditing(false);
  };

  const handleDeleteClick = () => {
    // Logic for deleting the badge
    // Show an alert or confirmation dialog before deleting
  };

  const { name, img, description } = selectedBadge;

  return (
    <div>
        <button onClick={() => history.push('/all-badges')}>Return to all Badges</button>
      <img src={img} 
      alt="Badge"
      width="500px" 
      />
      <h2>{name}</h2>
      <p>{description}</p>
      <button onClick={handleEditClick}>Edit</button>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};

export default BadgeDetailsPage;
