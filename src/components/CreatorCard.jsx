// CreatorCard.jsx
import './CreatorCard.css';
import editIcon from '../assets/edit.png';
import fallbackBackground from '../assets/3.jpg'; // Make sure to add this image to your assets

const CreatorCard = ({ creator, onEdit }) => {
  // Use the background image from creator data or fallback
  const backgroundImage = creator.backgroundImage 
    ? `url(${creator.backgroundImage})` 
    : `url(${fallbackBackground})`;

  return (
    <div className="creator-card-container">
    <div className="creator-card">
      <div 
        className="card-background"
        style={{ backgroundImage }}
      >
        <div className="overlay"></div>
      </div>
      
      <div className="card-content">
        <div className="creator-header">
          <h1>{creator.name}</h1>
          <img
            src={editIcon}
            alt="edit"
            className="edit-icon"
            onClick={() => onEdit(creator.id)}
          />
        </div>
        <div className="creator-bio">
          <p>{creator.description}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CreatorCard;