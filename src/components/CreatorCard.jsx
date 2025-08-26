import './CreatorCard.css';
import editIcon from '../assets/edit.png'; // small pencil icon
import youtubeIcon from '../assets/youtube.png';
import twitterIcon from '../assets/twitter.png';
import instagramIcon from '../assets/instagram.jpeg';
import fallbackBackground from '../assets/3.jpg';

const CreatorCard = ({ creator, onEdit }) => {
  const backgroundImage = creator.backgroundImage
    ? `url(${creator.backgroundImage})`
    : `url(${fallbackBackground})`;

  return (
    <div className="creator-card">
      <div
        className="card-background"
        style={{ backgroundImage }}
      >
        <div className="overlay"></div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h2>{creator.name}</h2>
          <img
            src={editIcon}
            alt="edit"
            className="edit-icon"
            onClick={() => onEdit(creator.id)}
          />
        </div>

        <div className="social-icons">
          {creator.youtube && <a href={creator.youtube} target="_blank"><img src={youtubeIcon} alt="YouTube" /></a>}
          {creator.twitter && <a href={creator.twitter} target="_blank"><img src={twitterIcon} alt="Twitter" /></a>}
          {creator.instagram && <a href={creator.instagram} target="_blank"><img src={instagramIcon} alt="Instagram" /></a>}
        </div>

        <p className="creator-description">{creator.description}</p>
      </div>
    </div>
  );
};

export default CreatorCard;
