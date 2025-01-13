"use client";

import React from "react";
import { useState } from "react";


const HallOfFame = () => {
  const [hallOfFame, setHallOfFame] = useState([]);

  const fetchHallOfFame = async () => {
    const response = await fetch("http://localhost:4000/hall-of-fame");
    const data = await response.json();
    setHallOfFame(data);
  };  
  
  return (
    <div className="hall-of-fame">
      <h1 className="title">Hall of Fame</h1>
      <button onClick={fetchHallOfFame}>Load Hall of Fame</button>
      <ul className="hall-of-fame-list">
        {hallOfFame.map((winner, index) => (
          <li key={index}>
            <img src={winner.avatar} alt={`${winner.name}'s Avatar`} className="avatar" />
            <h2>{winner.name}</h2>
            <p><strong>Datum:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Score:</strong> {winner.score}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HallOfFame;