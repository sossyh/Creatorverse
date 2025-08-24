// src/components/pages/AddCreator.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client";

export default function AddCreator() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [imageurl, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.from("creators").insert([
        { name, url, description, imageurl }
      ]);

      if (error) throw error;
      navigate("/"); // go back to main page
    } catch (error) {
      console.error("Error adding creator:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add Content Creator</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          type="url"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="border px-3 py-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          type="url"
          placeholder="Image URL (optional)"
          value={imageurl}
          onChange={(e) => setImageURL(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Adding..." : "Add Creator"}
        </button>
      </form>
    </div>
  );
}
