import './CreatorCard.css';
import { FaEdit, FaTrash, FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';
import fallbackBackground from '../assets/3.jpg';

const CreatorCard = ({ creator, onEdit, onDeleteClick }) => {
  const backgroundImage = creator.backgroundImage
    ? `url(${creator.backgroundImage})`
    : `url(${fallbackBackground})`;

  return (
    <div className="creator-card">
      <div className="card-background" style={{ backgroundImage }}>
        <div className="overlay"></div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h2>{creator.name}</h2>
          <div className="action-icons">
            <FaEdit className="edit-icon" onClick={() => onEdit?.(creator.id)} />
            <FaTrash className="delete-icon" onClick={() => onDeleteClick?.(creator)} />
          </div>
        </div>

        <div className="social-icons">
          {creator.youtube && (
            <a href={creator.youtube} target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          )}
          {creator.twitter && (
            <a href={creator.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
          )}
          {creator.instagram && (
            <a href={creator.instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          )}
        </div>

        <p className="creator-description">{creator.description}</p>
      </div>
    </div>
  );
};

export default CreatorCard;
