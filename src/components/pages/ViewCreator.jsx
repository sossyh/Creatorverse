// src/components/pages/ViewCreator.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../client";

export default function ViewCreator() {
  const { id } = useParams(); // get the creator ID from the URL
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase
          .from("creators")
          .select("*")
          .eq("id", id)
          .single(); // fetch only one row
        if (error) throw error;
        setCreator(data);
      } catch (error) {
        console.error("Error fetching creator:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [id]);

  if (loading) return <p className="p-6">Loading creator...</p>;
  if (!creator) return <p className="p-6">Creator not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded shadow">
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          className="w-full h-64 object-cover rounded"
        />
      )}
      <h1 className="text-2xl font-bold mt-4">{creator.name}</h1>
      <p className="text-gray-700 mt-2">{creator.description}</p>
      <a
        href={creator.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline mt-2 block"
      >
        Visit Page
      </a>
    </div>
  );
}
