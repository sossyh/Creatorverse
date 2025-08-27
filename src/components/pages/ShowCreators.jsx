import { useEffect, useState } from "react";
import { supabase } from "../../client";
import CreatorCard from "../CreatorCard";
import DeleteModal from "../pages/DeleteModal"; 
import { Link } from "react-router-dom";
import bgImage from "../../assets/background.jpg";
import "./ShowCreators.css";

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState(null);

  // Fetch creators from Supabase
  useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase.from("creators").select("*");
      if (!error) setCreators(data);
    }
    fetchCreators();
  }, []);

  // Open delete modal
  const handleDeleteClick = (creator) => {
    if (!creator?.id) {
      console.error("Creator object missing id:", creator);
      return;
    }
    setSelectedCreator(creator);
    setModalOpen(true);
  };

  // Confirm deletion in Supabase
  const handleConfirmDelete = async () => {
    if (!selectedCreator?.id) return;

    console.log("Deleting creator with ID:", selectedCreator.id);

    const { error } = await supabase
      .from("creators")
      .delete()
      .eq("id", selectedCreator.id);

    if (!error) {
      setCreators(creators.filter(c => c.id !== selectedCreator.id));
      setModalOpen(false);
      setSelectedCreator(null);
    } else {
      console.error("Error deleting creator:", error.message);
    }
  };

  return (
    <div
      className="container"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9))`,
      }}
    >
      <div
        className="topGradient"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${bgImage}) center/cover no-repeat`,
        }}
      >
        <h1 className="title">CREATORVERSE</h1>

        <div className="buttonContainer">
          <Link to="/creators" className="button">
            View All Creators
          </Link>
          <Link to="/AddCreator" className="button">
            Add a Creator
          </Link>
        </div>
      </div>

      <div className="footerLine"></div>

      <div className="grid">
        {creators.length > 0 ? (
          creators.map((creator) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              onDeleteClick={handleDeleteClick}
              onEdit={(id) => console.log("Edit creator", id)}
            />
          ))
        ) : (
          <p className="noCreators">No Creators Yet 😞</p>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        creatorName={selectedCreator?.name}
      />
    </div>
  );
}
