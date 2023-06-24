import React from 'react';
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

  const handleEditClick = () => {
    // Logic for editing the badge details
    // Redirect to the edit page or open a modal for editing
  };

  const handleDeleteClick = () => {
    // Logic for deleting the badge
    // Show an alert or confirmation dialog before deleting
  };

  const { name, img, description } = selectedBadge;

  return (
    <div>
        <button onClick={() => history.push('/all-badges')}>Return to all Badges</button>
      <img src={img} alt="Badge" />
      <h2>{name}</h2>
      <p>{description}</p>
      <button onClick={handleEditClick}>Edit</button>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};

export default BadgeDetailsPage;
