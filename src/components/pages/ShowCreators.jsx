// src/pages/ShowCreators.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client";
import Card from "../Card";

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase.from("creators").select("*");
        if (error) throw error;
        setCreators(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCreators();
  }, []);

  if (loading) return <p className="p-6">Loading creators...</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/new")}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        Add Content Creator
      </button>

      {creators.length === 0 ? (
        <p>No creators found. Add some creators to see them here!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creators.map((creator) => (
            <Card
              key={creator.id}
              creator={creator}
              onView={() => navigate(`/creator/${creator.id}`)}
              onEdit={() => navigate(`/edit/${creator.id}`)}
              onDelete={() => console.log("Delete", creator.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
