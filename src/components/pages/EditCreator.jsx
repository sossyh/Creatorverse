// src/pages/EditCreator.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../client";
import { useParams } from "react-router-dom";

export default function EditCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data } = await supabase.from("creators").select("*").eq("id", id).single();
      setCreator(data);
    };
    fetchCreator();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from("creators").update(creator).eq("id", id);
    alert("Creator updated!");
  };

  if (!creator) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-3 max-w-md">
      <input
        type="text"
        value={creator.name}
        onChange={(e) => setCreator({ ...creator, name: e.target.value })}
        className="border p-2 rounded-lg"
      />
      <input
        type="text"
        value={creator.url}
        onChange={(e) => setCreator({ ...creator, url: e.target.value })}
        className="border p-2 rounded-lg"
      />
      <textarea
        value={creator.description}
        onChange={(e) => setCreator({ ...creator, description: e.target.value })}
        className="border p-2 rounded-lg"
      />
      <input
        type="text"
        value={creator.imageURL}
        onChange={(e) => setCreator({ ...creator, imageURL: e.target.value })}
        className="border p-2 rounded-lg"
      />
      <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded-lg">
        Update Creator
      </button>
    </form>
  );
}
