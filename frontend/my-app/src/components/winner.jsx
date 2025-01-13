"use client";

import React from "react";
import "@/styles/winner.css"


export default function Winner({ winner }) {
  if (!winner) {
    return <p>Keine Daten für die Hall of Fame verfügbar!</p>;
  }

  return (
    <div className="winner">
      <h1 className="title">Winner</h1>
      <div className="winner-card">
        <img src={winner.avatar} alt={`${winner.name}'s Avatar`} className="avatar" />
        <h2>{winner.name}</h2>
        <p><strong>Datum:</strong> {new Date().toLocaleDateString()}</p>
        <p><strong>Score:</strong> {winner.score}</p>
      </div>
    </div>
  );
};
