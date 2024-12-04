"use client";

import React from "react";
import "../../styles/HallOfFame.css";

const HallOfFame = ({ winner }) => {
  if (!winner) {
    return <p>Keine Daten für die Hall of Fame verfügbar!</p>;
  }

  return (
    <div className="hall-of-fame">
      <h1 className="title">Hall of Fame</h1>
      <div className="winner-card">
        <img src={winner.avatar} alt={`${winner.name}'s Avatar`} className="avatar" />
        <h2>{winner.name}</h2>
        <p><strong>Datum:</strong> {new Date().toLocaleDateString()}</p>
        <p><strong>Score:</strong> {winner.score}</p>
      </div>
    </div>
  );
};

export default HallOfFame;
