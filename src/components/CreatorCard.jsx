// CreatorCard.jsx
import './CreatorCard.css';
import editIcon from '../assets/edit.png'; // put your edit icon in assets folder

const CreatorCard = ({ creator, onEdit }) => {
  return (
    <div className="creator-card">
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
  );
};

export default CreatorCard;