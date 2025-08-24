// src/App.jsx
import { useRoutes } from "react-router-dom";

// Import pages
import ShowCreators from "./components/pages/ShowCreators";
import ViewCreator from "./components/pages/ViewCreator";
import AddCreator from "./components/pages/AddCreator";
import EditCreator from "./components/pages/EditCreator";

function App() {
  // Define routes
  const routes = useRoutes([
    { path: "/", element: <ShowCreators /> },            // Main page
  { path: "/new", element: <AddCreator /> }, // <-- This must exist
    { path: "/edit/:id", element: <EditCreator /> },     // Edit creator by ID
    { path: "/creator/:id", element: <ViewCreator /> },  // View single creator
  ]);

  return (
    <div className="p-6">
      {routes}
    </div>
  );
}

export default App;
