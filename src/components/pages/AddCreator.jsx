// src/pages/AddCreator.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../pages/DeleteModal';
import { supabase } from '../../client'; // ✅ import supabase client
import './AddCreator.css';

const AddCreator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageURL: '',
    url: ''
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Insert into Supabase table
      const { data, error } = await supabase
        .from('creators')
        .insert([
          {
            name: formData.name,
            description: formData.description,
            imageurl: formData.imageURL, // ✅ match column name in Supabase
            url: formData.url
          }
        ]);

      if (error) throw error;

      console.log('✅ Creator added:', data);
      navigate('/'); // redirect to creators list or homepage
    } catch (err) {
      console.error('❌ Error inserting data:', err.message);
      alert('Failed to add creator: ' + err.message);
    }
  };

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleCancelDelete = () => setShowDeleteModal(false);

  const handleConfirmDelete = () => {
    console.log('Delete confirmed');
    setShowDeleteModal(false);
    navigate('/');
  };

  return (
    <div className="add-creator-container">
      <div className="add-creator-card">
        <h1 className="add-creator-title">Add New Creator</h1>
        
        <form onSubmit={handleSubmit} className="add-creator-form">
          <div className="form-section">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter creator's name"
              required
            />
          </div>

          <div className="form-section">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Enter a brief description"
              rows="3"
              required
            />
          </div>

          <div className="form-section">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter image URL"
              required
            />
          </div>

          <div className="form-section">
            <label className="form-label">URL</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter website or social media URL"
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="submit-button">SUBMIT</button>
            <button type="button" onClick={handleDeleteClick} className="delete-button">DELETE</button>
          </div>
        </form>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        creatorName={formData.name || "this creator"}
      />
    </div>
  );
};

export default AddCreator;
