// src/pages/ShowCreators.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../client";
import CreatorCard from "../CreatorCard";
import { Link } from "react-router-dom";
import bgImage from "../../assets/background.jpg"; // import the image
import "./ShowCreators.css"; // CSS file

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    async function fetchCreators() {
      const { data } = await supabase.from("creators").select("*");
      setCreators(data);
    }
    fetchCreators(); // fetch immediately
  }, []);

  return (
    <div
      className="container"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9))`,
      }}
    >
      <div className="topGradient" style={{
        background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${bgImage}) center/cover no-repeat`,
      }}>
      <h1 className="title"  >CREATORVERSE</h1>

      <div className="buttonContainer">
        <Link to="/creators" className="button">
          View All Creators
        </Link>
        <Link to="/AddCreator" className="button">
          Add a Creator
        </Link>
      </div></div>
<div className="footerLine"></div>
      <div className="grid">
        {creators.length > 0 ? (
          creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))
        ) : (
          <p className="noCreators">No Creators Yet 😞</p>
        )}
      </div>

      
    </div>
  );
}
