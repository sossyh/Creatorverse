// src/components/Card.jsx
export default function Card({ creator, onView, onEdit, onDelete }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      {/* Image (optional) */}
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          className="w-full h-40 object-cover rounded"
        />
      )}

      {/* Name */}
      <h2 className="text-xl font-bold mt-2">{creator.name}</h2>

      {/* Description */}
      <p className="text-gray-700 mt-1">{creator.description}</p>

      {/* URL */}
      <a
        href={creator.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline mt-2 block"
      >
        Visit
      </a>

      {/* Optional buttons for interaction */}
      <div className="flex gap-2 mt-3">
        {onView && (
          <button
            onClick={onView}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            View
          </button>
        )}
        {onEdit && (
          <button
            onClick={onEdit}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
