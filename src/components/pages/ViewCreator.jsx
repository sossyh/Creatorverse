import { useState, useEffect } from "react";
import { supabase } from "../../client";
import "./ShowCreators.css";

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", url: "", description: "" });

  // Fetch creators on mount
  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    const { data, error } = await supabase.from("creators").select();
    if (error) {
      console.error("Error fetching creators:", error.message);
    } else {
      setCreators(data);
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("creators").delete().eq("id", id);
    if (error) {
      console.error("Error deleting creator:", error.message);
    } else {
      setCreators(creators.filter((creator) => creator.id !== id));
    }
  };

  const handleEdit = (creator) => {
    setEditingId(creator.id);
    setFormData({
      name: creator.name,
      url: creator.url,
      description: creator.description,
    });
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("creators")
      .update({
        name: formData.name,
        url: formData.url,
        description: formData.description,
      })
      .eq("id", editingId);

    if (error) {
      console.error("Error updating creator:", error.message);
    } else {
      setEditingId(null);
      fetchCreators(); // refresh list
    }
  };

  return (
    <div className="creators-container">
      <h1 className="title">Content Creators</h1>
      <div className="creators-grid">
        {creators.map((creator) => (
          <div className="creator-card" key={creator.id}>
            <img src={creator.imageurl} alt={creator.name} className="creator-img" />
            {editingId === creator.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <button className="btn submit-btn" onClick={handleUpdate}>
                  Submit
                </button>
              </div>
            ) : (
              <>
                <h2>{creator.name}</h2>
                <p>{creator.description}</p>
                <a href={creator.url} target="_blank" rel="noopener noreferrer">
                  Visit Channel
                </a>
                <div className="card-actions">
                  <button className="btn edit-btn" onClick={() => handleEdit(creator)}>
                    Edit
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDelete(creator.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
