// src/components/DeleteModal.jsx
import './DeleteModal.css';

const DeleteModal = ({ isOpen, onClose, onConfirm, creatorName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1 className="modal-title">WAIT!!!</h1>
        <p className="modal-message">
          Are you sure you want to delete {creatorName}???
        </p>
        <div className="modal-buttons">
          <button 
            className="modal-button cancel-button"
            onClick={onClose}
          >
            NAH, NEVER MIND
          </button>
          <button 
            className="modal-button confirm-button"
            onClick={onConfirm}
          >
            YES! TOTALLY SURE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;