"use client";

import React, { useState } from "react";
import "../../styles/halloffame.css";

const HallOfFame = () => {
  const [hallOfFame, setHallOfFame] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHallOfFame = async () => {
    setLoading(true);
    setError(null); // Reset previous errors

    try {
      const response = await fetch("http://localhost:4000/hall-of-fame");
      if (!response.ok) {
        throw new Error("Failed to fetch Hall of Fame data");
      }
      const data = await response.json();
      setHallOfFame(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hall-of-fame">
      <h1 className="title">Hall of Fame</h1>
      <button onClick={fetchHallOfFame} disabled={loading}>
        {loading ? "Loading..." : "Load Hall of Fame"}
      </button>
      {error && <p className="error">{error}</p>}
      <ul className="hall-of-fame-list">
        {hallOfFame.map((winner, index) => (
          <li key={index}>
            <img src={winner.avatar} alt={`${winner.username}'s Avatar`} className="avatar" />
            <p><strong>Name:</strong> {winner.username}</p>
            <p><strong>Score:</strong> {winner.points}</p>
            <p><strong>Date:</strong> {new Date(winner.dateEntry).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HallOfFame;
